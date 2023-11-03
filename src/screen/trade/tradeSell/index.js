import React, { useState } from 'react';
import Screen from '../../Screen';
import SellFormCategory from '../../../components/SellFormCategory/SellFormCategory';

function TradeSellScreen() {
  const categories = [
    {
      name: '재능',
      subcategories: [
        {
          name: '노래',
          cities: ['부산', '서울'],
        },
        {
          name: '춤',
          cities: ['충청', '경기'],
        },
      ],
    },
    {
      name: '물품',
      subcategories: [
        {
          name: '음반',
          types: ['CD', 'LP'],
        },
        {
          name: '악기',
          instruments: ['리코더', '피아노'],
        },
      ],
    },
  ];

  return (
    <Screen>
      {/* categories props를 SellFormCategory 컴포넌트에 전달 */}
      <SellFormCategory categories={categories} />
    </Screen>
  );
}

export default TradeSellScreen;
