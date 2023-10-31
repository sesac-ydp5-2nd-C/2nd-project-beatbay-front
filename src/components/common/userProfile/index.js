import React from 'react';
import './style.scss';
import Interests from '../../mypageProfile/Interests';
import userImg from '../../../asset/profile_default.png';

export default function UserProfileContainer({ followingData }) {
  return (
    <div className="UPContainer">
      <div className="UPImgBorder">
        <img
          alt="profileImg"
          src={followingData.profileImg}
          className="UPImg"
        />
      </div>
      <div className="UPInfo">
        <div className="UPInfoText">
          <div>
            <h2>{followingData.name}</h2>
            <img
              alt="grade"
              src={followingData.grade}
              className="userGradeImg"
            />
          </div>
          <p>{followingData.introduce}</p>
        </div>
        <div className="interestBox">
          {followingData.interests.map((interest, index) => (
            <Interests key={index} kind={interest} />
          ))}
        </div>
      </div>
    </div>
  );
}
