import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../Screen';
import IntroVideo from '../../components/MainPage/introVideo/IntroVideo';
import CustomCarousel from '../../components/MainPage/customCarousel/CustomCarousel';
import ColumnCard from '../../components/MainPage/columnCard/ColumnCard';
import CustomFooter from '../../components/MainPage/customFooter/CustomFooter';
import mainVideo1 from '../../asset/mainVideo1.mp4';
import mainVideo2 from '../../asset/mainVideo2.mp4';
import { getMain } from '../../api/user';

function MainScreen() {
  const [columnData, setColumnData] = useState([
    {
      src: 'columnImg1.png',
      title: '느리고 점진적인: 록의 죽음에 대해',
      content:
        '‘록은 쇠퇴했다’. ‘Rock Will Never Die’가 록 음악의 팬들에게 오랜 시간 동안 통용되었던 격언이라는 것을 생각해 보면, 록이 더 이상 주류의, 혹은 인기 있는 음악이 아니라는 건 모든 사람이 인정할 수밖에 없는 사실로 보인다.',
      url: 'https://heterophony.kr/death-of-rock/',
    },
    {
      src: 'columnImg2.png',
      title: '대중음악의 힘',
      content:
        '대중음악은 우리 삶의 반영이자 감정을 나타내는 예술로, 밥 딜런과 같은 아티스트들은 음악을 통해 사회적 메시지와 감동을 전달해왔습니다.',
      url: 'https://www.daejonilbo.com/news/articleView.html?idxno=2078719',
    },
    {
      src: 'columnImg3.png',
      title: '음악가들의 별칭, 제대로 붙인 걸까?',
      content:
        '학교 음악시간에 음악의 대가들에 대해 배울 때, 그 이름 앞에 수식어처럼 붙는 별칭도 알아두어야 했다. ‘음악의 아버지 바흐’, ‘교향곡의 아버지 하이든’, ‘음악의 신동 모차르트’, ‘악성 베토벤’, ‘가곡의 왕 슈베르트’, ‘피아노의 시인 쇼팽’, ‘왈츠의 왕 요한 슈트라우스’, ‘가극(오페라)의 제왕 베르디’. 과연 이 별칭들은 제대로 잘 갖다 붙인 것일까? 지금부터 확인해보자.',
      url: 'https://www.thecolumnist.kr/news/articleView.html?idxno=967',
    },
  ]);
  const [startLoad, setStartLoad] = useState(false);

  useEffect(() => {
    getMain().then((res) => {
      console.log(res);
      if (res.data?.loginUser) {
        localStorage.setItem('login_id', res.data?.loginUser?.id);
        localStorage.setItem('email', res.data?.loginUser?.userId);
      } else {
        localStorage.removeItem('login_id');
        localStorage.removeItem('email');
      }
      setStartLoad(true);
    });
  }, []);

  return (
    <Screen headerColor="white">
      {startLoad && (
        <>
          <div className="diskContainer">
            <img className="disk" alt="disk" src="disk.png" />
          </div>
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

          <IntroVideo src={mainVideo1} />

          <IntroVideo src={mainVideo2} reverse />

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
                    url={e.url}
                  />
                );
              })}
            </div>
          </div>

          <CustomFooter />
        </>
      )}
    </Screen>
  );
}

export default MainScreen;
