import React, { useState } from 'react';
import Screen from '../../Screen';
import SellFormCategory from '../../../components/SellForm/SellFormCategory';
import SellFormStatus from '../../../components/SellForm/SellFormStatus';
import './styles.scss';
import SellFromImg from '../../../components/SellForm/SellFromImg';

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
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const sellFormData = {
    selectedType: selectedType,
    selectedCategory: selectedCategory + 1,
    selectedSubCategory: selectedSubCategory + 1,
    selectedMethod: selectedMethod,
  };

  const buttonClick = () => {
    console.log(sellFormData);
  };

  const handleMethodChange = (value) => {
    if (selectedMethod.includes(value)) {
      setSelectedMethod(selectedMethod.filter((item) => item !== value));
    } else {
      setSelectedMethod([...selectedMethod, value]);
    }
  };

  return (
    <Screen>
      <div>
        <div className="sellFormContainer">
          <h1>상품 등록</h1>
          <form className="sellForm">
            <section className="sellTitleSection">
              <span htmlFor="sellTitle" className="formList">
                제목
              </span>
              <input type="text" id="sellTitle" />
            </section>
            <section className="sellCategorySection">
              <span className="formList">카테고리</span>
              <SellFormCategory
                categories={categories}
                selectedType={selectedType}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedType={setSelectedType}
                setSelectedCategory={setSelectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
              />
            </section>
            <section className="sellImgSection">
              <p className="formList">
                <p>상품이미지</p>
                <p>({uploadImages.length}/5)</p>
              </p>
              <SellFromImg
                uploadImages={uploadImages}
                setUploadImages={setUploadImages}
              />
            </section>
            <section className="sellPriceSection">
              <span htmlFor="sellPrice" className="formList">
                가격
              </span>
              <input type="number" />원
            </section>
            <section className="sellContextSection">
              <span htmlFor="sellContext" className="formList">
                설명
              </span>
              <textarea />{' '}
            </section>
            <section className="sellStatusSection">
              <span className="formList">상품 상태</span>
              <SellFormStatus />
            </section>
            <section className="sellMethodSection">
              <span className="formList">거래 방식</span>
              <label className="sellRadio">
                <input
                  type="checkbox"
                  name="methodRadio0"
                  value="0"
                  checked={selectedMethod.includes(0)}
                  onChange={() => handleMethodChange(0)}
                />
                <span>직거래</span>
              </label>
              <label className="sellRadio">
                <input
                  type="checkbox"
                  name="methodRadio1"
                  value="1"
                  checked={selectedMethod.includes(1)}
                  onChange={() => handleMethodChange(1)}
                />
                <span>비대면거래</span>
              </label>
            </section>
            <section className="sellLocationSection"></section>
            <button
              type="button"
              className="sellFormSubmit"
              onClick={buttonClick}
            >
              등록
            </button>
          </form>
        </div>
      </div>
    </Screen>
  );
}

export default TradeSellScreen;
