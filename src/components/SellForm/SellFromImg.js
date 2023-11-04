import React, { useState } from 'react';
import './formImgStyle.scss';
import { useDropzone } from 'react-dropzone';
import camera from '../../asset/camera.svg';
import deleteImg from '../../asset/delete.svg';

export default function SellFromImg({ uploadImages, setUploadImages }) {
  const onDrop = (acceptedFiles) => {
    if (uploadImages.length + acceptedFiles.length <= 5) {
      setUploadImages([...uploadImages, ...acceptedFiles]);
    } else {
      alert('이미지는 최대 5개까지 업로드할 수 있습니다.');
    }
  };
  const handleImageDelete = (index) => {
    const newImages = [...uploadImages];
    newImages.splice(index, 1);
    setUploadImages(newImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 5,
  });

  return (
    <div className="sellFormImgEntry">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <img src={camera} alt="PutImg" className="putImg" />
        <p>이미지 등록</p>
      </div>

      {uploadImages.map((image, index) => (
        <div key={index} className="sellFormImgContainer">
          <img
            src={URL.createObjectURL(image)}
            alt={`이미지 ${index + 1}`}
            className="sellFormImg"
          />
          <div
            className="formImgHover"
            onClick={() => handleImageDelete(index)}
          >
            <img src={deleteImg} alt="delete" />
          </div>
        </div>
      ))}
    </div>
  );
}
