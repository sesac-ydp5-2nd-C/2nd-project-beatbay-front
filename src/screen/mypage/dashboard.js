import React, { useEffect } from 'react';
import './style.scss';
import Screen from '../Screen';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import MypageMenus from '../../components/Mypage/MypageMenus';

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
        <div className="content"></div>
      </div>
    </Screen>
  );
}

export default MypageDashboard;
