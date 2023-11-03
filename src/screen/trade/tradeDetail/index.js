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
import { useParams } from 'react-router-dom';
import {
  getTradeDetailAbility,
  getTradeDetailProduct,
} from '../../../api/trade';
import chat from '../../../asset/chat.svg';
import { productCategory, abilityCategory } from '../../../function/changeKey';
import { calculateTime } from '../../../function/calculate';

function TradeDetailScreen() {
  const [detailData, setDetailData] = useState();
  const { id, type } = useParams();
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

  const getTradeData = () => {
    (type === 'product'
      ? getTradeDetailProduct({ product_id: id })
      : getTradeDetailAbility({ ability_id: id })
    ).then((res) => {
      console.log(res.data[type]);
      setDetailData(res.data[type]);
      console.log(JSON.parse(res.data[type][`${type}_file_path`]));
    });
  };

  const findValue = (parentKey, key) => {
    if (type === 'product') {
      return productCategory(parentKey, key);
    } else {
      return abilityCategory(parentKey, key);
    }
  };

  return (
    <Screen>
      {detailData && (
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
                      <div>
                        <img
                          alt="cImg"
                          src={e}
                          className="tradeCarouselImg"
                          onError={(e) => (e.target.src = tradeSample)}
                        />
                        <p className="legend">자세히 보기</p>
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              <div className="tradeDetailBox">
                <div className="titleBox">
                  <div className="TTitle">{detailData[`${type}_title`]}</div>
                  <img
                    alt="like"
                    src={tradeLike || heartFill}
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
                  <img alt="icon" src={time} className={'TVLIcon'} />
                  {calculateTime(detailData.updatedAt)}
                  <div className="ICenter">
                    <img alt="icon" src={view} className={'TVLIcon'} />
                    {detailData[`${type}_count`]}
                  </div>
                  <img alt="icon" src={tradeLike} className={'TVLIcon'} />
                  {detailData[`${type}_like`]}
                  <div className="tradeUpdate">
                    {findValue(`${type}_update`, detailData[`${type}_update`])}
                  </div>
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
              <button className="tDBtn">거래상태</button>
              <button className="tDBtn">수정</button>
              <button className="tDBtn">삭제</button>
            </div>

            <div className="tradeContent">{detailData[`${type}_content`]}</div>
          </div>

          <div className="prdType">판매자</div>
          <div className="tradeUserContainer">
            <UserProfileContainer followingData={data} />
            <div className="tradeUserBtnC">
              <div className="tradeUserBtn">
                <img alt="icon" src={chat} className="TUIcon" />
                CHAT
              </div>
              <div className="tradeUserBtn">
                <img alt="icon" src={likeWhite} className="TUIcon TUHeart" />
                FOLLOW
              </div>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
}

export default TradeDetailScreen;
