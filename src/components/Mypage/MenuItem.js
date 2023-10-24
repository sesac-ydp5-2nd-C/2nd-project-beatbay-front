import React, { useState } from 'react';

export default function MenuItem({ icon, text, onItemClick }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleItemClick = () => {
    setIsSelected(!isSelected);
    onItemClick(text);
  };

  return (
    <li
      className={`menu ${isSelected ? 'selected' : ''}`}
      onClick={handleItemClick}
    >
      <img className="icon" src={icon} alt={`${text} Icon`} />
      <span>{text}</span>
    </li>
  );
}
