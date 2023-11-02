import React from 'react';
import Modal from 'react-modal';

function CustomModal({ isOpen, onRequestClose, modalData }) {
  let content;

  if (Array.isArray(modalData)) {
    if (modalData.length === 0) {
      content = <p>데이터가 없습니다.</p>;
    } else {
      content = modalData.map((data, index) => (
        <div key={index}>
          <h2>{data.user_nickname}</h2>
          <p>{data.review}</p>
        </div>
      ));
    }
  } else if (modalData && modalData.user_nickname) {
    content = (
      <div>
        <h2>{modalData.user_nickname}</h2>
        <p>{modalData.review}</p>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {content}
      <button onClick={onRequestClose}>닫기</button>
    </Modal>
  );
}

export default CustomModal;
