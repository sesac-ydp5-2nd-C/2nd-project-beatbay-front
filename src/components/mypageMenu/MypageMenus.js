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
    <div className="mypageMenus">
      <ul>
        <MypageMenu
          selected={selectedItem === 'DASHBOARD' ? 'selected' : ''}
          text="DASHBOARD"
          onItemClick={handleItemClick}
        />
        <MypageMenu
          selected={selectedItem === 'LISTINGS' ? 'selected' : ''}
          text="LISTINGS"
          onItemClick={handleItemClick}
        />
        <MypageMenu
          selected={selectedItem === 'PURCHASES' ? 'selected' : ''}
          text="PURCHASES"
          onItemClick={handleItemClick}
        />
        <MypageMenu
          selected={selectedItem === 'LIKES' ? 'selected' : ''}
          text="LIKES"
          onItemClick={handleItemClick}
        />
        <MypageMenu
          selected={selectedItem === 'CHAT' ? 'selected' : ''}
          text="CHAT"
          onItemClick={handleItemClick}
        />
      </ul>
    </div>
  );
}
