import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../../store/feature/userSlice';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageProfile from '../../../components/mypageProfile/MypageProfile';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';

import userImg from '../../../asset/profile_default.png';
import CustomModal from '../../../components/common/customModal/CustomModal';

function MypageDashboardScreen() {
  const [userData, setUserData] = useState({
    user_nickname: '영걸',
    comment:
      'Music Is My Life~~~~~!!~~! dndndndndndnndddddddddddddddddddddddddd',
    user_interests: ['밴드', '베이스', '레슨'],
    imgSrc: userImg,
    user_grade: 5,
    user_review: 32,
    user_following: 28,
    user_follower: 18,
    itemCount: 20,
  });

  const authInfo = useSelector((state) => state.user.authInfo);

  const [reviewsData, setReviewsData] = useState(
    {
      user_nickname: '대만',
      review: '좋아요',
    },
    { user_nickname: '호열', review: '별루에용' },
    {
      user_nickname: '백호',
      review: '굿이에용',
    },
  );

  const [followData, setFollowData] = useState(
    {
      user_nickname: '대만',
      imgSrc: userImg,
    },
    { user_nickname: '호열', imgSrc: userImg },
    {
      user_nickname: '백호',
      imgSrc: userImg,
    },
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setModalIsOpen(false);
  };

  return (
    <Screen>
      <div className="MpContainer">
        <div className="MpContent">
          <MypageVinyl userData={userData} />
          <div className="MpProfile">
            <MypageProfile userData={userData} />
            <div className="figures">
              <div className="figure items">
                <h2>상품</h2>
                <p>{userData.itemCount}</p>
              </div>
              <div
                className="figure followers"
                onClick={() => openModal(reviewsData)}
              >
                <h2>후기</h2>
                <p>{userData.user_review}</p>
              </div>
              <div
                className="figure followers"
                onClick={() => openModal(followData)}
              >
                <h2>팔로워</h2>
                <p>{userData.user_follower}</p>
              </div>
              <div
                className="figure following"
                onClick={() => openModal(followData)}
              >
                <h2>팔로잉</h2>
                <p>{userData.user_following}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MypageMenus userData={userData} />
      {modalIsOpen && (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          modalData={modalData}
        />
      )}
    </Screen>
  );
}

export default MypageDashboardScreen;
