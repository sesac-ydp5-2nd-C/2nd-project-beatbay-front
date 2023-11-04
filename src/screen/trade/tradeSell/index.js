import React, { useState } from 'react';
import Screen from '../../Screen';
import SellFormCategory from '../../../components/SellForm/SellFormCategory';
import SellFormStatus from '../../../components/SellForm/SellFormStatus';
import './styles.scss';
import SellFromImg from '../../../components/SellForm/SellFromImg';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { useNavigate } from 'react-router-dom';

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
  const items = [
    '무관',
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

  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
  const [price, setPrice] = useState(null);
  const [context, setContext] = useState('');
  const [status, setStatus] = useState(null);
  const [method, setMethod] = useState([]);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [showDropdown, setShowDropdown] = useState('');

  const handleMethodChange = (value) => {
    if (method.includes(value)) {
      setMethod(method.filter((item) => item !== value));
    } else {
      setMethod([...method, value]);
    }
  };

  const selectedIndex = items.indexOf(selectedItem);

  const calculateMethod = () => {
    if (method.length === 0) {
      return 0;
    } else if (method.length === 1) {
      if (method.includes('direct')) {
        return 0;
      } else if (method.includes('delivery')) {
        return 1;
      }
    }
    return 2;
  };

  const methodType = calculateMethod();

  const sellFormData = {
    title: title,
    selectedType: selectedType,
    selectedCategory: selectedCategory + 1,
    selectedSubCategory: selectedSubCategory + 1,
    filePaths: filePaths,
    price: Number(price),
    context: context,
    status: Number(status),
    method: methodType,
    location: selectedIndex,
  };

  const [isFormValid, setIsFormValid] = useState(true);

  const buttonClick = () => {
    if (
      !title ||
      !selectedType ||
      !selectedCategory ||
      !selectedSubCategory ||
      !uploadImages.length ||
      !filePaths.length ||
      !price ||
      !context ||
      status === null ||
      method.length === 0 ||
      !selectedItem
    ) {
      setIsFormValid(false);
      return;
    } else {
      console.log(sellFormData);
    }
  };

  const nav = useNavigate();
  const hadleBack = () => {
    nav(-1);
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
              <div className="sellInputContainer">
                <input
                  type="text"
                  id="sellTitle"
                  placeholder="제목을 입력하세요."
                  onChange={(e) => setTitle(e.target.value)}
                />
                {!title && !isFormValid && (
                  <p className="sellFormMsg">제목은 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <section className="sellCategorySection">
              <span className="formList">카테고리</span>
              <div className="sellInputContainer">
                <SellFormCategory
                  categories={categories}
                  selectedType={selectedType}
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  setSelectedType={setSelectedType}
                  setSelectedCategory={setSelectedCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                />
                {(selectedType === null ||
                  selectedCategory === null ||
                  selectedSubCategory === null) &&
                  !isFormValid && (
                    <p className="sellFormMsg">카테고리는 필수 항목입니다.</p>
                  )}
              </div>
            </section>
            <section className="sellImgSection">
              <p className="formList">
                <p>상품이미지</p>
                <p>({uploadImages.length}/5)</p>
              </p>
              <div className="sellInputContainer">
                <SellFromImg
                  uploadImages={uploadImages}
                  setUploadImages={setUploadImages}
                  setFilePaths={setFilePaths}
                  filePaths={filePaths}
                />
                {uploadImages.length === 0 && !isFormValid && (
                  <p className="sellFormMsg">이미지는 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <section className="sellPriceSection">
              <span htmlFor="sellPrice" className="formList">
                가격
              </span>
              <div className="sellInputContainer">
                <input
                  type="number"
                  id="sellPrice"
                  placeholder="0"
                  onChange={(e) => setPrice(e.target.value)}
                />
                원
                {!price && !isFormValid && (
                  <p className="sellFormMsg">가격은 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <section className="sellContextSection">
              <span htmlFor="sellContext" className="formList">
                설명
              </span>
              <div className="sellInputContainer">
                <textarea
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="상품 설명을 입력하세요."
                />{' '}
                {!context && !isFormValid && (
                  <p className="sellFormMsg">설명은 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <section className="sellStatusSection">
              <span className="formList">상품 상태</span>
              <div className="sellInputContainer">
                <SellFormStatus status={status} setStatus={setStatus} />
                {status === null && !isFormValid && (
                  <p className="sellFormMsg">상품 상태는 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <section className="sellMethodSection">
              <span className="formList">거래 방식</span>
              <div className="sellInputContainer">
                <label className="sellRadio">
                  <input
                    type="checkbox"
                    name="methodRadio0"
                    value="direct"
                    checked={method.includes('direct')}
                    onChange={() => handleMethodChange('direct')}
                  />
                  <span>직거래</span>
                </label>
                <label className="sellRadio">
                  <input
                    type="checkbox"
                    name="methodRadio1"
                    value="delivery"
                    checked={method.includes('delivery')}
                    onChange={() => handleMethodChange('delivery')}
                  />
                  <span>비대면거래</span>
                </label>
                {method.length === 0 && !isFormValid && (
                  <p className="sellFormMsg">거래 방식은 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <section className="sellLocationSection">
              <span className="formList">지역</span>
              <div className="sellInputContainer">
                <CustomDropdown
                  showDropdown={showDropdown}
                  setShowDropdown={() => setShowDropdown(!showDropdown)}
                  items={items}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
                {!selectedItem && !isFormValid && (
                  <p className="sellFormMsg">지역은 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <div className="formBtns">
              <button
                type="button"
                className="sellFormExit"
                onClick={hadleBack}
              >
                취소
              </button>
              <button
                type="button"
                className="sellFormSubmit"
                onClick={buttonClick}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </Screen>
  );
}

export default TradeSellScreen;
