import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import MypageMenus from '../../components/Mypage/MypageMenus';
import Mypageprofile from '../../components/Mypage/Mypageprofile';
import MypageReview from '../../components/Mypage/MypageReview';

function MypageDashboard() {
  const [reviewData, setReviewData] = useState([
    {
      userImg: 'profile_default.png',
      userName: '강백호',
      userType: 'Buyer',
      reviewContent: '배고프다',
    },
    {
      userImg: 'profile_default.png',
      userName: '정대만',
      userType: 'Buyer',
      reviewContent: '잠온다',
    },
    {
      userImg: 'profile_default.png',
      userName: '이명헌',
      userType: 'Seller',
      reviewContent:
        'Proident voluptate veniam voluptate mollit reprehenderit anim officia et ea ex laboris nulla laboris. Nulla ut aliquip fugiat tempor veniam sint aliqua reprehenderit tempor Lorem commodo anim.',
    },
  ]);
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

  return (
    <Screen bgColor="bgPurple" headerColor="white" className="dashboard">
      <div className="container">
        <MypageMenus />
        <div className="content">
          <Mypageprofile />

          <div className="figures">
            <div className="figure grade">
              <h2>GRADE</h2>
              <div>
                <img src="mezzoforte.svg" alt="grade" />
                <span>Mezzo Forte</span>
              </div>
            </div>
            <div className="figure items">
              <h2>ITEMS</h2>
              <p>18</p>
            </div>
            <div className="figure followers">
              <h2>FOLLOWERS</h2>
              <p>28</p>
            </div>
          </div>

          <hr />

          <div className="reviews">
            {reviewData.map((e, i) => {
              return (
                <MypageReview
                  userImg={e.userImg}
                  userName={e.userName}
                  userType={e.userType}
                  reviewContent={e.reviewContent}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default MypageDashboard;
