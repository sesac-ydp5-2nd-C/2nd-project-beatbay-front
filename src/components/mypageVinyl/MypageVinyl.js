import React from 'react';
import './style.scss';
import turntable from '../../asset/turntable.png';
import userImg from '../../asset/profile_default.png';
import pianissimo from '../../asset/pianissimo.svg';
import mezzopiano from '../../asset/mezzopiano.svg';
import piano from '../../asset/piano.svg';
import forte from '../../asset/forte.svg';
import mezzoforte from '../../asset/mezzoforte.svg';
import fortissimo from '../../asset/fortissimo.svg';

export default function MypageVinyl({ userData }) {
  const gradeImg = (user_grade) => {
    switch (user_grade) {
      default:
        return pianissimo;
      case 1:
        return mezzopiano;
      case 2:
        return piano;
      case 3:
        return forte;
      case 4:
        return mezzoforte;
      case 5:
        return fortissimo;
    }
  };

  const userGradeImg = gradeImg(userData.user_grade);

  return (
    <div className="profileVinyl">
      <img src={turntable} alt="turntable" className="turntable" />
      <img src={userData.imgSrc} alt="profileImg" className="profileImg" />
      <img src={userGradeImg} alt="grade" className="gradeImg" />
    </div>
  );
}
