import React, { useState } from 'react';
import './style.scss';
import Screen from '../../Screen';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import tradeSample from '../../../asset/tradeSample.png';
import TradeCard from '../../../components/common/tradeCard/TradeCard';
import MypageTab from '../../../components/MypageTab/MypageTab';

import InfiniteScroll from 'react-infinite-scroller';
import forte from '../../../asset/forte.svg';
import mezzoforte from '../../../asset/mezzoforte.svg';
import fortissimo from '../../../asset/fortissimo.svg';
import piano from '../../../asset/piano.svg';
import mezzopiano from '../../../asset/mezzopiano.svg';
import pianissimo from '../../../asset/pianissimo.svg';
import UserProfileContainer from '../../../components/common/userProfile';
import userImg from '../../../asset/profile_default.png';

export default function MypageLikesScreen() {
  const tabsData = [
    {
      id: 1,
      title: 'FOLLOWING',
    },
    {
      id: 2,
      title: 'ITEM',
    },
  ];

  const [followingData, setFollowingData] = useState([
    {
      id: 1,
      name: '정대만',
      grade: fortissimo,
      introduce: '“그래, 난 정대만. 포기를 모르는 남자지….”',
      profileImg: userImg,
      interests: ['밴드', '일렉기타'],
    },
    {
      id: 2,
      name: '이명헌',
      grade: mezzopiano,
      introduce: '“...뿅”',
      profileImg: userImg,
      interests: ['밴드', '일렉기타'],
    },
    {
      id: 3,
      name: '강백호',
      grade: mezzoforte,
      introduce: '“왼손은 거들 뿐”',
      profileImg: userImg,
      interests: ['밴드', '일렉기타'],
    },
  ]);
  return (
    <Screen>
      <div className="MLContainer">
        <div className="MLContent">
          <div className="MpListContainer">
            <div className="MpTopBox">
              <div className="MpTitleBox">
                <h1>LIKES</h1>
              </div>
              <div className="vinyl">
                <MypageVinyl />
              </div>
            </div>
            <MypageTab tabsData={tabsData} />
            <div className="MpFollowingContainer">
              {followingData.map((data, index) => (
                <UserProfileContainer key={index} followingData={data} />
              ))}
            </div>
          </div>
        </div>
        <MypageMenus />
      </div>
    </Screen>
  );
}
