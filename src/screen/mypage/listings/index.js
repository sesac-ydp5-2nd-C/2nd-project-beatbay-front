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
import RollingSpinner from '../../../asset/RollingSpinner.gif';

import { getMySell } from '../../../api/mypage';

export default function MypageListingsScreen() {
  const [userData, setUserData] = useState({
    imgSrc: userImg,
    user_grade: 5,
  });
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
    getSellList();
  }, [selectedItem, activeTab]);

  const getSellList = async () => {
    setProductData();
    const apiData = {
      type: activeTab.type === 'product' ? 0 : 1,
      update: items.indexOf(selectedItem),
    };
    console.log(apiData);
    getMySell(apiData).then((res) => {
      console.log(res);
      let productDataFromResponse;
      if (activeTab.type === 'product') {
        productDataFromResponse = res.data.userProduct;
      } else if (activeTab.type === 'ability') {
        productDataFromResponse = res.data.userAbility;
      }
      setProductData(productDataFromResponse);
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
                <MypageVinyl userData={userData} />
              </div>
            </div>
            <MypageTab
              tabsData={tabsData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
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
                  setProductData([...productData, ...productData]);
                  console.log(productData);
                }
              }}
              hasMore={true}
              loader={
                startLoad ? (
                  productData?.length === 0 ? (
                    <div>데이터가 없습니다</div>
                  ) : (
                    <div className="loader" key={0}>
                      <img
                        src={RollingSpinner}
                        alt="spinner"
                        className="loaderGif"
                      />
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
            </InfiniteScroll>
          </div>
        </div>
        <MypageMenus />
      </div>
    </Screen>
  );
}
