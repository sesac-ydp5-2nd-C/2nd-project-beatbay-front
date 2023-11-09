import React, { useEffect, useState } from 'react';
import Screen from '../../Screen';
import SellFormCategory from '../../../components/SellForm/SellFormCategory';
import SellFormStatus from '../../../components/SellForm/SellFormStatus';
import './styles.scss';
import SellFromImg from '../../../components/SellForm/SellFromImg';
import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
import { useNavigate, useParams, useHistory } from 'react-router-dom';
import {
  getTradeDetailAbility,
  getTradeDetailProduct,
  patchTradeSell,
  postTradeSell,
} from '../../../api/trade';
import { productCategory, abilityCategory } from '../../../function/changeKey';
import axios from 'axios';

function TradeSellScreen() {
  const categories = [
    {
      name: '물품',
      subcategories: [
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
        {
          name: '음반',
          items: ['CD', 'DVD', 'LP', '기타'],
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

  const { id, type } = useParams();
  const [detailData, setDetailData] = useState();
  const [title, setTitle] = useState(
    detailData ? detailData[`${type}_title`] : '',
  );
  const defaultSelectType =
    type === 'product' ? 0 : type === 'ability' ? 1 : null;
  const [selectedType, setSelectedType] = useState(defaultSelectType);

  const [selectedCategory, setSelectedCategory] = useState(
    detailData ? detailData[`${type}_category`] : null,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    detailData ? detailData[`${type}_sub_category`] : null,
  );
  const [uploadImages, setUploadImages] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
  const [price, setPrice] = useState(
    detailData ? detailData[`${type}_price`] : null,
  );
  const [context, setContext] = useState(
    detailData ? detailData[`${type}_content`] : '',
  );
  const [status, setStatus] = useState(
    detailData ? detailData[`${type}_status`] : null,
  );
  const [method, setMethod] = useState([]);
  const [checkedMethods, setCheckedMethods] = useState({
    direct: false,
    delivery: false,
  });
  const [selectLocation, setSelectLocation] = useState(
    detailData ? detailData[`${type}_location`] : '',
  );

  const nav = useNavigate();
  const handleBack = () => {
    nav(-1);
  };

  useEffect(() => {
    if (id) {
      getTradeData();
    }
  }, []);

  useEffect(() => {
    if (detailData && detailData[`${type}_method`] !== null) {
      const methodValue = detailData[`${type}_method`];
      const directChecked = (methodValue & 1) === 0;
      const deliveryChecked = (methodValue & 1) === 1;
      const bothChecked = (methodValue & 2) === 2;
      setCheckedMethods({
        direct: directChecked,
        delivery: deliveryChecked,
        both: bothChecked,
      });
    }
    console.log(selectedType);
    console.log(selectedCategory);
    console.log(selectedSubCategory);
  }, [detailData, type]);

  const getTradeData = async () => {
    (type === 'product'
      ? getTradeDetailProduct({ product_id: id })
      : getTradeDetailAbility({ ability_id: id })
    ).then((res) => {
      console.log(res);
      if (res?.data && res.data[type]) {
        setDetailData(res.data[type]);
        setTitle(res.data[type][`${type}_title`]);
        setStatus(res.data[type][`${type}_status`]);
        setPrice(res.data[type][`${type}_price`]);
        setContext(res.data[type][`${type}_content`]);
        setSelectLocation(res.data[type][`${type}_location`]);
        setSelectedType(defaultSelectType);
        setSelectedCategory(res.data[type][`${type}_category`] - 1);
        setSelectedSubCategory(res.data[type][`${type}_sub_category`] - 1);
      }
    });
  };

  const handleMethodChange = (value) => {
    setCheckedMethods((prevMethods) => ({
      ...prevMethods,
      [value]: !prevMethods[value],
    }));
  };

  const findValue = (parentKey, key) => {
    if (type === 'product') {
      return productCategory(parentKey, key);
    } else {
      return abilityCategory(parentKey, key);
    }
  };

  const calculateMethod = () => {
    let methodValue = 0;
    if (checkedMethods.direct) {
      methodValue |= 0;
    }
    if (checkedMethods.delivery) {
      methodValue |= 1;
    }
    if (checkedMethods.direct && checkedMethods.delivery) {
      methodValue |= 2;
    }
    return methodValue;
  };

  const methodType = calculateMethod();

  const sellFormData = {
    id: id,
    title: title,
    selectedType: selectedType,
    selectedCategory: selectedCategory,
    selectedSubCategory: selectedSubCategory,
    // filePaths: filePaths,
    price: Number(price),
    context: context,
    status: Number(status),
    method: methodType,
    location: selectLocation,
    uploadImages: uploadImages,
  };

  const [isFormValid, setIsFormValid] = useState(true);

  const submitClick = () => {
    console.log(sellFormData.uploadImages);
    console.log(sellFormData.id);

    let typeKeyword;

    if (
      sellFormData.title === null ||
      sellFormData.selectedType === null ||
      sellFormData.selectedCategory === null ||
      sellFormData.selectedSubCategory === null ||
      sellFormData.uploadImages === null ||
      sellFormData.price === null ||
      sellFormData.context === null ||
      sellFormData.status === null ||
      sellFormData.method === null ||
      sellFormData.location === null
    ) {
      setIsFormValid(false);
      return;
    }
    if (sellFormData.selectedType === 0) {
      typeKeyword = 'product';
    } else if (sellFormData.selectedType === 1) {
      typeKeyword = 'talent';
    }
    setIsFormValid(true);
    if (type === 'product' || type === 'ability') {
      patchSellForm();
      nav(`/trade/${type}/detail/${sellFormData.id}`);
    } else {
      postSellForm();
      // const postNavType = () => {
      console.log(sellFormData.id);
      nav(`/trade/${typeKeyword}`);
    }
  };

  const patchSellForm = async () => {
    const formData = new FormData();
    formData.append('id', sellFormData.id);
    formData.append('type', sellFormData.selectedType);
    formData.append('title', sellFormData.title);
    formData.append('category', sellFormData.selectedCategory + 1);
    formData.append('subcategory', sellFormData.selectedSubCategory + 1);
    formData.append('price', sellFormData.price);
    formData.append('content', sellFormData.context);
    formData.append('status', sellFormData.status);
    formData.append('method', sellFormData.method);
    formData.append('location', sellFormData.location);
    formData.append('update', 1);
    uploadImages.forEach((file, index) => {
      formData.append(`uploadFiles`, file);
    });
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    patchTradeSell(formData).then((res) => console.log(res));
  };

  const postSellForm = async () => {
    const formData = new FormData();
    formData.append('type', sellFormData.selectedType);
    formData.append('title', sellFormData.title);
    formData.append('category', sellFormData.selectedCategory + 1);
    formData.append('subcategory', sellFormData.selectedSubCategory + 1);
    formData.append('price', sellFormData.price);
    formData.append('content', sellFormData.context);
    formData.append('status', sellFormData.status);
    formData.append('method', sellFormData.method);
    formData.append('location', sellFormData.location);
    formData.append('update', 1);
    uploadImages.forEach((file, index) => {
      formData.append(`uploadFiles`, file);
    });
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    postTradeSell(formData).then((res) => console.log(res));
  };

  return (
    <Screen>
      <div>
        <div className="sellFormContainer">
          <h1>상품 등록</h1>
          <form className="sellForm" encType="multipart/form-data">
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
                  value={title}
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
                  selectedType={selectedType !== null ? selectedType : null}
                  selectedCategory={
                    selectedCategory !== null ? selectedCategory : null
                  }
                  selectedSubCategory={
                    selectedSubCategory !== null ? selectedSubCategory : null
                  }
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
                {id ? (
                  <div>이미지 변경은 불가능합니다.</div>
                ) : (
                  <SellFromImg
                    uploadImages={uploadImages}
                    setUploadImages={setUploadImages}
                    setFilePaths={setFilePaths}
                    filePaths={filePaths}
                    detailData={detailData}
                  />
                )}
                {!id && uploadImages.length === 0 && !isFormValid && (
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
                  value={price}
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
                  value={context}
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
                    checked={checkedMethods.direct}
                    onChange={() => handleMethodChange('direct')}
                  />
                  <span>직거래</span>
                </label>
                <label className="sellRadio">
                  <input
                    type="checkbox"
                    name="methodRadio1"
                    value="delivery"
                    checked={checkedMethods.delivery}
                    onChange={() => handleMethodChange('delivery')}
                  />
                  <span>비대면거래</span>
                </label>
              </div>
            </section>
            <section className="sellLocationSection">
              <span className="formList">지역</span>
              <div className="sellInputContainer">
                <input
                  type="text"
                  id="sellLocation"
                  placeholder="지역을 입력하세요."
                  onChange={(e) => setSelectLocation(e.target.value)}
                  value={selectLocation}
                />
                {!selectLocation && !isFormValid && (
                  <p className="sellFormMsg">지역은 필수 항목입니다.</p>
                )}
              </div>
            </section>
            <div className="formBtns">
              <button
                type="button"
                className="sellFormExit"
                onClick={handleBack}
              >
                취소
              </button>
              <button
                type="button"
                className="sellFormSubmit"
                onClick={submitClick}
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
