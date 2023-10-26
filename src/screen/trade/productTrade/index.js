import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../Screen';
import CustomTab from '../../../components/customTab/CustomTab';

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

  useEffect(() => {}, []);

  return (
    <Screen>
      <CustomTab tabsData={tabsData} />

      <div className="button-container">
        <div className="button-list">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
          <button>Button 4</button>
          <button>Button 5</button>
          <button>Button 6</button>
        </div>
      </div>
    </Screen>
  );
}

export default ProductTradeScreen;
