import React from 'react';
import dashboard from '../../config/icon/home_white.png';
import listing from '../../config/icon/invoice_white.png';
import purchase from '../../config/icon/shopping_white.png';
import like from '../../config/icon/heart_white.png';
import chat from '../../config/icon/chat_white.png';
import MypageMenu from './MenuItem';

export default function MypageMenus() {
  const handleItemClick = (itemName) => {
    console.log(`Item clicked: ${itemName}`);
  };

  return (
    <ul className="menus">
      <MypageMenu
        icon={dashboard}
        text="DASHBOARD"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        icon={listing}
        text="LISTINGS"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        icon={purchase}
        text="PURCHASES"
        onItemClick={handleItemClick}
      />
      <MypageMenu icon={like} text="LIKES" onItemClick={handleItemClick} />
      <MypageMenu icon={chat} text="CHAT" onItemClick={handleItemClick} />
    </ul>
  );
}
