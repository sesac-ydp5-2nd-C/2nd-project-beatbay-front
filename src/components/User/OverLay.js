import React, { useState } from 'react';

export default function OverLay() {
  const [isSignUp, setIsSignUp] = useState(false);
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
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // 체크박스를 토글
  };

  return (
    <div className="overlay-container">
      <div className={`overlay ${isSignUp ? 'overlay-right' : 'overlay-left'}`}>
        <h1>{isSignUp ? 'Hello, Beat Member!' : 'Welcome Back!'}</h1>
        <p>
          {isSignUp
            ? 'Enter your personal details and start your journey with us'
            : 'To keep connected with us please login with your personal info'}
        </p>
        <button
          className="ghost"
          onClick={isSignUp ? handleSignInClick : handleSignUpClick}
        >
          {isSignUp ? '로그인' : '회원가입'}
        </button>
      </div>
    </div>
  );
}
