import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import MypageMenus from '../../components/mypageMenu/MypageMenus';
import MypageProfile from '../../components/mypageProfile/MypageProfile';
import MypageVinyl from '../../components/mypageVinyl/MypageVinyl';

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
    <Screen className="dashboard">
      <div className="MpContainer">
        <div className="MpContent">
          <MypageVinyl />
          <div className="MpProfile">
            <MypageProfile />
            <div className="figures">
              <div className="figure grade">
                <h2>GRADE</h2>
                <div>
                  <img src="mezzoforte.svg" alt="grade" className="gradeImg" />
                  <span className="gradeText">Mezzo Forte</span>
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
              <div className="figure followers">
                <h2>REVIEWS</h2>
                <p>28</p>
              </div>
            </div>
          </div>
        </div>
        <MypageMenus />
      </div>
    </Screen>
  );
}

export default MypageDashboard;
