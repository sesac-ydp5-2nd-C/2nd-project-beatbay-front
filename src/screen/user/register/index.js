import React, { useState } from 'react';
import './style.css';
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        error =
          value.length < 3 ? '사용자 이름은 최소 3자 이상이어야 합니다.' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value)
          ? '올바른 이메일 주소를 입력하세요.'
          : '';
        break;
      case 'password':
        error =
          value.length < 8 ? '비밀번호는 최소 8자 이상이어야 합니다.' : '';
        break;
      default:
        break;
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 서버로 데이터를 보내거나 다른 회원가입 처리 로직을 구현.
    // 유효성 검사 로직을 다시 실행하여 제출 전에도 모든 필드를 확인.
    validateField('username', formData.username);
    validateField('email', formData.email);
    validateField('password', formData.password);

    // 유효성 검사를 통과하는 경우에만 서버로 데이터를 보냅니다.
    if (!formErrors.username && !formErrors.email && !formErrors.password) {
      // 서버로 데이터를 보내는 로직을 추가.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div>
        <label className="form-label">사용자 이름</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
        />
        {formErrors.username && <p className="error">{formErrors.username}</p>}
      </div>
      <div>
        <label className="form-label">이메일</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}
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
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </div>
      <button type="submit" className="submit-button">
        가입하기
      </button>
    </form>
  );
};

export default SignUpForm;
