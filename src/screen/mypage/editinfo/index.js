import React, { useState } from 'react';
import Screen from '../../Screen';
// import SellFormCategory from '../../../components/SellForm/SellFormCategory';
// import SellFormStatus from '../../../components/SellForm/SellFormStatus';
import './style.scss';
// import SellFromImg from '../../../components/SellForm/SellFromImg';
// import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
// import { useNavigate } from 'react-router-dom';

function MypageEditInformationScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [interests, setInterests] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();

    // 여기에서 폼 데이터를 서버로 보내는 로직을 추가할 수 있습니다.
    // 비밀번호, 닉네임, 자기소개, 관심분야, 프로필 이미지 등을 서버로 전송합니다.
  };

  const handleDeleteAccount = () => {
    // 회원 탈퇴 로직을 구현할 수 있습니다.
  };
  return (
    <Screen>
      <div className="editInformationContainer">
        <div className="PIContainer">
          <div className="DDContent">
            <h1>회원정보 수정</h1>
            <form onSubmit={handleUpdate}>
              ID : beatbay@gmail.com
              <br />
              <label htmlFor="password">비밀번호:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <label htmlFor="confirmPassword">비밀번호 확인:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <br />
              <label htmlFor="nickname">닉네임:</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <br />
              <label htmlFor="introduction">자기소개:</label>
              <textarea
                id="introduction"
                name="introduction"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                rows="4"
                cols="50"
                required
                placeholder="안녕하세요 기타치는 이재민입니다"
              />
              <br />
              <label htmlFor="interests">관심분야 태그:</label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
              <br />
              <label htmlFor="profileImage">프로필 이미지:</label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
              <br />
              <button type="button" onClick={handleDeleteAccount}>
                회원탈퇴
              </button>
              <button type="submit">등록</button>
            </form>
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default MypageEditInformationScreen;
