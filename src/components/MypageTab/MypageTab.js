import React, { useState } from 'react';
import './style.scss';

export default function MypageTab({
  loading,
  tabsData,
  activeTab,
  setActiveTab,
  setProductData,
}) {
  return (
    <div className="mpTabs-Container">
      <ul className="mpTabList">
        {activeTab &&
          tabsData.map((tab, i) => (
            <li
              key={tab.id}
              className={`mpTab ${activeTab.id === tab.id && 'active'} ${
                i === 0 && 'firstIndex'
              } ${i === tabsData.length - 1 && 'lastIndex'}`}
              onClick={() => {
                if (!loading) {
                  setProductData();
                  setActiveTab(tab);
                }
              }}
            >
              {tab.title}
            </li>
          ))}
        {activeTab && (
          <div
            className="mpTabBar"
            style={{
              width: `${100 / tabsData.length}%`,
              left: `calc(calc(100% / ${tabsData.length}) * ${
                activeTab.id - 1
              })`,
            }}
          />
        )}
      </ul>
    </div>
  );
}
