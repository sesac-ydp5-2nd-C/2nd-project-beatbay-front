import React from 'react';
import './style.scss';
import profileSample from '../../../asset/profile_default.png';
import Interests from '../../mypageProfile/Interests';
import userImg from '../../../asset/profile_default.png';
import { gradeImg } from '../../../function/changeKey';

export default function UserProfileContainer({ followingData }) {
  const userInterest = followingData?.user_interest
    ? followingData?.user_interest
    : [];
  return (
    <div className="UPContainer">
      <div className="UPImgBorder">
        <img
          alt="profileImg"
          src={`${process.env.REACT_APP_BACK_IP}/uploads/${followingData?.user_profile_img}`}
          onError={(e) => (e.target.src = profileSample)}
          className="UPImg"
        />
      </div>
      <div className="UPInfo">
        <div className="UPInfoText">
          <div>
            <h2>{followingData?.user_nickname}</h2>
            <img
              alt="grade"
              src={gradeImg(followingData?.user_grade)}
              className="userGradeImg"
            />
          </div>
          <p>{followingData?.user_comment || '안녕하세요'}</p>
        </div>
        <div className="interestBox">
          {userInterest.map((interest, index) => (
            <Interests key={index} kind={interest} />
          ))}
        </div>
      </div>
    </div>
  );
}
