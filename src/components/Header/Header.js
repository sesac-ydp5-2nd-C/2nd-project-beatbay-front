import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../asset/beatbay_logo.svg';
import './styles.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom/dist';

export default function Header({ color = 'black' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장
  const toggleBurger = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="headerContainer">
        <div style={{ display: 'flex' }}>
          <div style={{ color }} className="headerMenu mSpace">
            GOODS
          </div>
          <div style={{ color }} className="headerMenu">
            ABILITY
          </div>
        </div>
        <Logo className="logo" />
        <div style={{ display: 'flex' }}>
          <div style={{ color }} className="headerMenu mSpace">
            <Link to="/user/signup">SIGN UP</Link>
          </div>
          <div style={{ color }} className="headerMenu">
            <Link to="/user/login">SIGN IN</Link>
          </div>
        </div>
      </div>
      <div className="mobileHeader">
        <img src="beatbay_logo.svg" className="logo mobile" alt="logo" />
        <img
          src="hamburger.svg"
          className="hamburger"
          alt="logo"
          onClick={toggleBurger}
        />
      </div>
      <div className={isMenuOpen ? 'hMenu open' : 'hMenu close'}>
        <div className="hMenuContainer">
          <div></div>
          <img
            src="whiteHamburger.svg"
            className="hamburger wBurger"
            alt="logo"
            onClick={toggleBurger}
          />
        </div>

        <div className="mMenu">GOODS</div>
        <div className="mMenu">ABILITY</div>
        <div className="mMenu">
          <Link to="/user/signup">SIGN UP</Link>
        </div>
        <div className="mMenu">
          <Link to="/user/login">SIGN IN</Link>
        </div>
      </div>
    </>
  );
}
