import React, { useState } from 'react';
import Modal from 'react-modal';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: '70%',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: 'transparent',
    // width: '80%',
    // height: '80%',
  },
};

export default function ImageModal({ uri, isModalOpen, setIsModalOpen }) {
  return (
    <div>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        contentLabel="Image Modal"
      >
        <img src={uri} alt="SelectedImage" />

        {/* <button onClick={() => setIsModalOpen(false)}>닫기</button> */}
      </Modal>
    </div>
  );
}
