import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달이 나타날 부모 요소 지정

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 서버로 데이터를 보내거나 다른 로그인 처리 로직을 구현합니다.
    onRequestClose(); // 로그인 후 모달을 닫음
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="login-modal"
      overlayClassName="modal-overlay"
    >
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label className="form-label">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          로그인
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
