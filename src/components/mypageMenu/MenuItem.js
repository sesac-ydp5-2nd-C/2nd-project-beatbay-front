import React from 'react';

export default function MenuItem({ text, onItemClick, selected }) {
  const handleItemClick = () => {
    onItemClick(text);
  };

  return (
    <li className={`mypageMenu ${selected}`} onClick={handleItemClick}>
      <span className="menuName">{text}</span>
    </li>
  );
}
