import React, { useState } from 'react';
import './style.scss';
import turntable from '../../asset/change_profile_img1.svg';
import userImg from '../../asset/profile_default.png';

export default function UserProfileVinyl({ userData }) {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
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
{
  /* <label htmlFor="profileImage">프로필 이미지:</label>
<input
  type="file"
  id="profileImage"
  name="profileImage"
  onChange={(e) => setProfileImage(e.target.files[0])}
/> */
}
