import React from 'react';
import Interest from './Interests';
// import './style.scss';

export default function InterestTag({ userData }) {
  return (
    <div className="interestBox">
      {userData.user_interests.map((interest, index) => (
        <Interest key={index} kind={interest} />
      ))}
    </div>
  );
}
