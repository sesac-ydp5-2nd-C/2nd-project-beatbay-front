import React, { useState } from 'react';
import Interest from './Interests';
import './style.scss';

export default function MypageProfile({ userData }) {
  return (
    <div className="profileContainer">
      <div>
        <h1>HELLO, {userData.username}</h1>
        <p>"{userData.introduce}"</p>
      </div>

      <div className="interestBox">
        {userData.interests.map((interest, index) => (
          <Interest key={index} kind={interest} />
        ))}
      </div>
    </div>
  );
}
