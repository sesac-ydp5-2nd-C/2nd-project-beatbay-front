import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-modal';
import './style.scss';

Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.email) {
      errors.email = '이메일은 필수입니다.';
    } else if (!isValidEmail(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      errors.password = '비밀번호는 필수입니다.';
    } else if (formData.password.length < 8) {
      errors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (!isStrongPassword(formData.password)) {
      errors.password =
        '비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // 실제 로그인 로직을 구현하세요.
      // 실패 시 setLoginError 함수를 사용하여 오류 메시지를 설정하세요.
      if (loginFailed) {
        setLoginError('로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        onRequestClose();
      }
    }
  };

  const isValidEmail = (email) => {
    // 더 엄격한 이메일 형식 검사
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isStrongPassword = (password) => {
    // 비밀번호가 대문자, 소문자, 숫자, 특수 문자를 포함하는지 검사
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const loginFailed = false; // 실제 로그인 실패 여부에 따라 설정

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="login-modal"
      overlayClassName="modal-overlay"
    >
      <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
      <h2>BEAT BAY로 중고거래를 시작하세요</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label className="form-label"></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${formErrors.email ? 'error' : ''}`}
            placeholder="아이디 / 이메일"
          />
          <br></br>
          {formErrors.email && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </div>
        <div>
          <label className="form-label"></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${formErrors.password ? 'error' : ''}`}
            placeholder="비밀번호"
          />
          <br></br>
          {formErrors.password && (
            <span className="error-message">{formErrors.password}</span>
          )}
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit" className="submit-button">
          로그인
        </button>
        <br></br>
        <button type="submit" className="kakao-submit-button">
          <img src="Group kakao.svg" alt="카카오 로고"></img>
          &nbsp; 카카오 로그인
        </button>
        <br></br>
        회원이 아니신가요? 회원가입하기
      </form>
    </Modal>
  );
};

export default LoginModal;
