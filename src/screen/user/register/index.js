import React, { useState } from 'react';
import './style.scss';

const App = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const sendVerificationEmail = () => {
    // 인증 이메일 발송 로직
  };

  const handleSubmit = () => {
    // 회원가입 로직 및 유효성 검사
  };

  const toggleAgreementModal = () => {
    setShowAgreementModal(!showAgreementModal);
  };

  return (
    <div className="registration-form">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendVerificationEmail}>이메일로 인증 메일 발송</button>

      <div className="verification-modal">
        {showAgreementModal && (
          <div className="modal-content">
            {/* 이용약관 내용 */}
            <button onClick={toggleAgreementModal}>닫기</button>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="인증 번호"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <div className="agreement">
        <input
          type="checkbox"
          checked={agreementChecked}
          onChange={() => setAgreementChecked(!agreementChecked)}
        />
        <label onClick={toggleAgreementModal}>이용약관 동의</label>
      </div>

      <button onClick={handleSubmit}>회원가입</button>
    </div>
  );
};

export default App;
