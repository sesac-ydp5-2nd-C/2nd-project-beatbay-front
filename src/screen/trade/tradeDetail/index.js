import React, { useEffect, useRef, useState } from 'react';
import tradeSample from '../../../asset/profile_default.png';
import Screen from '../../Screen';
import downArrow from '../../../asset/down-arrow.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import tradeLike from '../../../asset/tradeLike.svg';
import likeWhite from '../../../asset/likeWhite.svg';
import heartFill from '../../../asset/heart_fill.svg';
import time from '../../../asset/time.svg';
import fortissimo from '../../../asset/fortissimo.svg';
import view from '../../../asset/view.svg';
import UserProfileContainer from '../../../components/common/userProfile';
import './styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getTradeDetailAbility,
  getTradeDetailProduct,
  patchTradeLikeAbility,
  patchTradeLikeProduct,
  patchTradeUpdateStatus,
} from '../../../api/trade';
import chat from '../../../asset/chat.svg';
import { productCategory, abilityCategory } from '../../../function/changeKey';
import { calculateTime } from '../../../function/calculate';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import ImageModal from '../../../components/imageModal/ImageModal';
import LoadingSpinner from '../../../components/common/loadingSpinner';
import { useDispatch } from 'react-redux';
import { setChatRoomInfo } from '../../../store/feature/userSlice';
import { patchSellFollow } from '../../../api/seller';

