import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import tradeSample from '../../../asset/tradeSample.png';
import Screen from '../../Screen';
import InfiniteScroll from 'react-infinite-scroller';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';

function ProductTradeScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);
  const items = ['인기순', '최신순', '낮은가격순', '높은가격순'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [productData, setProductData] = useState(
    new Array(15).fill({
      title: '텔레캐스터 민트 팝니다',
      date: '1일전',
      price: '1,300,000',
      isLike: false,
      img: tradeSample,
    }),
  );
  const tabsData = [
    {
      id: 1,
      title: '악기',
      content: [
        '관악기',
        '현악기',
        '타악기',
        '건반악기',
        '전자악기',
        '앰프/스피커',
        '악기용품',
        '기타',
      ],
    },
    {
      id: 2,
      title: '음반',
      content: ['CD', 'DVD', 'LP', '기타'],
    },
  ];

  return (
    <Screen>
      <CustomTab tabsData={tabsData} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <div className="postCardContainer">
          <div className="PIContainer">
            <div className="postIntro">POST</div>
            <CustomDropdown
              showDropdown={showDropdown}
              setShowDropdown={() => setShowDropdown(!showDropdown)}
              items={items}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
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
            <div className="productGridContainer">
              {productData.map((e, i) => {
                return <TradeCard key={`${i}_${e.title}`} data={e} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Screen>
  );
}

export default ProductTradeScreen;
