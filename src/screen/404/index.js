import React from 'react';
import './style.scss';
import Screen from '../Screen';

export default function ErrorScreen() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Screen>
      <div className="errorContainer">
        <img src="404.svg" className="error404" />
        <h1>Page Not Found</h1>
        <p>죄송합니다. 페이지를 찾을 수 없습니다</p>
        <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        <div>
          <button onClick={goBack}>
            <img src="audio_cable.png" className="audioCable" />
            <span>뒤로 가기</span>
          </button>
        </div>
      </div>
    </Screen>
  );
}
