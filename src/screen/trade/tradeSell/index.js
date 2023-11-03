import React, { useState } from 'react';
import Screen from '../../Screen';
import SellFormCategory from '../../../components/SellFormCategory/SellFormCategory';

function TradeSellScreen() {
  const categories = [
    {
      name: '물품',
      subcategories: [
        {
          name: '음반',
          items: ['CD', 'DVD', 'LP', '기타'],
        },
        {
          name: '악기',
          items: [
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
      ],
    },
    {
      name: '재능',
      subcategories: [
        {
          name: '레슨',
          items: [
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
          ],
        },
        {
          name: '악보제작',
          items: [
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
          ],
        },
        {
          name: '녹음/편집',
          items: [
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
          ],
        },
        {
          name: '연주',
          items: [
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
          ],
        },
      ],
    },
  ];

  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const sellFormData = {
    selectedType: selectedType,
    selectedCategory: selectedCategory + 1,
    selectedSubCategory: selectedSubCategory + 1,
  };

  const buttonClick = () => {
    console.log(sellFormData);
  };

  return (
    <Screen>
      <form>
        <SellFormCategory
          categories={categories}
          selectedType={selectedType}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedType={setSelectedType}
          setSelectedCategory={setSelectedCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      </form>
      <button type="button" className="sellFormSubmit" onClick={buttonClick}>
        등록
      </button>
    </Screen>
  );
}

export default TradeSellScreen;
