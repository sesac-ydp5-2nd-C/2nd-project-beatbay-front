import React, { useState } from 'react';
import MypageMenu from './MenuItem';
import './style.scss';

export default function MypageMenus() {
  const [selectedItem, setSelectedItem] = useState('DASHBOARD');
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    console.log(`Item clicked: ${itemName}`);
  };

  return (
    <ul className="mypageMenus">
      <div className="here" />
      <MypageMenu
        selected={selectedItem === 'DASHBOARD' ? 'selected' : ''}
        icon={selectedItem === 'DASHBOARD' ? 'home_clicked.svg' : 'home.svg'}
        text="DASHBOARD"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'LISTINGS' ? 'selected' : ''}
        icon={
          selectedItem === 'LISTINGS' ? 'invoice_clicked.svg' : 'invoice.svg'
        }
        text="LISTINGS"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'PURCHASES' ? 'selected' : ''}
        icon={
          selectedItem === 'PURCHASES' ? 'shopping_clicked.svg' : 'shopping.svg'
        }
        text="PURCHASES"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'LIKES' ? 'selected' : ''}
        icon={selectedItem === 'LIKES' ? 'heart_clicked.svg' : 'heart.svg'}
        text="LIKES"
        onItemClick={handleItemClick}
      />
      <MypageMenu
        selected={selectedItem === 'CHAT' ? 'selected' : ''}
        icon={selectedItem === 'CHAT' ? 'chat_clicked.svg' : 'chat.svg'}
        text="CHAT"
        onItemClick={handleItemClick}
      />
    </ul>
  );
}
