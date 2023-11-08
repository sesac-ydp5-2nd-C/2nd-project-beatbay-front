import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageProfile from '../../../components/mypageProfile/MypageProfile';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';

import userImg from '../../../asset/profile_default.png';
import CustomModal from '../../../components/common/customModal/CustomModal';
import {
  getMyFollowers,
  getMyFollowing,
  getMyReviews,
  getMypage,
} from '../../../api/mypage';
import { Link } from 'react-router-dom';

function MypageDashboardScreen() {
  useEffect(() => {
    gogogo();
  }, []);
  const gogogo = () => {
    getMypage().then((result) => {
      if (result.data.userData) {
        setMyPageData(result.data);
      }
    });
    getMyReviews().then((res) => {
      if (res.data) {
        setReviewsData(res.data);
      }
    });
    getMyFollowers().then((res) => {
      console.log(res.data);
      if (res.data) {
        setFollowData(res.data);
      }
    });
    getMyFollowing().then((res) => {
      if (res.data) {
        setFollowingData(res.data);
      }
    });
  };

  const [mypageData, setMyPageData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [followData, setFollowData] = useState();
  const [followingData, setFollowingData] = useState();
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
      {mypageData && (
        <div className="MpContainer">
          <div className="MpContent">
            <MypageVinyl userData={mypageData.userData} />
            <div className="MpProfile">
              <MypageProfile userData={mypageData.userData} />
              <div className="figures">
                <Link to="/mypage/sell">
                  <div className="figure items">
                    <h2>상품</h2>
                    <p>{mypageData.itemCount}</p>
                  </div>
                </Link>
                <div
                  className="figure followers"
                  onClick={() => openModal(reviewsData.review, '리뷰')}
                >
                  <h2>후기</h2>
                  <p>{mypageData.reviewCount}</p>
                </div>
                <div
                  className="figure followers"
                  onClick={() => openModal(followData.follower, '팔로워')}
                >
                  <h2>팔로워</h2>
                  <p>{mypageData.followerCount}</p>
                </div>
                <div
                  className="figure following"
                  onClick={() => openModal(followingData.following, '팔로잉')}
                >
                  <h2>팔로잉</h2>
                  <p>{mypageData.followingCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <MypageMenus />
      {modalIsOpen && modalData && (
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
