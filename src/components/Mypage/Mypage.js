import React from 'react';
import './style.scss';
import MypageMenus from './MypageMenus';
import Header from '../Header/Header';

export default function Mypage() {
  return (
    <div className="full">
      <Header />
      <div className="container">
        <MypageMenus />
        <div className="content"></div>
      </div>
    </div>
  );
}
