import React, { useState } from 'react';
import './style.scss';

export default function MypageTab({ tabsData }) {
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  return (
    <div className="mpTabs-Container">
      <ul className="mpTabList">
        {tabsData.map((tab, i) => (
          <li
            key={tab.id}
            className={`mpTab ${activeTab.id === tab.id && 'active'} ${
              i === 0 && 'firstIndex'
            } ${i === tabsData.length - 1 && 'lastIndex'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </li>
        ))}
        <div
          className="mpTabBar"
          style={{
            width: `${100 / tabsData.length}%`,
            left: `calc(calc(100% / ${tabsData.length}) * ${activeTab.id - 1})`,
          }}
        />
      </ul>
    </div>
  );
}
