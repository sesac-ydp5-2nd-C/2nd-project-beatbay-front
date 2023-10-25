import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import Header from '../../components/Header/Header';
import MypageMenus from '../../components/Mypage/MypageMenus';

function MypageDashboard() {
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

  return (
    <div className="Mypage Dashboard">
      <Header />
      <div className="container">
        <MypageMenus />
        <div className="content"></div>
      </div>
    </div>
  );
}

export default MypageDashboard;
