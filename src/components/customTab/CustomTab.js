import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';

export default function CustomTab({ tabsData }) {
  const [activeTab, setActiveTab] = useState(tabsData[0]);
  const [activeContent, setActiveContent] = useState(tabsData[0].content[0]);

  useEffect(() => {
    setActiveContent(activeTab.content[0]);
  }, [activeTab]);

  return (
    <div className="tabs-container">
      <ul className="tab-list">
        {tabsData.map((tab, i) => (
          <li
            key={tab.id}
            className={`tab ${activeTab.id === tab.id && 'active'} ${
              i === 0 && 'firstIndex'
            } ${i === tabsData.length - 1 && 'lastIndex'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </li>
        ))}
        <div
          className="tab-bar"
          style={{
            width: `${100 / tabsData.length}%`,
            left: `calc(calc(100% / ${tabsData.length}) * ${activeTab.id - 1})`,
          }}
        />
      </ul>
      <div className="tab-content-container">
        {activeTab.content.map((e, i) => {
          return (
            <div
              key={`${e}_${i}`}
              className={`tab-content ${activeContent === e && 'tcActive'}`}
              onClick={() => setActiveContent(e)}
            >
              {e}
            </div>
          );
        })}
      </div>
    </div>
  );
}
