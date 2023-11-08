import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import MypageTab from '../../../components/MypageTab/MypageTab';
import InfiniteScroll from 'react-infinite-scroller';
import userImg from '../../../asset/profile_default.png';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { getMyLikes } from '../../../api/mypage';
import LoadingSpinner from '../../../components/common/loadingSpinner';
import EmptyTrade from '../../../components/common/emptyTrade/EmptyTrade';

export default function MypagePurchasesScreen() {
  const [userData, setUserData] = useState();

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
  const [productData, setProductData] = useState([]);
  const [startLoad, setStartLoad] = useState(true);

  useEffect(() => {
    setStartLoad(true);
    console.log(activeTab);

    getLikeList();
  }, [selectedItem, activeTab]);

  const getLikeList = async () => {
    setProductData(null);
    const apiData = {
      type: activeTab.type === 'product' ? 0 : 1,
      update: items.indexOf(selectedItem),
    };
    console.log(apiData);
    getMyLikes(apiData).then((res) => {
      console.log(res);
      let productDataFromResponse;

      if (activeTab.type === 'product') {
        productDataFromResponse = res.data.userFavoriteProduct;
      } else if (activeTab.type === 'ability') {
        productDataFromResponse = res.data.userFavoriteAbility;
      }
      console.log(productDataFromResponse);
      setProductData(productDataFromResponse);
      setUserData(res.data.userData);
      // console.log(res.data.userData.user_grade);
    });
  };

  return (
    <Screen>
      <div className="MLContainer">
        <div className="MLContent">
          <div className="MpListContainer">
            <div className="MpTopBox">
              <div className="MpTitleBox">
                <h1>찜</h1>
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
                <EmptyTrade where={'찜 내역이'} />
              ) : (
                <div className="MpGridContainer">
                  {productData &&
                    productData?.map((e, i) => {
                      return (
                        <TradeCard
                          key={`${i}_${e.title}`}
                          data={e[`used_${activeTab.type}`]}
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
