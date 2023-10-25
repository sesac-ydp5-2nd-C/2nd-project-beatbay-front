import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import Screen from '../Screen';
import IntroVideo from '../../components/introVideo/IntroVideo';
import CustomCarousel from '../../components/customCarousel/CustomCarousel';
import ColumnCard from '../../components/columnCard/ColumnCard';

function MainScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthInfo(1));
  }, []);

  return (
    <Screen headerColor="white">
      <img className="disk" alt="disk" src="disk.png" />

      <div className="intro">
        <p className="intro1">
          악기 중고거래부터 재능 마켓까지 음악 거래의 새로운 중심지
        </p>
        <p className="intro2">BEAT BAY</p>
        <p className="intro3">
          We offer all used transaction services related to music.
        </p>
        <p className="intro3">Even the talents that you want to show!</p>
      </div>

      <div className="scrollContainer">
        <div className="scrollLine"></div>
        <div className="scrollBall"></div>
      </div>

      <IntroVideo src={'sampleVideo.webm'} />

      <IntroVideo src={'sampleVideo.webm'} reverse />

      <CustomCarousel />
      <div className="columnContainer">
        <div className="columns">
          {[0, 1, 2].map((e) => {
            return <ColumnCard />;
          })}
        </div>
      </div>
    </Screen>
  );
}

export default MainScreen;
