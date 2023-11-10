import pianissimo from '../asset/pianissimo.svg';
import mezzopiano from '../asset/mezzopiano.svg';
import piano from '../asset/piano.svg';
import forte from '../asset/forte.svg';
import mezzoforte from '../asset/mezzoforte.svg';
import fortissimo from '../asset/fortissimo.svg';

export const productCategory = (parentKey, key) => {
  const totalObject = {
    product_category: { 0: '전체', 1: '악기', 2: '음반' },
    product_status: {
      0: '최상',
      1: '상',
      2: '중상',
      3: '중하',
      4: '하',
      5: '최하',
    },
    product_sub_category: {
      0: '전체',
      1: '관악기',
      2: '현악기',
      3: '타악기',
      4: '건반악기',
      5: '전자악기',
      6: ' 앰프/스피커',
      7: '악기용품',
      8: '기타',
    },
    product_method: {
      0: '직거래',
      1: '비대면거래',
      2: '직거래 / 비대면 모두 가능',
    },
    product_update: { 0: '거래 중', 1: '거래 종료' },
  };
  return totalObject[parentKey][key];
};

export const abilityCategory = (parentKey, key) => {
  const totalObject = {
    ability_category: {
      0: '전체',
      1: '레슨',
      2: '악보제작',
      3: '녹음/편집',
      4: '연주',
    },
    ability_status: {
      0: '최상',
      1: '상',
      2: '중상',
      3: '중하',
      4: '하',
      5: '최하',
    },
    ability_sub_category: {
      0: '전체',
      1: '강원도',
      2: '경기도',
      3: '경상도',
      4: '광주',
      5: '대구',
      6: '부산',
      7: '서울',
      8: '울산',
      9: '세종',
      10: '인천',
      11: '전라도',
      12: '제주도',
      13: '충청도',
    },
    ability_method: {
      0: '직거래',
      1: '비대면거래',
      2: '직거래 / 비대면 모두 가능',
    },
    ability_update: { 0: '거래 중', 1: '거래 종료' },
  };
  return totalObject[parentKey][key];
};

export const gradeImg = (e) => {
  switch (e) {
    case 0:
      return pianissimo;
    case 1:
      return mezzopiano;
    case 2:
      return piano;
    case 3:
      return forte;
    case 4:
      return mezzoforte;
    case 5:
      return fortissimo;
    default:
      return pianissimo;
  }
};
