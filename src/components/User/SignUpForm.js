import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [certification, setCertification] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    // 회원가입 유효성 검사
    if (!email || !password || !name || !passwordCheck || !certification) {
      setErrorMessage('작성되지 않은 항목이 있습니다.');
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
    } else if (password !== passwordCheck) {
      setErrorMessage('비밀번호확인과 비밀번호를 다르게 입력하셨습니다.');
    } else {
      setErrorMessage(' ');
    }
  };
  const isValidEmail = (email) => {
    //이메일검사 로직
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    //패스워드 검사 로직
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };
  const sendAuth = () => {};

  const checkAuth = () => {};

  return (
    <div className="form-container sign-up-container">
      <form action="#">
        <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
        <h1>회원가입</h1>
        <br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <div className="email-authentication">
          <input
            type="text"
            placeholder="인증번호 입력 (6자리)"
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
          />
          <button onClick={sendAuth}>인증번호 전송</button>
          <button onClick={checkAuth}>인증번호 확인</button>
        </div>

        <br></br>
        <br></br>

        <div
          style={{
            border: '10px',
            width: '100%',
            fontSize: '17px',
            color: 'black',
            fontWeight: '500',
            textAlign: 'left',
            marginLeft: '0px',
          }}
        >
          <input type="checkbox" style={{ width: '10%' }}></input>
          <Link
            to="https://www.notion.so/sage-h/515b5c492e7c4e0495c8d57427b42f78"
            target="_blank"
            style={{
              textDecoration: 'underline',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            이용약관
          </Link>
          에 동의합니다
        </div>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={handleSignUp}>Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
