import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import Screen from '../../Screen';
import InfiniteScroll from 'react-infinite-scroller';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import LoadingSpinner from '../../../components/common/loadingSpinner';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { getTradeProduct } from '../../../api/trade';
import EmptyTrade from '../../../components/common/emptyTrade/EmptyTrade';
import write from '../../../asset/write.svg';
import { Link } from 'react-router-dom';

function ProductTradeScreen() {
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    // 카테고리, 순서 바뀔때 마다 초기화
    setStartLoad(true);
    setCurrentPage(0);
    setTotalPage(1);
    getTradeList();
  }, [selectedItem, activeContent]);

  const getTradeList = async (search = null, page = null) => {
    if (!page) {
      setProductData();
    }
    const apiData = {
      orderMethod: items.indexOf(selectedItem),
      categoryNum: activeTab.id,
      subCategoryNum: activeTab.content.indexOf(activeContent) + 1,
      searchKeyword: search ? search : undefined,
      page: page ? page : undefined,
    };
    getTradeProduct(apiData).then((res) => {
      console.log(res);
      const settingData = res.data?.products.products
        ? res.data?.products.products
        : [];
      if (page) {
        setProductData([...productData, ...settingData]);
      } else {
        setProductData(settingData);
      }
      setCurrentPage(res.data?.products.pageNum);
      setTotalPage(res.data?.products.totalPages);
      // 더 보여줄 데이터가 있을 시 더보기 버튼 보이기
      if (res.data?.products.totalPages > res.data?.products.pageNum) {
        // if (true) {
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
            <Link to={'/trade/sell'}>
              <div className="postIntro">
                <img alt="write" src={write} className="writeIcon" />
                POST
              </div>
            </Link>
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
                getTradeList(null, currentPage + 1);
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
              <EmptyTrade where={'거래 장터가'} />
            ) : (
              <div className="productGridContainer">
                {productData?.map((e, i) => {
                  return (
                    <TradeCard
                      key={`${i}_${e.title}`}
                      data={e}
                      type={'product'}
                    />
                  );
                })}
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </Screen>
  );
}

export default ProductTradeScreen;
