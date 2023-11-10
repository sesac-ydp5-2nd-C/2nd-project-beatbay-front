import React, { useState } from 'react';
import './style.scss';
import turntable from '../../asset/change_profile_img1.svg';
import userImg from '../../asset/profile_default.png';

export default function UserProfileVinyl({
  userData,
  uploadedImage,
  setUploadedImage,
}) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);

    setUploadedImage(file); // 직접 파일 객체를 업로드된 이미지 상태에 설정

    const reader = new FileReader();

    reader.onloadend = () => {
      // 이미지 미리보기 등을 원한다면 아래 코드를 사용
      const imagePreview = reader.result;
      console.log('Image Preview:', imagePreview);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="zzprofileVinyl">
      <label htmlFor="imageUpload">
        <img src={turntable} alt="turntable" className="zzturntable" />
      </label>
      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <img
        src={
          uploadedImage ||
          `${process.env.REACT_APP_BACK_IP}/uploads/${userData?.user_profile_img}`
        }
        onError={(e) => (e.target.src = userImg)}
        alt="profileImg"
        className="zzprofileImg"
      />
    </div>
  );
}
