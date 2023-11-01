import React, { useState } from 'react';
import './style.scss';
import { NavLink, useLocation } from 'react-router-dom';

export default function MypageMenus({ userData }) {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(
    getSelectedItemFromPath(location.pathname),
  );

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    console.log(`Item clicked: ${itemName}`);
  };

  function getSelectedItemFromPath(path) {
    if (path === '/mypage') {
      return 'DASHBOARD';
    } else if (path === '/mypage/sell') {
      return 'LISTINGS';
    } else if (path === '/mypage/buy') {
      return 'PURCHASES';
    } else if (path === '/mypage/like') {
      return 'LIKES';
    } else if (path === '/mypage/chat') {
      return 'CHAT';
    }
    return '';
  }

  return (
    <div className="mypageMenus">
      <ul>
        <NavLink
          to="/mypage"
          onClick={() => handleItemClick('DASHBOARD')}
          className={`mypageMenu ${
            selectedItem === 'DASHBOARD' ? 'selected' : ''
          }`}
        >
          대시보드
        </NavLink>
        <NavLink
          to="/mypage/sell"
          onClick={() => handleItemClick('LISTINGS')}
          className={`mypageMenu ${
            selectedItem === 'LISTINGS' ? 'selected' : ''
          }`}
        >
          판매
        </NavLink>
        <NavLink
          to="/mypage/buy"
          onClick={() => handleItemClick('PURCHASES')}
          className={`mypageMenu ${
            selectedItem === 'PURCHASES' ? 'selected' : ''
          }`}
        >
          구매
        </NavLink>
        <NavLink
          to="/mypage/like"
          onClick={() => handleItemClick('LIKES')}
          className={`mypageMenu ${selectedItem === 'LIKES' ? 'selected' : ''}`}
        >
          찜
        </NavLink>
        <NavLink
          to="/mypage/chat"
          onClick={() => handleItemClick('CHAT')}
          className={`mypageMenu ${selectedItem === 'CHAT' ? 'selected' : ''}`}
        >
          채팅
        </NavLink>
      </ul>
    </div>
  );
}
