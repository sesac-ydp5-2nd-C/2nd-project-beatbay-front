import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../Screen';
import MypageVinyl from '../../components/mypageVinyl/MypageVinyl';
import userImg from '../../asset/profile_default.png';
import MypageProfile from '../../components/mypageProfile/MypageProfile';
import CustomModal from '../../components/common/customModal/CustomModal';
import MypageTab from '../../components/MypageTab/MypageTab';
import InfiniteScroll from 'react-infinite-scroller';
import tradeSample from '../../asset/tradeSample.png';
import TradeCard from '../../components/common/tradeCard/TradeCard';

export default function Userpage() {
  const [userData, setUserData] = useState({
    user_nickname: '대만',
    comment: '“그래, 난 정대만. 포기를 모르는 남자지….”',
    user_interests: ['밴드', '일렉기타'],
    imgSrc: userImg,
    user_grade: 5,
    user_review: 32,
    user_following: 28,
    user_follower: 18,
    itemCount: 20,
  });

  const [reviewsData, setReviewsData] = useState([
    {
      user_nickname: '대만',
      imgSrc: userImg,
      comment:
        '좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요',
    },
    {
      user_nickname: '호열',
      imgSrc: userImg,
      comment:
        '별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용별루에용',
    },
    {
      user_nickname: '백호',
      imgSrc: userImg,
      comment: '굿이에용',
    },
  ]);

  const tabsData = [
    {
      id: 1,
      title: '상품',
    },
    {
      id: 2,
      title: '재능',
    },
  ];

  const [productData, setProductData] = useState(
    new Array(8).fill({
      title: '텔레캐스터 민트 팝니다',
      date: '1일전',
      price: '1,300,000',
      isLike: false,
      img: tradeSample,
    }),
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState();

  const openModal = (data, title) => {
    setModalData(data);
    setModalIsOpen(true);
    setModalTitle(title);
    setModalTitle(title);
    console.log(title, data);
  };

  const closeModal = () => {
    console.log('Modal Closed');
    setModalData(null);
    setModalIsOpen(false);
  };

  return (
    <Screen>
      <div className="sellerProfile">
        <div className="sellerInfo">
          <MypageVinyl userData={userData} />
          <div className="sellercontent">
            <MypageProfile userData={userData} />
            <div className="figures">
              <div
                className="figure followers"
                onClick={() => openModal(reviewsData, '리뷰')}
              >
                <h2>후기</h2>
                <p>{userData.user_review}</p>
              </div>
              <div className="figure followers">
                <h2>팔로워</h2>
                <p>{userData.user_follower}</p>
              </div>
              <div className="figure following">
                <h2>팔로잉</h2>
                <p>{userData.user_following}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sellerListContainer">
          <MypageTab tabsData={tabsData} />
          <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              setProductData([...productData, ...productData]);
              console.log(productData);
            }}
            hasMore={true}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <div className="MpGridContainer">
              {productData.map((e, i) => {
                return <TradeCard key={`${i}_${e.title}`} data={e} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      {modalIsOpen && (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          modalData={modalData}
          modalTitle={modalTitle}
        />
      )}
    </Screen>
  );
}
