import React, { useEffect } from 'react';
import './style.scss';
import Screen from '../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import MypageMenus from '../../components/Mypage/MypageMenus';
import Mypageprofile from '../../components/Mypage/Mypageprofile';

function MypageDashboard() {
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
        </div>
      </div>
    </Screen>
  );
}

export default MypageDashboard;
