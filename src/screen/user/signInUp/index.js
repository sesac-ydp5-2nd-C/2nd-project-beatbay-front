import React, { useState } from 'react';
// 스타일 파일 추가
import './style.scss';

import { Link } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';

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
      setErrorMessage('작성되지 않은 항목이 있습니다.');
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
    } else {
      // Perform your signup logic here
      // e.g., make an API request to register the user
    }
  };

  const handleSignIn = () => {
    //로그인 유효성 검사
    if (!email || !password) {
      setErrorMessage('작성되지 않은 항목이 있습니다.');
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
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

  const kakaoClientId = '1b3f4e90bde253a802ad08134afe8d96';
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
    const access_token = data.response.access_token;
    const refresh_token = data.response.refresh_token;

    alert(`Access Token: ${access_token}\nRefresh Token: ${refresh_token}`);
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <div className={`Lcontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div
        className="form-container sign-up-container"
        style={{ opacity: isSignUp ? '100' : '0' }}
      >
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
          <button onClick={handleSignUp}>Sign Up</button>
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
          <h1>로그인</h1>
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
          <button onClick={handleSignIn}>로그인</button>
          <br />
          {/* <button
            onClick={handleKakaoSignIn}
            style={{
              width: '108%',
              backgroundColor: '#FEE500',
              color: 'black',
              border: '1px solid #FEE500',
            }}
          > */}
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
            style={{
              backgroundColor: '#FEE500',
              border: '#FEE500',
              color: 'black',
            }}
          >
            <img
              src="groupkakao.svg"
              style={{ width: '19.337px', height: '18.085px' }}
            ></img>{' '}
            카카오 로그인
          </KakaoLogin>
          {/* <img
              src="groupkakao.svg"
              style={{ width: '19.337px', height: '18.085px' }}
            ></img>{' '}
            KAKAO
          </button> */}
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

            <h1>비밀번호 찾기</h1>
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
            {isSignUp ? '로그인' : '회원가입'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInUpScreen;
