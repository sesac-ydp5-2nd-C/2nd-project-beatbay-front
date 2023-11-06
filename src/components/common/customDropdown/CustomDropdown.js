import React, { useEffect } from 'react';
import './styles.scss';
import downArrow from '../../../asset/down-arrow.svg';

const CustomDropdown = ({
  showDropdown,
  setSelectedItem,
  setShowDropdown,
  items,
  selectedItem,
  onChange,
}) => {
  useEffect(() => {
    console.log(selectedItem);
  }, []);
  return (
    <div className="dropdown-wrapper">
      <div onClick={setShowDropdown} className="trigger-button">
        {selectedItem}
        <img
          alt="dArrow"
          src={downArrow}
          className={`dArrow  ${showDropdown ? 'AActive' : ''}`}
        />
      </div>
      <ul className={`dropdown-content ${showDropdown ? 'DcActive' : ''}`}>
        {items.map((item, i) => (
          <li
            key={`${item}_${i}`}
            onClick={() => {
              setShowDropdown();
              if (onChange) {
                onChange(item);
              } else {
                setSelectedItem(item);
              }
            }}
            className={`dItem ${i === 0 ? 'fItem' : ''} ${
              item === selectedItem ? 'dsItem' : ''
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;
