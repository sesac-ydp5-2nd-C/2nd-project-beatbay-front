import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../Screen';
import MypageVinyl from '../../components/mypageVinyl/MypageVinyl';
import userImg from '../../asset/profile_default.png';
import MypageProfile from '../../components/mypageProfile/MypageProfile';
import CustomModal from '../../components/common/customModal/CustomModal';
import MypageTab from '../../components/MypageTab/MypageTab';
import InfiniteScroll from 'react-infinite-scroller';
import likeWhite from '../../asset/likeWhite.svg';

import TradeCard from '../../components/common/tradeCard/TradeCard';
import { useParams } from 'react-router-dom';
import { getSellerPage } from '../../api/seller';
import CustomDropdown from '../../components/common/customDropdown/CustomDropdown';
import LoadingSpinner from '../../components/common/loadingSpinner';
import EmptyTrade from '../../components/common/emptyTrade/EmptyTrade';

export default function Userpage() {
  const [userData, setUserData] = useState({
    id: 1,
    user_nickname: '대만',
    comment: '“그래, 난 정대만. 포기를 모르는 남자지….”',
    user_interests: ['밴드', '일렉기타'],
    imgSrc: userImg,
    user_grade: 5,
    user_review: 32,
    user_following: 28,
    user_follower: 18,
    itemCount: 20,
  });

  const [reviewsData, setReviewsData] = useState([
    {
      user_nickname: '대만',
      imgSrc: userImg,
      comment:
        '좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요',
    },
    {
      user_nickname: '호열',
      imgSrc: userImg,
      comment:
        '별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용',
    },
    {
      user_nickname: '백호',
      imgSrc: userImg,
      comment: '굿이에용',
    },
  ]);

  const tabsData = [
    {
      id: 1,
      title: '상품',
      type: 'product',
    },
    {
      id: 2,
      title: '재능',
      type: 'ability',
    },
  ];

  const items = ['전체', '판매중', '예약중', '판매완료'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [sellerData, setSellerData] = useState();
  const [productData, setProductData] = useState();
  const [startLoad, setStartLoad] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setStartLoad(true);
    console.log(activeTab);
    getSellerInfo();
  }, [selectedItem, activeTab]);

  const getSellerInfo = async () => {
    setProductData(null);
    const apiData = {
      seller_id: id,
      type: activeTab.type === 'product' ? 0 : 1,
      update: items.indexOf(selectedItem),
    };
    console.log(apiData);
    getSellerPage(apiData).then((res) => {
      console.log(res);
      let productDataFromResponse;
      if (activeTab.type === 'product') {
        productDataFromResponse = res.data.products.products;
      } else if (activeTab.type === 'ability') {
        productDataFromResponse = res.data.abilities.abilities;
      }
      console.log(productDataFromResponse);
      setSellerData(productDataFromResponse);
    });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState();

  const openModal = (data, title) => {
    setModalData(data);
    setModalIsOpen(true);
    setModalTitle(title);
    setModalTitle(title);
    console.log(title, data);
  };

  const closeModal = () => {
    console.log('Modal Closed');
    setModalData(null);
    setModalIsOpen(false);
  };

  return (
    <Screen>
      <div className="sellerProfile">
        {sellerData && sellerData.user && (
          <div className="sellerInfo">
            <MypageVinyl userData={sellerData.user} />
            <div className="sellercontent">
              <MypageProfile userData={sellerData.user} />
              <div className="figures">
                <div
                  className="figure followers"
                  onClick={() => openModal(reviewsData, '리뷰')}
                >
                  <h2>후기</h2>
                  <p>{sellerData.reviewCount}</p>
                </div>
                <div className="figure followers">
                  <h2>팔로워</h2>
                  <p>{sellerData.followerCount}</p>
                </div>
                <div className="figure followBtn">
                  <div className="tradeUserBtn">
                    <img
                      alt="icon"
                      src={likeWhite}
                      className="TUIcon TUHeart"
                    />
                    FOLLOW
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="sellerListContainer">
          <MypageTab tabsData={tabsData} />
          <MypageTab
            tabsData={tabsData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setProductData={setProductData}
          />

          <CustomDropdown
            showDropdown={showDropdown}
            setShowDropdown={() => setShowDropdown(!showDropdown)}
            items={items}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <InfiniteScroll
            key={0}
            pageStart={0}
            loadMore={() => {
              if (productData?.length > 0 && startLoad) {
                // setProductData([...productData, ...productData]);
                // console.log(productData);
              }
            }}
            hasMore={false}
            loader={
              startLoad ? (
                productData?.length === 0 ? (
                  <div>데이터가 없습니다</div>
                ) : (
                  <div className="loader" key={0}>
                    <LoadingSpinner />
                  </div>
                )
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div onClick={() => setStartLoad(true)} className="seeMore">
                    더 보기 +
                  </div>
                </div>
              )
            }
          >
            {productData && productData?.length === 0 ? (
              <EmptyTrade where={'판매 내역이'} />
            ) : (
              <div className="MpGridContainer">
                {productData &&
                  productData?.map((e, i) => {
                    return (
                      <TradeCard
                        key={`${i}_${e.title}`}
                        data={e}
                        type={activeTab.type}
                      />
                    );
                  })}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
      {modalIsOpen && (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          modalData={modalData}
          modalTitle={modalTitle}
        />
      )}
    </Screen>
  );
}
