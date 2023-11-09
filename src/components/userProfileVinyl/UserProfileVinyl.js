import React, { useState } from 'react';
import './style.scss';
import turntable from '../../asset/change_profile_img1.svg';
import userImg from '../../asset/profile_default.png';
import { useDropzone } from 'react-dropzone';

export default function UserProfileVinyl({
  userData,
  uploadedImage,
  setUploadedImage,
}) {
  const [profileImage, setProfileImage] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
    } else {
      setUploadedImage(acceptedFiles);
      console.log(acceptedFiles);
    }
  };

  const handleImageDelete = (index) => {
    setUploadedImage();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Add this line
    setProfileImage(file);
    const reader = new FileReader();
    console.log('Profile Image:', profileImage);
    console.log('Uploded Image:', uploadedImage);

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });
  return (
    <div className="zzprofileVinyl">
      <label htmlFor="imageUpload">
        <img src={turntable} alt="turntable" className="zzturntable" />
      </label>
      {/* <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        // onChange={handleImageUpload}
      /> */}
      <div {...getRootProps()} className="dropzone">
        <input
          type="file"
          id="imageUpload"
          style={{ display: 'none' }}
          {...getInputProps()}
        />
        <img
          src={
            uploadedImage
              ? URL.createObjectURL(uploadedImage[0])
              : `${process.env.REACT_APP_BACK_IP}/uploads/${userData?.user_profile_img}`
          }
          onError={(e) => (e.target.src = userImg)}
          alt="profileImg"
          className="zzprofileImg"
        />
      </div>
    </div>
  );
}