function TradeDetailScreen() {
  const [detailData, setDetailData] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const items = ['판매중', '예약중', '거래완료'];
  const [selectedItem, setSelectedItem] = useState();
  const { id, type } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const [isMyProduct, setIsMyProduct] = useState(false);
  const loginId = localStorage.getItem('login_id');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = {
    id: 1,
    name: '정대만',
    grade: fortissimo,
    introduce: '“그래, 난 정대만. 포기를 모르는 남자지….”',
    profileImg: tradeSample,
    interests: ['밴드', '일렉기타'],
  };

  useEffect(() => {
    getTradeData();
  }, []);

  useEffect(() => {}, []);

  const getTradeData = () => {
    (type === 'product'
      ? getTradeDetailProduct({ product_id: id })
      : getTradeDetailAbility({ ability_id: id })
    ).then((res) => {
      console.log(res);
      if (res?.data[type]) {
        setLikeCount(res.data.likeCount);
        setDetailData(res.data[type]);
        setIsLike(res.data.isLike == 0 ? false : true);
        setIsFollow(res.data.isFollow == 0 ? false : true);
        setIsMyProduct(res.data[type].user.id == loginId ? true : false);
        setSelectedItem(items[Number(res.data[type][`${type}_update`]) - 1]);
      }
      // console.log(JSON.parse(res.data[type][`${type}_file_path`]));
    });
  };

  const handleLike = () => {
    if (!loading) {
      if (localStorage.getItem('login_id')) {
        setLoading(true);
        (type === 'product'
          ? patchTradeLikeProduct({ product_id: id })
          : patchTradeLikeAbility({ ability_id: id })
        ).then((res) => {
          console.log(res.data.like);
          setIsLike(!isLike);
          setLoading(false);
          if (res.data.like === 'success') {
            setLikeCount(likeCount + 1);
          } else if (res.data.like === 'cancel') {
            setLikeCount(likeCount - 1);
          }
        });
      } else {
        alert('로그인이 필요합니다 !');
      }
    }
  };

  const findValue = (parentKey, key) => {
    if (type === 'product') {
      return productCategory(parentKey, key);
    } else {
      return abilityCategory(parentKey, key);
    }
  };

  const handleStatus = (item) => {
    const apiData = {
      type: type === 'product' ? 0 : 1,
      id: detailData[`${type}_id`],
      update: items.indexOf(item) + 1,
    };
    patchTradeUpdateStatus(apiData).then((res) => {
      if (res.data.update) {
        setSelectedItem(item);
      }
    });
  };

  const handleChat = () => {
    if (localStorage.getItem('login_id')) {
      const socketData = {
        opponent_id: detailData.user.id,
        type: type,
        object_id: detailData[`${type}_id`],
        object_img: JSON.parse(detailData[`${type}_file_path`])[0],
        object_title: detailData[`${type}_title`],
        object_price: detailData[`${type}_price`],
        opponent_data: detailData.user,
      };
      dispatch(setChatRoomInfo(socketData));
      navigate('/mypage/chat');
    } else {
      alert('로그인이 필요합니다!');
    }
  };

  const handleFollow = () => {
    if (localStorage.getItem('login_id')) {
      patchSellFollow({ following_id: detailData.user.id }).then((res) => {
        if (res.data.isFollow === 'success') {
          setIsFollow(true);
        } else {
          setIsFollow(false);
        }
      });
    } else {
      alert('로그인이 필요합니다!');
    }
  };

  const TradeEditBtn = () => {
    if (type === 'product') {
      navigate(`/trade/sell/product/${id}`);
    } else {
      navigate(`/trade/sell/ability/${id}`);
    }
  };

  return (
    <Screen>
      {detailData ? (
        <div className="detailContainer">
          <div className="prdType">
            {findValue(`${type}_category`, detailData[`${type}_category`])}
            <img alt="arrow" src={downArrow} className="rArrow" />
            <p className="type2Depth">
              {findValue(
                `${type}_sub_category`,
                detailData[`${type}_sub_category`],
              )}
            </p>
          </div>
          <div className="contentBox">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="tradeImgBox">
                <Carousel
                  showStatus={false}
                  infiniteLoop
                  showThumbs={false}
                  emulateTouch
                >
                  {JSON.parse(detailData[`${type}_file_path`]).map((e, i) => {
                    return (
                      <div key={`${e}_${i}`}>
                        <img
                          alt="cImg"
                          src={`${process.env.REACT_APP_BACK_IP}/uploads/${e}`}
                          onError={(e) => (e.target.src = tradeSample)}
                          className="tradeCarouselImg"
                        />
                        <p
                          style={{ cursor: 'pointer' }}
                          className="legend"
                          onClick={() => {
                            setIsModalOpen(true);
                            setSelectedImg(e);
                          }}
                        >
                          자세히 보기
                        </p>
                        <ImageModal
                          uri={`${process.env.REACT_APP_BACK_IP}/uploads/${selectedImg}`}
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              <div className="tradeDetailBox">
                <div className="titleBox">
                  <div className="TTitle">{detailData[`${type}_title`]}</div>
                  <img
                    onClick={handleLike}
                    alt="like"
                    src={isLike ? heartFill : tradeLike}
                    className="tLike"
                  />
                </div>
                <div className="detailPrice">
                  {detailData[`${type}_price`]
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  {' 원'}
                </div>
                <div className="TVLContainer">
                  <img alt="icon" src={time} className={'TVLIcon TVMB'} />
                  {calculateTime(detailData.updatedAt)}
                  <div className="ICenter">
                    <img alt="icon" src={view} className={'TVLIcon'} />
                    {detailData[`${type}_count`]}
                  </div>
                  <img alt="icon" src={tradeLike} className={'TVLIcon TVMB'} />
                  {likeCount}

                  {/* 글을 작성한 사람이면 드롭다운, 아니면 div  */}

                  {/* <div className="tradeUpdate">
                    {findValue(`${type}_update`, detailData[`${type}_update`])}
                  </div> */}

                  {isMyProduct ? (
                    <CustomDropdown
                      showDropdown={showDropdown}
                      setShowDropdown={() => setShowDropdown(!showDropdown)}
                      items={items}
                      selectedItem={selectedItem}
                      onChange={handleStatus}
                      setSelectedItem={setSelectedItem}
                    />
                  ) : (
                    <div className="tradeUpdate">
                      {items[Number(detailData[`${type}_update`]) - 1]}
                    </div>
                  )}
                </div>

                <ul className="regionInfo">
                  <li className="tdInfo">
                    {'지역: '}
                    {detailData[`${type}_location`]}
                  </li>
                  <li className="tdInfo">
                    {'물품상태: '}
                    {findValue(`${type}_status`, detailData[`${type}_status`])}
                  </li>
                  <li className="tdInfo">
                    {'거래방식: '}
                    {findValue(`${type}_method`, detailData[`${type}_method`])}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flexEnd">
              {isMyProduct && (
                <>
                  <button className="tDBtn" onClick={TradeEditBtn}>
                    수정
                  </button>
                  <button className="tDBtn">삭제</button>
                </>
              )}
            </div>

            <div className="tradeContent">{detailData[`${type}_content`]}</div>
          </div>

          <div className="prdType">판매자</div>
          <div className="tradeUserContainer">
            <UserProfileContainer followingData={detailData.user} />
            <div className="tradeUserBtnC">
              <div className="tradeUserBtn" onClick={handleChat}>
                <img alt="icon" src={chat} className="TUIcon" />
                CHAT
              </div>
              <div className="tradeUserBtn" onClick={handleFollow}>
                <img
                  alt="icon"
                  src={isFollow ? heartFill : likeWhite}
                  className="TUIcon TUHeart"
                />
                FOLLOW
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader" key={0}>
          <LoadingSpinner />
        </div>
      )}
    </Screen>
  );
}

export default TradeDetailScreen;
