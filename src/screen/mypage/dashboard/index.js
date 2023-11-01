import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../../store/feature/userSlice';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageProfile from '../../../components/mypageProfile/MypageProfile';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import userImg from '../../../asset/profile_default.png';

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

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
              <div className="figure followers">
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
      </div>
      <MypageMenus userData={userData} />
    </Screen>
  );
}

export default MypageDashboardScreen;
