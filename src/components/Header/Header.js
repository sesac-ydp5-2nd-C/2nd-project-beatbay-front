import React, { useState } from 'react';
import logo from '../../asset/beatbay_logo.svg';
import hamburger from '../../asset/hamburger.svg';
import whiteHamburger from '../../asset/whiteHamburger.svg';
import { Link } from 'react-router-dom';
import './styles.scss';
import { getUserLogout } from '../../api/user';

export default function Header({ color = 'black' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장
  const toggleBurger = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const isLogin = localStorage.getItem('login_id') ? true : false;

  const handleLogout = () => {
    getUserLogout().then((res) => {
      localStorage.removeItem('login_id');
      localStorage.removeItem('email');
      window.location.replace('http://localhost:3000/');
    });
  };

  return (
    <>
      <div className="headerContainer">
        <div className="headerMenus">
          <Link to="/trade/product">
            <div style={{ color }} className="headerMenu">
              상품
            </div>
          </Link>
          <Link to="/trade/talent">
            <div style={{ color }} className="headerMenu">
              재능
            </div>
          </Link>
        </div>
        <Link to="/">
          <img alt="logo" src={logo} className="logo" />
        </Link>
        <div className="headerMenus">
          <Link to={isLogin ? '/mypage' : '/user'}>
            <div style={{ color }} className="headerMenu hmLong">
              {isLogin ? '마이페이지' : '회원가입'}
            </div>
          </Link>
          {isLogin ? (
            <div
              onClick={handleLogout}
              style={{ color, cursor: 'pointer' }}
              className="headerMenu"
            >
              로그아웃
            </div>
          ) : (
            <Link to="/user">
              <div style={{ color }} className="headerMenu">
                로그인
              </div>
            </Link>
          )}
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
        <Link to="/trade/product">
          <div className="mMenu">상품</div>
        </Link>
        <Link to="/trade/talent">
          <div className="mMenu">재능</div>
        </Link>
        <Link to={isLogin ? '/mypage' : '/user'}>
          <div className="mMenu">{isLogin ? '마이페이지' : '회원가입'}</div>
        </Link>
        {isLogin ? (
          <div onClick={handleLogout} className="mMenu">
            로그아웃
          </div>
        ) : (
          <Link to="/user">
            <div className="mMenu">로그인</div>
          </Link>
        )}
      </div>
    </>
  );
}
