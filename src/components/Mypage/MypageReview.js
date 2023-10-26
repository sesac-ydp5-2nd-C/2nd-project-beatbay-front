import React from 'react';
import './reviewstyle.scss';

export default function MypageReview({
  userImg,
  userName,
  userType,
  reviewContent,
}) {
  return (
    <div className="review">
      <img className="userImg" alt="userImg" src={userImg} />
      <div>
        <h3 className="userName">{userName}</h3>
        <p className="userType">{userType}</p>
        <p className="reviewContent">"{reviewContent}"</p>
      </div>
    </div>
  );
}
