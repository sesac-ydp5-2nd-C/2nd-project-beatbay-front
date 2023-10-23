import React from 'react';
import Header from '../components/header/Header';
import '../config/globalStyle.scss';

const Screen = ({ children, bgColor = 'gray' }) => {
  return (
    <div className={bgColor === 'gray' ? 'bgGray' : ' bgWhite'}>
      <Header />
      {children}
    </div>
  );
};

export default Screen;
