import React from 'react';

export default function MenuItem({ icon, text, onItemClick, selected }) {
  const handleItemClick = () => {
    onItemClick(text);
  };

  return (
    <li className={`mypageMenu ${selected}`} onClick={handleItemClick}>
      <img className="icon" src={icon} alt={`${text} Icon`} />
      <span className="menuName">{text}</span>
    </li>
  );
}