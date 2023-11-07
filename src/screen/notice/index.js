import React, { useState } from 'react';
import MypageTab from '../../components/MypageTab/MypageTab';
import Screen from '../Screen';
import './style.scss';

export default function NoticeScreen() {
  const tabsData = [
    {
      id: 1,
      title: '공지사항',
    },
    {
      id: 2,
      title: '칼럼',
    },
  ];
  const noticeData = [
    {
      id: 1,
      type: '공지',
      title: 'WELCOME TO BEATBAY!',
      content:
        '비트베이는 악기 중고거래는 물론, 음악과 관련된 모든 재능을 거래할 수 있는 음악 거래의 새로운 중심지 입니다. 믿음직스러운 비트베이에서 여러분들의 음악을 펼쳐주세요!',
    },
    {
      id: 2,
      type: '공지',
      title: 'ver 1.0.6 업데이트',
      content:
        'ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!',
    },
  ];
  const columnData = [
    {
      id: 1,
      type: '칼럼',
      title: '음악가들의 별칭, 제대로 붙인 걸까?',
      content:
        '학교 음악시간에 음악의 대가들에 대해 배울 때, 그 이름 앞에 수식어처럼 붙는 별칭도 알아두어야 했다. ‘음악의 아버지 바흐’, ‘교향곡의 아버지 하이든’, ‘음악의 신동 모차르트’, ‘악성 베토벤’, ‘가곡의 왕 슈베르트’, ‘피아노의 시인 쇼팽’, ‘왈츠의 왕 요한 슈트라우스’, ‘가극(오페라)의 제왕 베르디’. 과연 이 별칭들은 제대로 잘 갖다 붙인 것일까? 지금부터 확인해보자.',
      url: 'https://www.thecolumnist.kr/news/articleView.html?idxno=967',
    },
    {
      id: 2,
      type: '칼럼',
      title: '음악이 없는 나라? 여왕을 배웅한 음악',
      content:
        '‘Das Land ohne Musik 음악이 없는 나라’. ‘음악이 없는 나라’라고? 그런 나라가 있을 리도 없겠지만, 대체 다른 나라에 대해 이런 표현을 한 사람은 얼마나 오만에 쩐 사람일까?',
      url: 'https://www.thecolumnist.kr/news/articleView.html?idxno=1374',
    },
    {
      id: 3,
      type: '칼럼',
      title: '느리고 점진적인: 록의 죽음에 대해',
      content:
        '‘록은 쇠퇴했다’. ‘Rock Will Never Die’가 록 음악의 팬들에게 오랜 시간 동안 통용되었던 격언이라는 것을 생각해 보면, 록이 더 이상 주류의, 혹은 인기 있는 음악이 아니라는 건 모든 사람이 인정할 수밖에 없는 사실로 보인다.',
      url: 'https://heterophony.kr/death-of-rock/',
    },
    {
      id: 4,
      type: '칼럼',
      title: '대중음악의 힘',
      content:
        '대중음악은 우리 삶의 반영이자 감정을 나타내는 예술로, 밥 딜런과 같은 아티스트들은 음악을 통해 사회적 메시지와 감동을 전달해왔습니다.',
      url: 'https://www.daejonilbo.com/news/articleView.html?idxno=2078719',
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(-1);
  const [activeColumnIndex, setActiveColumnIndex] = useState(-1);

  const handleNoticeClick = (noticeIndex) => {
    setActiveTab(tabsData[0]);
    setActiveNoticeIndex(noticeIndex);
    setActiveColumnIndex(-1);
  };

  const handleColumnClick = (columnIndex) => {
    setActiveTab(tabsData[1]);
    setActiveColumnIndex(columnIndex);
    setActiveNoticeIndex(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setActiveNoticeIndex(-1);
    setActiveColumnIndex(-1);
  };

  return (
    <Screen>
      <div className="noticeContainer">
        <div className="mpTabs-Container">
          <ul className="mpTabList">
            {tabsData.map((tab, i) => (
              <li
                key={tab.id}
                className={`mpTab ${activeTab.id === tab.id && 'active'} ${
                  i === 0 && 'firstIndex'
                } ${i === tabsData.length - 1 && 'lastIndex'}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.title}
              </li>
            ))}
            <div
              className="mpTabBar"
              style={{
                width: `${100 / tabsData.length}%`,
                left: `calc(calc(100% / ${tabsData.length}) * ${
                  activeTab.id - 1
                })`,
              }}
            />
          </ul>
        </div>
        <div className="particleList">
          <section>
            {activeTab.id === 1 &&
              noticeData.map((notice, index) => (
                <div key={notice.id}>
                  <div
                    onClick={() => handleNoticeClick(index)}
                    className={`noticeTitle ${
                      activeNoticeIndex === index ? 'clicked' : ''
                    }`}
                  >
                    <span className="noticeType">{notice.type}</span>
                    <span className="particleTitle">{notice.title}</span>
                  </div>
                  <div
                    className={`noticeContent ${
                      activeNoticeIndex === index ? 'clicked' : ''
                    }`}
                  >
                    {notice.content}
                  </div>
                </div>
              ))}
            {activeTab.id === 2 &&
              columnData.map((column, index) => (
                <div key={column.id}>
                  <div
                    onClick={() => handleColumnClick(index)}
                    className={`columnTitle ${
                      activeColumnIndex === index ? 'active' : ''
                    }`}
                  >
                    <span className="columnType">{column.type}</span>
                    <span className="particleTitle">{column.title}</span>
                  </div>

                  <div
                    className={`columnContent ${
                      activeColumnIndex === index ? 'clicked' : ''
                    }`}
                  >
                    <p>{column.content}</p>
                    <br />
                    <a
                      href={column.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>전문보기 →</p>
                    </a>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </Screen>
  );
}
