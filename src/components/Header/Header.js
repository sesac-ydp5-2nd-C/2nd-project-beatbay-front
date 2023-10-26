import React, { useState } from 'react';
import logo from '../../asset/beatbay_logo.svg';
import hamburger from '../../asset/hamburger.svg';
import whiteHamburger from '../../asset/whiteHamburger.svg';
import { Link } from 'react-router-dom';
import './styles.scss';

export default function Header({ color = 'black' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장
  const toggleBurger = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="headerContainer">
        <div style={{ display: 'flex' }}>
          <Link to="/trade/product">
            <div style={{ color }} className="headerMenu mSpace">
              GOODS
            </div>
          </Link>
          <div style={{ color }} className="headerMenu">
            ABILITY
          </div>
        </div>
        <img alt="logo" src={logo} className="logo" />
        <div style={{ display: 'flex' }}>
          <div style={{ color }} className="headerMenu mSpace">
            SIGN UP
          </div>
          <div style={{ color }} className="headerMenu">
            SIGN IN
          </div>
        </div>
      </div>
      <div className="mobileHeader">
        <img src={logo} className="logo mobile" alt="logo" />
        <img
          src={hamburger}
          className="hamburger"
          alt="logo"
          onClick={toggleBurger}
        />
      </div>
      <div className={isMenuOpen ? 'hMenu open' : 'hMenu close'}>
        <div className="hMenuContainer">
          <div></div>
          <img
            src={whiteHamburger}
            className="hamburger wBurger"
            alt="logo"
            onClick={toggleBurger}
          />
        </div>

        <div className="mMenu">GOODS</div>
        <div className="mMenu">ABILITY</div>
        <div className="mMenu">SIGN IN</div>
        <div className="mMenu">SIGN UP</div>
      </div>
    </>
  );
}
