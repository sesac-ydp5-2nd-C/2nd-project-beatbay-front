import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import { useSelector } from 'react-redux';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageProfile from '../../../components/mypageProfile/MypageProfile';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import axios from 'axios';

import userImg from '../../../asset/profile_default.png';
import CustomModal from '../../../components/common/customModal/CustomModal';
import { postUserLogin } from '../../../api/user';
import { getMypage } from '../../../api/mypage';

function MypageDashboardScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);
  const [mypageData, setMyPageData] = useState();
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
  const [followData, setFollowData] = useState([
    {
      user_nickname: '해리',
      imgSrc: userImg,
    },
    {
      user_nickname: '론',
      imgSrc: userImg,
    },
    {
      user_nickname: '헤르미온느',
      imgSrc: userImg,
    },
  ]);

  useEffect(() => {
    gogogo();
  }, []);

  const gogogo = async () => {
    postUserLogin().then((res) => {
      console.log(res);
      getMypage().then((result) => {
        console.log(result);
        setMyPageData(result.data);
        console.log('mypageData:', mypageData); // undefined 가 계속 뜨는데.,,
        console.log('mypageData.userData:', mypageData.userData);
      });
    });
  };

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
      {/* <div>
        {userData.userData.user_nickname}
        {userData.itemCount}
      </div> */}
      <div className="MpContainer">
        <div className="MpContent">
          <MypageVinyl userData={mypageData.userData} />
          <div className="MpProfile">
            <MypageProfile userData={mypageData.userData} />
            <div className="figures">
              <div className="figure items">
                <h2>상품</h2>
                <p>{mypageData.itemCount}</p>
              </div>
              <div
                className="figure followers"
                onClick={() => openModal(reviewsData, '리뷰')}
              >
                <h2>후기</h2>
                <p>{mypageData.userData.user_comment ?? 0}</p>
              </div>
              <div
                className="figure followers"
                onClick={() => openModal(followData, '팔로워')}
              >
                <h2>팔로워</h2>
                <p>{followData.length}</p>
              </div>
              <div
                className="figure following"
                onClick={() => openModal(followData, '팔로잉')}
              >
                <h2>팔로잉</h2>
                <p>{followData.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MypageMenus />
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

export default MypageDashboardScreen;
