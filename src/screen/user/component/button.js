import React, { useState } from 'react';
import LoginModal from '../login';
// LoginModal 컴포넌트를 import

const ParentComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태를 관리

  // 모달을 열기 위한 함수
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} />{' '}
      {/* 모달을 렌더링하며 isOpen 및 onRequestClose prop 전달 */}
    </div>
  );
};

export default ParentComponent;
