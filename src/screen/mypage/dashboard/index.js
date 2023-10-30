import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../../store/feature/userSlice';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageProfile from '../../../components/mypageProfile/MypageProfile';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import userImg from '../../../asset/profile_default.png';
import mezzoforte from '../../../asset/mezzoforte.svg';

function MypageDashboardScreen() {
  const [userData, setUserData] = useState({
    username: '영걸',
    introduce:
      'Music Is My Life~~~~~!!~~! dndndndndndnndddddddddddddddddddddddddd',
    interests: ['밴드', '베이스', '레슨'],
    imgSrc: userImg,
    grade: mezzoforte,
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
              <div className="figure grade">
                <h2>GRADE</h2>
                <div>
                  <img src={userData.grade} alt="grade" className="gradeImg" />
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
      </div>
      <MypageMenus />
    </Screen>
  );
}

export default MypageDashboardScreen;
