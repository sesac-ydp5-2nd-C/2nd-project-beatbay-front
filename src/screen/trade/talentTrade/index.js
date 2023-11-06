import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import tradeSample from '../../../asset/tradeSample.png';
import LoadingSpinner from '../../../components/common/loadingSpinner';
import Screen from '../../Screen';
import InfiniteScroll from 'react-infinite-scroller';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { getTradeAbility } from '../../../api/trade';
import emptyLogo from '../../../asset/emptyLogo.svg';
import EmptyTrade from '../../../components/common/emptyTrade/EmptyTrade';

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
  const [productData, setProductData] = useState();
  const [startLoad, setStartLoad] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setStartLoad(true);
    setCurrentPage(0);
    setTotalPage(1);
    getAbilityList();
  }, [selectedItem, activeContent, activeTab]);

  const getAbilityList = async (search = null, page = null) => {
    setProductData();
    const apiData = {
      orderMethod: items.indexOf(selectedItem),
      categoryNum: activeTab.id,
      subCategoryNum: activeTab.content.indexOf(activeContent) + 1,
      searchKeyword: search ? search : undefined,
      page: page ? page : undefined,
    };
    getTradeAbility(apiData).then((res) => {
      const settingData = res.data?.abilities.abilities
        ? res.data?.abilities.abilities
        : [];
      if (page) {
        setProductData([...productData, ...settingData]);
      } else {
        setProductData(settingData);
      }
      setCurrentPage(res.data?.abilities.pageNum);
      setTotalPage(res.data?.abilities.totalPages);
      // 더 보여줄 데이터가 있을 시 더보기 버튼 보이기
      if (res.data?.abilities.totalPages > res.data?.abilities.pageNum) {
        setStartLoad(false);
      }
    });
  };

  const handleSearch = () => {
    setStartLoad(true);
    getAbilityList(searchText);
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
                getAbilityList(null, currentPage + 1);
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
                      type={'ability'}
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

export default TalentTradeScreen;
