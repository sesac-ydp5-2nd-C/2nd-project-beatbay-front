import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
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

  useEffect(() => {
    getTradeList();
  }, [selectedItem, activeContent]);

  const getTradeList = async () => {
    const apiData = {
      orderMethod: items.indexOf(selectedItem),
      categoryNum: activeTab.id,
      subCategoryNum: activeTab.content.indexOf(activeContent) + 1,
    };
    console.log(apiData);
    getTradeProduct(apiData).then((res) => {
      setProductData(res.data?.products ? res.data?.products : []);
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
              productData?.length === 0 ? (
                <div className="loader" key={0}>
                  <img
                    src={RollingSpinner}
                    alt="spinner"
                    className="loaderGif"
                  />
                </div>
              ) : (
                <div>데이터가 없습니다</div>
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
