import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo } from '../../store/feature/userSlice';
import Screen from '../Screen';
import IntroVideo from '../../components/MainPage/introVideo/IntroVideo';
import CustomCarousel from '../../components/MainPage/customCarousel/CustomCarousel';
import ColumnCard from '../../components/MainPage/columnCard/ColumnCard';
import CustomFooter from '../../components/MainPage/customFooter/CustomFooter';
import { Cookies } from 'react-cookie';

function MainScreen() {
  const cookies = new Cookies();
  const [columnData, setColumnData] = useState([
    {
      src: 'columnImg1.png',
      title: '나는 왜\n코딩이 어려운가',
      content: '미주알고주알미주알고주알미주알고주알미주알고주알미주알고주알',
    },
    {
      src: 'columnImg2.png',
      title: '기타의 매력에 대한\n네 가지 해석',
      content: '미주알고주알미주알고주알미주알고주알미주알고주알미주알고주알',
    },
    {
      src: 'columnImg3.png',
      title: '왜 클래식을 듣는가?',
      content: '미주알고주알미주알고주알미주알고주알미주알고주알미주알고주알',
    },
  ]);
  const authInfo = useSelector((state) => state.user.authInfo);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

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
          {columnData.map((e, i) => {
            return (
              <ColumnCard
                key={`${e}_${i}`}
                mid={i === 1 ? true : false}
                src={e.src}
                title={e.title}
                content={e.content}
              />
            );
          })}
        </div>
      </div>

      <CustomFooter />
    </Screen>
  );
}

export default MainScreen;
