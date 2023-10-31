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
  const [isChecked, setIsChecked] = useState(false); // 추가된 부분

  const handleSignUpClick = () => {
    // 체크박스가 체크된 상태인지 확인하고 토글
    if (isChecked) {
      setIsChecked(false);
    }
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
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.',
      );
    } else {
      // Perform your sign-in logic here
      // e.g., make an API request to authenticate the user
    }
  };
  const handleKakaoSignIn = () => {};

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // 체크박스를 토글
  };
  const sendAuth = () => {};

  const checkAuth = () => {};
  const sendPw = () => {};

  return (
    <div className={`Lcontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div
        className="form-container sign-up-container"
        style={{ opacity: isSignUp ? '100' : '0' }}
      >
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
          <div className="email-authentication">
            <input
              type="text"
              placeholder="인증번호 입력 (6자리)"
              // value={}
              onChange={(e) => setName(e.target.value)}
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
          <button onClick={handleSignUp} style={{ width: '107%' }}>
            Sign Up
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>

      <input
        className="checkbox"
        type="checkbox"
        id="reg-log"
        name="reg-log"
        style={{ display: 'none' }}
        checked={isChecked} // 체크박스 상태 연결
        onChange={handleCheckboxChange} // 체크박스 변경 이벤트 핸들러
      />

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
          <button onClick={handleSignIn} style={{ width: '108%' }}>
            Sign In
          </button>
          <br />
          <button
            onClick={handleKakaoSignIn}
            style={{
              width: '108%',
              backgroundColor: '#FEE500',
              color: 'black',
              border: '1px solid #FEE500',
            }}
          >
            <img
              src="groupkakao.svg"
              style={{ width: '19.337px', height: '18.085px' }}
            ></img>{' '}
            KAKAO
          </button>
          <br />
          <p
            style={{
              color: 'black',
              fontWeight: '700',
              letterSpacing: '-0.8px',
            }}
          >
            비밀번호를 잊으셨나요?{' '}
            <label
              htmlFor="reg-log"
              style={{ color: '#03A9F4', fontWeight: '500' }}
            >
              비밀번호찾기
            </label>
          </p>
          <br />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div />

        <div className="Lcard-back">
          <form>
            <img className="logo" src="beatbay_logo.svg" alt="로고"></img>

            <h1>Find password</h1>
            <br></br>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email-authentication">
              <input
                type="text"
                placeholder="인증번호 입력 (6자리)"
                // value={}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={sendAuth}>인증번호 전송</button>
              <button onClick={checkAuth}>인증번호 확인</button>
            </div>

            <br />
            <button onClick={sendPw} style={{ width: '106%' }}>
              비밀번호 메일로 받기
            </button>
            <br />
            <p
              style={{
                color: 'black',
                fontWeight: '700',
                letterSpacing: '-0.8px',
              }}
            >
              <label
                htmlFor="reg-log"
                style={{ color: '#03A9F4', fontWeight: '500' }}
              >
                로그인{' '}
              </label>
              하러가기
            </p>
          </form>
        </div>
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
