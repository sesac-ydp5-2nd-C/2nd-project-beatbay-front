import React from 'react';
import Interest from './Interests';
// import './style.scss';

export default function InterestTag({ userData }) {
  const temp = {
    user_interest: '관심사가, 없습니다, 이만',
  };

  const defaultInterestsArray = temp.user_interest.split(', ');

  const interestsArray = temp.user_interest.split(', ');

  return (
    <div className="interestBox">
      {userData?.user_interest
        ? userData.user_interest.map((interest, index) => (
            <Interest key={index} kind={interest} />
          ))
        : defaultInterestsArray.map((interest, index) => (
            <Interest key={index} kind={interest} />
          ))}
    </div>
  );
}
