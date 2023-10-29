import React, { useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import tradeSample from '../../../asset/tradeSample.png';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import MypageTab from '../../../components/MypageTab/MypageTab';
import InfiniteScroll from 'react-infinite-scroller';

export default function MypageListingsScreen() {
  const [userData, setUserData] = useState({
    username: '영걸',
    introduce:
      'Music Is My Life~~~~~!!~~! dndndndndndnndddddddddddddddddddddddddd',
    interests: ['밴드', '베이스', '레슨'],
    imgSrc: 'profile_default.png',
  });

  const tabsData = [
    {
      id: 1,
      title: 'ACITVE',
    },
    {
      id: 2,
      title: 'SOLD',
    },
  ];

  const items = ['ALL', 'GOODS', 'ABILITY'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [productData, setProductData] = useState(
    new Array(8).fill({
      title: '텔레캐스터 민트 팝니다',
      date: '1일전',
      price: '1,300,000',
      isLike: false,
      img: tradeSample,
    }),
  );

  const [loadingMore, setLoadingMore] = useState(false);

  return (
    <Screen>
      <div className="MLContainer">
        <div className="MLContent">
          <div className="vinyl">
            <MypageVinyl userData={userData} />
          </div>
          <div className="listingsContainer">
            <h1>LISTINGS</h1>
            <div className="postIntro">POST</div>
            <MypageTab tabsData={tabsData} />

            <CustomDropdown
              showDropdown={showDropdown}
              setShowDropdown={() => setShowDropdown(!showDropdown)}
              items={items}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <InfiniteScroll
              pageStart={0}
              loadMore={() => {
                setProductData([...productData, ...productData]);
                console.log(productData);
              }}
              hasMore={true}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <div className="MpGridContainer">
                {productData.map((e, i) => {
                  return <TradeCard key={`${i}_${e.title}`} data={e} />;
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
