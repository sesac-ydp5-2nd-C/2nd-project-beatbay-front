import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import Screen from '../Screen';

function MainScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

  return (
    <Screen headerColor="white">
      <img className="disk" alt="disk" src="disk.png" />
    </Screen>
  );
}

export default MainScreen;
