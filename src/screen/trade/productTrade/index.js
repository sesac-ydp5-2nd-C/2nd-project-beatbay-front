import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import Screen from '../../Screen';
import InfiniteScroll from 'react-infinite-scroller';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import RollingSpinner from '../../../asset/RollingSpinner.gif';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { getTradeProduct } from '../../../api/trade';

function ProductTradeScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);
  const items = ['최신순', '인기순', '낮은가격순', '높은가격순'];
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
  const [activeContent, setActiveContent] = useState(tabsData[0].content[0]);
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [productData, setProductData] = useState();
  const [startLoad, setStartLoad] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // 카테고리, 순서 바뀔때 마다 초기화
    setStartLoad(true);
    getTradeList();
  }, [selectedItem, activeContent]);

  const getTradeList = async (search = null) => {
    setProductData();
    const apiData = {
      orderMethod: items.indexOf(selectedItem),
      categoryNum: activeTab.id,
      subCategoryNum: activeTab.content.indexOf(activeContent) + 1,
      searchKeyword: search ? search : undefined,
    };
    console.log(apiData);
    getTradeProduct(apiData).then((res) => {
      console.log(res);
      const settingData = res.data?.products ? res.data?.products : [];
      setProductData(settingData);
      console.log(settingData);
      // 더 보여줄 데이터가 있을 시 더보기 버튼 보이기
      if (settingData?.length > 0) {
        setStartLoad(false);
      }
    });
  };

  const handleSearch = () => {
    setStartLoad(true);
    getTradeList(searchText);
  };

  return (
    <Screen>
      <CustomTab
        handleSearch={handleSearch}
        searchText={searchText}
        setSearchText={setSearchText}
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
            <div className="productGridContainer">
              {productData &&
                productData?.map((e, i) => {
                  return (
                    <TradeCard
                      key={`${i}_${e.title}`}
                      data={e}
                      type={'product'}
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

export default ProductTradeScreen;
