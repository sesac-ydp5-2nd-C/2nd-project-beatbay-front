import React, { useEffect, useRef, useState } from 'react';
import tradeSample from '../../../asset/profile_default.png';
import Screen from '../../Screen';
import downArrow from '../../../asset/down-arrow.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './styles.scss';
import { Carousel } from 'react-responsive-carousel';
import tradeLike from '../../../asset/tradeLike.svg';
import heartFill from '../../../asset/heart_fill.svg';
import time from '../../../asset/time.svg';
import fortissimo from '../../../asset/fortissimo.svg';
import view from '../../../asset/view.svg';
import UserProfileContainer from '../../../components/common/userProfile';

function TradeDetailScreen() {
  const data = {
    id: 1,
    name: '정대만',
    grade: fortissimo,
    introduce: '“그래, 난 정대만. 포기를 모르는 남자지….”',
    profileImg: tradeSample,
    interests: ['밴드', '일렉기타'],
  };
  return (
    <Screen>
      <div className="detailContainer">
        <div className="prdType">
          악기
          <img alt="arrow" src={downArrow} className="rArrow" />
          <p className="type2Depth">현악기</p>
        </div>
        <div className="contentBox">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="tradeImgBox">
              <Carousel
                showStatus={false}
                infiniteLoop
                showThumbs={false}
                emulateTouch
              >
                <div>
                  <img
                    alt="cImg"
                    src={tradeSample}
                    className="tradeCarouselImg"
                  />
                  <p className="legend">자세히 보기</p>
                </div>
                <div>
                  <img
                    alt="cImg"
                    src={tradeSample}
                    className="tradeCarouselImg"
                  />
                  <p className="legend">자세히 보기</p>
                </div>
                <div>
                  <img
                    alt="cImg"
                    src={tradeSample}
                    className="tradeCarouselImg"
                  />
                  <p className="legend">자세히 보기</p>
                </div>
              </Carousel>
            </div>

            <div className="tradeDetailBox">
              <div className="titleBox">
                <div className="TTitle">통기타 팔아요~~ 🎸</div>
                <img
                  alt="like"
                  src={tradeLike || heartFill}
                  className="tLike"
                />
              </div>
              <div className="detailPrice">100,000,000 원</div>
              <div className="TVLContainer">
                <img alt="icon" src={time} className={'TVLIcon'} />
                2일 전
                <div className="ICenter">
                  <img alt="icon" src={view} className={'TVLIcon'} />
                  28
                </div>
                <img alt="icon" src={tradeLike} className={'TVLIcon'} />
                18
              </div>

              <ul className="regionInfo">
                <li className="tdInfo">지역: 무관</li>
                <li className="tdInfo">물품상태: 최상</li>
                <li className="tdInfo">거래방식: 직거래 / 비대면</li>
              </ul>
            </div>
          </div>

          <div className="flexEnd">
            <button className="tDBtn">거래상태</button>
            <button className="tDBtn">수정</button>
            <button className="tDBtn">삭제</button>
          </div>

          <div className="tradeContent">
            {'그저 하염없이 눈물이 나\n\n그저 하염없이 서글퍼 져'}
          </div>
        </div>

        <div className="prdType">판매자</div>
        <div className="tradeUserContainer">
          <div className="tradeUserContainer">
            <UserProfileContainer followingData={data} />
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default TradeDetailScreen;
