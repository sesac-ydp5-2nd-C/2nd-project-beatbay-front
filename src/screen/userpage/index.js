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
import {
  getSellerFollowers,
  getSellerPage,
  getSellerReviews,
} from '../../api/seller';
import CustomDropdown from '../../components/common/customDropdown/CustomDropdown';
import LoadingSpinner from '../../components/common/loadingSpinner';
import EmptyTrade from '../../components/common/emptyTrade/EmptyTrade';

export default function Userpage() {
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
  const [reviewsData, setReviewsData] = useState();
  const [followData, setFollowData] = useState();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStartLoad(true);
    if (activeTab && activeTab.id) {
    }
    setCurrentPage(0);
    setTotalPage(1);
    getSellerInfo();
  }, [selectedItem, activeTab]);

  const getSellerInfo = async (page = null) => {
    setLoading(true);
    if (!page) {
      setProductData(null);
    }
    const apiData = {
      seller_id: id,
      type: activeTab.type === 'product' ? 0 : 1,
      update: items.indexOf(selectedItem),
      page: page ? page : undefined,
    };
    getSellerPage(apiData).then((res) => {
      let productDataFromResponse;
      if (activeTab.type === 'product') {
        productDataFromResponse = res.data.products.products;
        setCurrentPage(res.data?.products.pageNum);
        setTotalPage(res.data?.products.totalPages);
        if (
          !page &&
          res.data?.products.totalPages > res.data?.products.pageNum
        ) {
          setStartLoad(false);
        }
      } else if (activeTab.type === 'ability') {
        productDataFromResponse = res.data.abilities.abilities;
        setCurrentPage(res.data?.abilities.pageNum);
        setTotalPage(res.data?.abilities.totalPages);
        if (
          !page &&
          res.data?.abilities.totalPages > res.data?.abilities.pageNum
        ) {
          setStartLoad(false);
        }
      }
      if (page) {
        setProductData([...productData, ...productDataFromResponse]);
      } else {
        setProductData(productDataFromResponse);
      }
      setSellerData(res.data);
      setLoading(false);
    });
    getSellerReviews(apiData).then((res) => {
      if (res.data) {
        setReviewsData(res.data);
      }
    });
    getSellerFollowers(apiData).then((res) => {
      if (res.data) {
        setFollowData(res.data);
      }
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
  };

  const closeModal = () => {
    setModalData(null);
    setModalIsOpen(false);
  };

  return (
    <Screen>
      <div className="sellerProfile">
        {sellerData && (
          <div className="sellerInfo">
            <MypageVinyl userData={sellerData.user} />
            <div className="sellercontent">
              <MypageProfile userData={sellerData.user} noModify />
              <div className="figures">
                <div
                  className="figure followers"
                  onClick={() => openModal(reviewsData.review, '리뷰')}
                >
                  <h2>후기</h2>
                  <p>{sellerData.reviewCount}</p>
                </div>
                <div
                  className="figure followers"
                  onClick={() => openModal(followData.follower, '팔로워')}
                >
                  <h2>팔로워</h2>
                  <p>{sellerData.followerCount}</p>
                </div>
                <div className="figure followBtn">
                  <img alt="icon" src={likeWhite} className="SellerHeart" />
                  <p>FOLLOW</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="sellerListContainer">
          {/* <MypageTab tabsData={tabsData} /> */}
          <MypageTab
            loading={loading}
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
                getSellerInfo(Number(currentPage) + 1);
              }
            }}
            hasMore={totalPage > currentPage ? true : false}
            loader={
              startLoad ? (
                <div className="loader" key={0}>
                  <LoadingSpinner />
                </div>
              ) : (
                <div
                  style={{ display: 'flex', justifyContent: 'center' }}
                  key={0}
                >
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
                {productData?.map((e, i) => {
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
      {modalIsOpen && modalData && (
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
