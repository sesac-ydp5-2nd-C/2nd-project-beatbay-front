import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import tradeSample from '../../../asset/tradeSample.png';
import Screen from '../../Screen';
import CustomTab from '../../../components/common/customTab/CustomTab';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';

function ProductTradeScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
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
            <button onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
              {dropdownVisibility ? 'Close' : 'Open'}
            </button>
            <CustomDropdown visibility={dropdownVisibility}>
              <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
              </ul>
            </CustomDropdown>
          </div>
          <div className="productGridContainer">
            {productData.map((e, i) => {
              return <TradeCard key={`${i}_${e.title}`} data={e} />;
            })}
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default ProductTradeScreen;
