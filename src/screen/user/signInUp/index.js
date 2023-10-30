import React, { useState } from 'react';
// 스타일 파일 추가
import './style.scss';
import { Link } from 'react-router-dom';

const SignInUpScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUp = () => {
    // 회원가입 유효성 검사
    if (!email || !password || !name) {
      setErrorMessage('All fields are required');
    } else if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format');
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.',
      );
    } else {
      // Perform your signup logic here
      // e.g., make an API request to register the user
    }
  };

  const handleSignIn = () => {
    //로그인 유효성 검사
    if (!email || !password) {
      setErrorMessage('Email and password are required');
    } else if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format');
    } else {
      // Perform your sign-in logic here
      // e.g., make an API request to authenticate the user
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
  return (
    <div className={`Lcontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form action="#">
          <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
          <h1>Create Account</h1>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="find-password">
            <input type="checkbox"></input>
            <Link
              to="/user/find_passwd"
              style={{
                textDecoration: 'underline',
                fontSize: '11px',
                // fontWeight: 'bold',
              }}
            >
              이용약관
            </Link>
            에 동의합니다
          </span>
          <br></br>

          <button onClick={handleSignUp}>Sign Up</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <div
        className={`form-container sign-in-container ${isSignUp ? 'temp' : ''}`}
      >
        <form action="#">
          <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
          <h1>Sign in</h1>
          <br></br>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleSignIn}>Sign In</button>
          <br />
          <div className="find-password">
            비밀번호를 잊으셨나요?{' '}
            <Link
              to="/user/find_passwd"
              style={{ color: '#03A9F4', fontSize: '10px' }}
            >
              비밀번호 찾기
            </Link>
          </div>
          <br />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
      <div className="overlay-container">
        <div
          className={`overlay ${isSignUp ? 'overlay-right' : 'overlay-left'}`}
        >
          <h1>{isSignUp ? 'Hello, Beat Member!' : 'Welcome Back!'}</h1>
          <p>
            {isSignUp
              ? 'Enter your personal details and start your journey with us'
              : 'To keep connected with us please login with your personal info'}
          </p>
          {/* 누르면 에니메이션 동작 */}
          <button
            className="ghost"
            onClick={isSignUp ? handleSignInClick : handleSignUpClick}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInUpScreen;
