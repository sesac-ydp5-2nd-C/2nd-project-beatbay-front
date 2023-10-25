import React, { useState } from 'react';
import MypageMenu from './MenuItem';
import './menu.scss';

export default function MypageMenus() {
  const [selectedItem, setSelectedItem] = useState('DASHBOARD');
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    console.log(`Item clicked: ${itemName}`);
  };

  const dashboard = process.env.PUBLIC_URL + '/home.svg';
  const dashboardClicked = process.env.PUBLIC_URL + '/home_clicked.svg';
  const listing = process.env.PUBLIC_URL + '/invoice.svg';
  const listingClicked = process.env.PUBLIC_URL + '/invoice_clicked.svg';
  const purchase = process.env.PUBLIC_URL + '/shopping.svg';
  const purchaseClicked = process.env.PUBLIC_URL + '/shopping_clicked.svg';
  const like = process.env.PUBLIC_URL + '/heart.svg';
  const likeClicked = process.env.PUBLIC_URL + '/heart_clicked.svg';
  const chat = process.env.PUBLIC_URL + '/chat.svg';
  const chatClicked = process.env.PUBLIC_URL + '/chat_clicked.svg';

  return (
    <ul className="mypageMenus">
      <div className="here" />
      <MypageMenu
        selected={selectedItem === 'DASHBOARD' ? 'selected' : ''}
        icon={selectedItem === 'DASHBOARD' ? dashboardClicked : dashboard}
        text="DASHBOARD"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'LISTINGS' ? 'selected' : ''}
        icon={selectedItem === 'LISTINGS' ? listingClicked : listing}
        text="LISTINGS"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'PURCHASES' ? 'selected' : ''}
        icon={selectedItem === 'PURCHASES' ? purchaseClicked : purchase}
        text="PURCHASES"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'LIKES' ? 'selected' : ''}
        icon={selectedItem === 'LIKES' ? likeClicked : like}
        text="LIKES"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'CHAT' ? 'selected' : ''}
        icon={selectedItem === 'CHAT' ? chatClicked : chat}
        text="CHAT"
        onItemClick={handleItemClick}
      />
    </ul>
  );
}
