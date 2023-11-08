import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import MypageTab from '../../../components/MypageTab/MypageTab';
import InfiniteScroll from 'react-infinite-scroller';
import userImg from '../../../asset/profile_default.png';

import { getMySell } from '../../../api/mypage';
import LoadingSpinner from '../../../components/common/loadingSpinner';
import EmptyTrade from '../../../components/common/emptyTrade/EmptyTrade';

export default function MypageListingsScreen() {
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
  const [userData, setUserData] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [productData, setProductData] = useState();
  const [startLoad, setStartLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setStartLoad(true);
    setCurrentPage(0);
    setTotalPage(1);
    console.log(activeTab);

    getSellList();
  }, [selectedItem, activeTab]);

  const getSellList = async (page = null) => {
    if (!page) {
      setProductData(null);
    }
    const apiData = {
      type: activeTab.type === 'product' ? 0 : 1,
      update: items.indexOf(selectedItem),
      page: page ? page : undefined,
    };
    console.log(apiData);
    getMySell(apiData).then((res) => {
      console.log(res);
      let productDataFromResponse;

      if (activeTab.type === 'product') {
        productDataFromResponse = res.data.userProduct.products;
        setCurrentPage(res.data.userProduct.pageNum);
        setTotalPage(res.data.userProduct.totalPages);
      } else if (activeTab.type === 'ability') {
        productDataFromResponse = res.data.userAbility.abilities;
        setCurrentPage(res.data.userAbility.pageNum);
        setTotalPage(res.data.userAbility.totalPages);
      }
      console.log(productDataFromResponse);
      setProductData(productDataFromResponse);
      setUserData(res.data.userData);
    });
  };

  return (
    <Screen>
      <div className="MLContainer">
        <div className="MLContent">
          <div className="MpListContainer">
            <div className="MpTopBox">
              <div className="MpTitleBox">
                <h1>판매 내역</h1>
                <div className="postIntro">POST</div>
              </div>
              <div className="vinyl">
                {userData && <MypageVinyl userData={userData} />}
              </div>
            </div>
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
                  getSellList(null, currentPage + 1);
                }
              }}
              hasMore={totalPage > currentPage ? true : false}
              loader={
                startLoad ? (
                  <div
                    style={{ display: 'flex', justifyContent: 'center' }}
                    key={0}
                  >
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
        <MypageMenus />
      </div>
    </Screen>
  );
}
