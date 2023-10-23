import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import Screen from '../Screen';

function MainScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

  return <Screen>123</Screen>;
}

export default MainScreen;
