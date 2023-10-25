import React, { useState } from 'react';
import MypageMenu from './MenuItem';
import './menu.scss';

export default function MypageMenus() {
  const [selectedItem, setSelectedItem] = useState();

  const handleItemClick = (itemName) => {
    console.log(`Item clicked: ${itemName}`);
  };

  const dashboardIcon = process.env.PUBLIC_URL + '/home.svg';
  const listingIcon = process.env.PUBLIC_URL + '/invoice.svg';
  const purchaseIcon = process.env.PUBLIC_URL + '/shopping.svg';
  const likeIcon = process.env.PUBLIC_URL + '/heart.svg';
  const chatIcon = process.env.PUBLIC_URL + '/chat.svg';

  return (
    <ul className="menus">
      <MypageMenu
        icon={dashboardIcon}
        text="DASHBOARD"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        icon={listingIcon}
        text="LISTINGS"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        icon={purchaseIcon}
        text="PURCHASES"
        onItemClick={handleItemClick}
      />
      <MypageMenu icon={likeIcon} text="LIKES" onItemClick={handleItemClick} />
      <MypageMenu icon={chatIcon} text="CHAT" onItemClick={handleItemClick} />
    </ul>
  );
}
