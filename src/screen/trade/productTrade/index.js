import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import tradeSample from '../../../asset/tradeSample.png';
import Screen from '../../Screen';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';

function ProductTradeScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);
  const tabsData = [
    {
      id: 1,
      title: '악기',
      content: [
        '관악기',
        '현악기',
        '타악기',
        '건반악가',
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

  const productData = new Array(15).fill({
    title: '텔레캐스터 민트 팝니다',
    date: '1일전',
    price: '1,300,000',
    isLike: false,
    img: tradeSample,
  });

  return (
    <Screen>
      <CustomTab tabsData={tabsData} />

      <div className="postCardContainer">
        <div className="postIntro">POST</div>
        <div className="productGridContainer">
          {productData.map((e, i) => {
            return <TradeCard key={`${i}_${e.title}`} data={e} />;
          })}
        </div>
      </div>
    </Screen>
  );
}

export default ProductTradeScreen;
