import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 스타일 파일 추가
import './style.scss';

// import { postUserSignup } from '../../../api/trade';
import {
  postUserCertification,
  postUserEmailCodeCheck,
  postUserIdExists,
  postUserLogin,
  postUserSignup,
  putUserFindPass,
} from '../../../api/user';
const SignInUpScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [certification, setCertification] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const [mailCheckMessage, setMailCheckMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(true); // 유효성 검사 결과를 저장

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // 체크박스가 체크된 상태인지 확인하고 토글
    setErrorMessage('');
    if (isChecked) {
      setIsChecked(false);
    }
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setErrorMessage('');
    setIsSignUp(false);
  };
  const validationTimeOut = () => {
    setIsFormValid(false);
    setTimeout(() => {
      setIsFormValid(true);
      setErrorMessage('');
    }, 6000);
  };

  // 회원가입 유효성 검사
  const handleSignUp = () => {
    if (!name) {
      setErrorMessage('닉네임이 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!email) {
      setErrorMessage('이메일이 작성되지 않았습니다.'); //닉네임 중복확인추가필요?
      validationTimeOut();
    } else if (!password) {
      setErrorMessage('비밀번호가 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!passwordCheck) {
      setErrorMessage('비밀번호 확인이 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!certification) {
      setErrorMessage('인증문자가 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
      validationTimeOut();
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
      validationTimeOut();
    } else if (password !== passwordCheck) {
      setErrorMessage('비밀번호와 비밀번호 확인을 다르게 입력하셨습니다.');
      validationTimeOut();
    } else {
      // Perform your signup logic here
      // e.g., make an API request to register the user
      console.log('Signing up');
      const apiData = {
        userId: email,
        userPw: password,
        userNickname: name,
        authCode: certification,
      };
      postUserSignup(apiData).then((res) => {
        console.log(res);
        if (res.data.result === true) {
          alert('회원가입이 완료되었습니다.');

          setIsSignUp(false);
        }
      });
    }
  };
  //로그인 유효성 검사
  const handleSignIn = () => {
    if (!email) {
      setErrorMessage('이메일이 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!password) {
      setErrorMessage('비밀번호가 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
      validationTimeOut();
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
      validationTimeOut();
    } else {
      setErrorMessage(' ');
      const apiData = {
        userId: email,
        userPw: password,
      };
      console.log('signing up');

      postUserLogin(apiData).then((res) => {
        console.log(res);

        if (res.data.result === true) {
          setErrorMessage('로그인 성공');
          navigate(`../`);
        } else if (res.data.result === false) {
          setErrorMessage('존재하지 않는 아이디 입니다');
        }
      });
    }
  };

  const handleKakaoSignIn = () => {
    window.location.href = `${process.env.REACT_APP_BACK_IP}/kakao`;
    // window.open('http://localhost:8000/kakao');
  };

  const isValidEmail = (email) => {
    //이메일검사 로직
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  };

  const isValidPassword = (password) => {
    //패스워드 검사 로직
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/.test(
      password,
    );
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // 체크박스를 토글
  };
  ///인증메일 전송 함수
  const sendAuth = () => {
    if (!email) {
      setErrorMessage('이메일이 작성되지 않았습니다');
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
    } else {
      console.log('sending');
      const apiData = { email: email };
      postUserCertification(apiData).then((res) => {
        console.log(res.data.result);

        if (res.data.result === true) {
          console.log(res.data);
          setMailCheckMessage('메일 전송 완료!');
        } else {
          setMailCheckMessage('메일 전송 실패! 다시 시도해주세요');
        }
      });
    }
  };

  //인증번호 확인 함수
  const checkAuth = () => {
    console.log('Checking');
    const apiData = { emailCode: certification };
    postUserEmailCodeCheck(apiData).then((res) => {
      if (res.data.result === true) {
        if (isEmailVerified === false) {
          setIsEmailVerified(!isEmailVerified);
        }
        setMailCheckMessage('메일 인증 완료!');
      } else {
        setMailCheckMessage('올바르지 않은 코드입니다');
      }
    });
  };

  //비밀번호 변경 함수
  const sendPw = () => {
    if (!email) {
      setErrorMessage('이메일이 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!password) {
      setErrorMessage('비밀번호가 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!passwordCheck) {
      setErrorMessage('비밀번호 확인이 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!certification) {
      setErrorMessage('인증문자가 작성되지 않았습니다.');
      validationTimeOut();
    } else if (!isValidEmail(email)) {
      setErrorMessage('존재하지 않는 이메일 형식입니다.');
      validationTimeOut();
    } else if (!isValidPassword(password)) {
      setErrorMessage(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
      validationTimeOut();
    } else if (password !== passwordCheck) {
      setErrorMessage('비밀번호와 비밀번호 확인을 다르게 입력하셨습니다.');
      validationTimeOut();
    } else {
      console.log('Checking');
      const apiData = {
        userId: email,
        newPass: password,
        emailCode: certification,
      };
      putUserFindPass(apiData).then((res) => {
        console.log(res);

        if (res.data.result === false) {
          setErrorMessage('이메일이 인증되지 않았습니다.');
        }
      });
    }
  };

  //이메일 중복확인 함수
  const checkEmail = () => {
    console.log('checking Email');
    const apiData = { userId: email };
    postUserIdExists(apiData).then((res) => {
      console.log(res);

      if (res.data.result === true) {
        setMailCheckMessage(res.data.message + '이메일 인증을 진행하세요!');
        validationTimeOut();
      } else if (res.data.result === false) {
        setErrorMessage(res.data.message);
        validationTimeOut();
      }
    });
  };

  //회원가입 엔터키
  const handleOnKeyPressSignUp = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  const handleOnKeyPressSignIn = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleOnKeyPressPWC = (e) => {
    if (e.key === 'Enter') {
      sendPw();
    }
  };

  const handleHome = () => {
    document.location.href = '/';
  };

  return (
    <div className={`Lcontainer ${isSignUp ? 'right-panel-active' : ''}`}>
      <div
        className="form-container sign-up-container"
        style={{ opacity: isSignUp ? '100' : '0' }}
      >
        <div className="Form">
          <a href="/" rel="home">
            <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
          </a>
          <h1>회원가입</h1>
          <br />
          <input
            type="text"
            placeholder="별명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="email-authentication">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // style={{ width: '69%' }}
            />
            <button
              onClick={checkEmail}
              className="email-duplication-verification"
            >
              이메일 중복확인
            </button>
            {/* {errorMessage} */}
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={isEmailVerified ? '' : 'disabled-input'}
            disabled={!isEmailVerified}
            onKeyPress={handleOnKeyPressSignUp}
          />
          {/* {errorMessage} */}
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className={isEmailVerified ? '' : 'disabled-input'}
            disabled={!isEmailVerified}
            onKeyPress={handleOnKeyPressSignUp}
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

          <p className="mail-error-message">{mailCheckMessage}</p>

          <button onClick={handleSignUp}>회원가입</button>
          <br></br>
          <button
            className="ghost-mobile"
            onClick={isSignUp ? handleSignInClick : handleSignUpClick}
            // style={{ backgroundColor: 'red' }}
          >
            {isSignUp ? '로그인 하러 가기' : `회원가입 하러 가기`}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
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
        <div className="Form">
          <a href="/" rel="home">
            <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
          </a>
          <h1>로그인</h1>
          <br></br>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleOnKeyPressSignIn}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleOnKeyPressSignIn}
          />
          <br />
          <button onClick={handleSignIn}>로그인</button>
          <br />
          <button
            onClick={handleKakaoSignIn}
            style={{
              backgroundColor: '#FEE500',
              color: 'black',
              border: '1px solid #FEE500',
            }}
          >
            <img
              src="groupkakao.svg"
              style={{ width: '19.337px', height: '18.085px' }}
            ></img>{' '}
            카카오 로그인
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
          <button
            className="ghost-mobile"
            onClick={isSignUp ? handleSignInClick : handleSignUpClick}
            // style={{ backgroundColor: 'red' }}
          >
            {isSignUp ? '로그인 하러 가기' : `회원가입 하러 가기`}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div />

        <div className="Lcard-back">
          <div className="Form">
            <a href="/" rel="home">
              <img className="logo" src="beatbay_logo.svg" alt="로고"></img>
            </a>
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
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
              />
              <button onClick={sendAuth}>인증번호 전송</button>
              <button onClick={checkAuth}>인증번호 확인</button>
            </div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={isEmailVerified ? '' : 'disabled-input'}
              disabled={!isEmailVerified}
              onKeyPress={handleOnKeyPressPWC}
            />
            {/* {errorMessage} */}
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className={isEmailVerified ? '' : 'disabled-input'}
              disabled={!isEmailVerified}
              onKeyPress={handleOnKeyPressPWC}
            />
            <p className="mail-error-message" style={{ color: 'black' }}>
              {mailCheckMessage}
            </p>
            <button onClick={sendPw} style={{ width: '106%' }}>
              비밀번호 재설정
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
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
