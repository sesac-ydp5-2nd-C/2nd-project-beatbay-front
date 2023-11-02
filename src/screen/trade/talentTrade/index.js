import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import tradeSample from '../../../asset/tradeSample.png';
import RollingSpinner from '../../../asset/RollingSpinner.gif';
import Screen from '../../Screen';
import InfiniteScroll from 'react-infinite-scroller';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { getTradeAbility } from '../../../api/trade';

function TalentTradeScreen() {
  const items = ['최신순', '인기순', '낮은가격순', '높은가격순'];

  const areas = [
    '강원도',
    '경기도',
    '경상도',
    '광주',
    '대구',
    '부산',
    '서울',
    '울산',
    '세종',
    '인천',
    '전라도',
    '제주도',
    '충청도',
  ];
  const tabsData = [
    {
      id: 1,
      title: '레슨',
      content: areas,
    },
    {
      id: 2,
      title: '악보 제작',
      content: areas,
    },
    {
      id: 3,
      title: '녹음/편집',
      content: areas,
    },
    {
      id: 4,
      title: '연주',
      content: areas,
    },
  ];
  const [activeContent, setActiveContent] = useState(tabsData[0].content[0]);
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getAbilityList();
  }, [selectedItem, activeContent]);

  const getAbilityList = async () => {
    const apiData = {
      orderMethod: items.indexOf(selectedItem),
      categoryNum: activeTab.id,
      subCategoryNum: activeTab.content.indexOf(activeContent) + 1,
    };
    console.log(apiData);
    getTradeAbility(apiData).then((res) => {
      setProductData(res.data?.abilities ? res.data?.abilities : []);
    });
  };

  return (
    <Screen>
      <CustomTab
        tabsData={tabsData}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
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
              if (productData?.length > 0) {
                setProductData([...productData, ...productData]);
                console.log(productData);
              }
            }}
            hasMore={true}
            loader={
              <div className="loader" key={0}>
                <img src={RollingSpinner} alt="spinner" className="loaderGif" />
              </div>
            }
          >
            <div className="productGridContainer">
              {productData &&
                productData?.map((e, i) => {
                  return (
                    <TradeCard
                      key={`${i}_${e.title}`}
                      data={e}
                      type={'ability'}
                    />
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Screen>
  );
}

export default TalentTradeScreen;