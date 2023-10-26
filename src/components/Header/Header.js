import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../asset/beatbay_logo.svg';
import './styles.scss';
import { Link } from 'react-router-dom/dist';

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
          <Link to="/user/signup">
            <div style={{ color }} className="headerMenu mSpace">
              SIGN UP
            </div>
          </Link>
          <Link to="/user/login">
            <div style={{ color }} className="headerMenu">
              SIGN IN
            </div>
          </Link>
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
        <Link to="/user/signup">
          <div className="mMenu">SIGN UP</div>
        </Link>
        <Link to="/user/login">
          <div className="mMenu">SIGN IN</div>
        </Link>
      </div>
    </>
  );
}
