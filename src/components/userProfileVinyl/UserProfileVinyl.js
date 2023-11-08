import React from 'react';
import './style.scss';
import turntable from '../../asset/change_profile_img1.svg';
import userImg from '../../asset/profile_default.png';

export default function UserProfileVinyl({ userData }) {
  const profileImgSrc = userData.user_profile_img ? userData.imgSrc : userImg;

  return (
    <div className="zzprofileVinyl">
      <img src={turntable} alt="turntable" className="zzturntable" />
      <img src={profileImgSrc} alt="profileImg" className="zzprofileImg" />
    </div>
  );
}
