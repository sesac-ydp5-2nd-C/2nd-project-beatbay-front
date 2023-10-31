import React from 'react';
import './style.scss';
import turntable from '../../asset/turntable.png';
import userImg from '../../asset/profile_default.png';

export default function MypageVinyl({ userData }) {
  return (
    <div className="profileVinyl">
      <img src={turntable} alt="turntable" className="turntable" />
      <img src={userImg} alt="profileImg" className="profileImg" />
    </div>
  );
}
