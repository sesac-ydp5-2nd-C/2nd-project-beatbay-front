import React, { useState } from 'react';
import Modal from 'react-modal';
import './style.scss';
import logo from './logo1beatbay_logo.jpg';
import kakaologo from './kakako-icon.png';

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
      <img className="logo" src={logo}></img>
      <h2>BEAT BAY로 중고거래를 시작하세요</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label className="form-label"></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="아이디 / 이메일"
          />
        </div>
        <div>
          <label className="form-label"></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="비밀번호"
          />
        </div>
        <button type="submit" className="submit-button">
          로그인
        </button>
        <br></br>
        <button type="submit" className="kakao-submit-button">
          <img src={kakaologo}></img>카카오 로그인
        </button>
        <br></br>
        회원이 아니신가요? 회원가입하기
      </form>
    </Modal>
  );
};

export default LoginModal;
