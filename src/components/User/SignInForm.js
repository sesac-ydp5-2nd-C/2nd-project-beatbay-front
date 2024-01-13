import React, { useState } from 'react';
import KakaoLogin from 'react-kakao-login';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const kakaoClientId = '1b3f4e90bde253a802ad08134afe8d96';
  const kakaoOnSuccess = async (data) => {
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
    const access_token = data.response.access_token;
    const refresh_token = data.response.refresh_token;

    alert(`Access Token: ${access_token}\nRefresh Token: ${refresh_token}`);
  };
  const kakaoOnFailure = (error) => {};

  return (
    <div className="form-container sign-in-container">
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignInForm;
