import React from 'react';

export default function MenuItem({ icon, text, onItemClick }) {
  const handleItemClick = () => {
    onItemClick(text);
  };

  return (
    <li className="menu" onClick={handleItemClick}>
      <div className="item">
        <img className="icon" src={icon} alt={`${text} Icon`} />
        <span>{text}</span>
      </div>
    </li>
  );
}
