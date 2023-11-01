import React, { useState } from 'react';
import Interest from './Interests';
import './style.scss';

export default function MypageProfile({ userData }) {
  return (
    <div className="profileContainer">
      <div>
        <h1> HELLO, {userData.user_nickname}</h1>
        <p>"{userData.comment}"</p>
      </div>

      <div className="interestBox">
        {userData.user_interests.map((interest, index) => (
          <Interest key={index} kind={interest} />
        ))}
      </div>
    </div>
  );
}
