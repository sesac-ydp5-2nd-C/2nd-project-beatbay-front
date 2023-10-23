import React from 'react';
import { ReactComponent as Logo } from '../../asset/beatbay_logo.svg';
import './styles.scss';

export default function Header({ color = 'black' }) {
  return (
    <div className="headerContainer">
      <div style={{ color }} className="menu mSpace">
        GOODS
      </div>
      <div style={{ color }} className="menu">
        ABILITY
      </div>
      <Logo className="logo" width={'100px'} height={'100px'} />
      <div style={{ color }} className="menu mSpace">
        SIGN UP
      </div>
      <div style={{ color }} className="menu">
        SIGN IN
      </div>
    </div>
  );
}
