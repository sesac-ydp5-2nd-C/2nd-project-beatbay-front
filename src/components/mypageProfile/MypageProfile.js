import React, { useState } from 'react';
import Interest from './Interests';
import './style.scss';

export default function MypageProfile({ userData }) {
  const userComment = userData.user_comment || '자신을 소개해보세요!';
  return (
    <div className="profileContainer">
      <div>
        <h1> HELLO, {userData.user_nickname}</h1>
        <p className="userComment">"{userComment}"</p>
      </div>

      <div className="interestBox">
        <div className="interests">
          {userData.user_interest ? (
            userData.user_interest.map((interest, index) => (
              <Interest key={index} kind={interest} />
            ))
          ) : (
            <span>#관심사가 없습니다.</span>
          )}
        </div>
      </div>
    </div>
  );
}
