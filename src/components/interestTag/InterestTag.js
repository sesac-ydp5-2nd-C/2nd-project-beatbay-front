import React from 'react';
import Interest from './Interests';
// import './style.scss';

export default function InterestTag({ userData }) {
  const temp = {
    user_interest: ['관심사가 없습니다.'],
  };

  return (
    <div className="interestBox">
      {userData?.user_interest
        ? userData.user_interest.map((interest, index) => (
            <Interest key={index} kind={interest} />
          ))
        : temp.user_interest.map((interest, index) => (
            <Interest key={index} kind={interest} />
          ))}
    </div>
  );
}
