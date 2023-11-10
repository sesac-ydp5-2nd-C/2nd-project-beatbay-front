import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import searchIcon from '../../../asset/searchIcon.svg';

export default function CustomTab({
  handleSearch,
  searchText,
  setSearchText,
  tabsData,
  activeContent,
  setActiveContent,
  activeTab,
  setActiveTab,
}) {
  // const [activeTab, setActiveTab] = useState(tabsData[0]);
  // const [activeContent, setActiveContent] = useState(tabsData[0].content[0]);

  useEffect(() => {
    setActiveContent(activeTab.content[0]);
  }, [activeTab]);

  return (
    <div className="total-tabs-container">
      <div className="tabs-container">
        <div className="top-tab-container">
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
                left: `calc(calc(100% / ${tabsData.length}) * ${
                  activeTab.id - 1
                })`,
              }}
            />
          </ul>

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="검색해주세요"
            type="text"
            className="searchInput"
          />
          <img alt="icon" src={searchIcon} className="searchIcon" />
        </div>
        <div
          className={`tab-content-container ${
            activeTab.content.length > 10 ? 'tcTwoLine' : ''
          }`}
        >
          {activeTab.content.map((e, i) => {
            return (
              <div
                key={`${e}_${i}`}
                className={`tab-content ${activeContent === e && 'tcActive'} `}
                onClick={() => setActiveContent(e)}
              >
                {e}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
