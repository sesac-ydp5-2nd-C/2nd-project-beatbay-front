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
          <Link to="/trade/talent">
            <div style={{ color }} className="headerMenu">
              ABILITY
            </div>
          </Link>
        </div>
        <img alt="logo" src={logo} className="logo" />
        <div style={{ display: 'flex' }}>
          <Link to="/user">
            <div style={{ color }} className="headerMenu mSpace">
              SIGN UP
            </div>
          </Link>
          <Link to="/user">
            <div style={{ color }} className="headerMenu">
              SIGN IN
            </div>
          </Link>
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
        <Link to="/user">
          <div className="mMenu">SIGN UP</div>
        </Link>
        <Link to="/user">
          <div className="mMenu">SIGN IN</div>
        </Link>
      </div>
    </>
  );
}
