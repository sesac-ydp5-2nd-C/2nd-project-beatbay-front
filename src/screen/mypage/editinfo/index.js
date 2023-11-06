import React, { useState } from 'react';
import Screen from '../../Screen';
// import SellFormCategory from '../../../components/SellForm/SellFormCategory';
// import SellFormStatus from '../../../components/SellForm/SellFormStatus';
import './style.scss';
// import SellFromImg from '../../../components/SellForm/SellFromImg';
// import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
// import { useNavigate } from 'react-router-dom';
import userImg from '../../../asset/profile_default.png';

import InterestTag from '../../../components/interestTag/InterestTag';

import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';

function MypageEditInformationScreen() {
  const [userData, setUserData] = useState({
    user_nickname: '이재민',
    comment: '안녕하세요 기타치는 이재민 입니다.',
    user_interests: ['밴드', '베이스', '레슨'],
    imgSrc: userImg,
    user_id: 'beatbay@gmail.com',
    user_pw: 'qwerty1234!',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [interests, setInterests] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [interestTag, setInterestTag] = useState('');

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
          <div className="editForm">
            <h1>회원정보 수정</h1>

            <form onSubmit={handleUpdate}>
              <section className="editInfoSection">
                <br></br>
                ID: {userData.user_id}
                <br />
                <div className="editInfoContainer">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    // placeholder="비밀번호를 입력하세요"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="formList">비밀번호</label>
                  <span></span>
                </div>
              </section>
              <br />
              <section className="editInfoSection">
                <div className="editInfoContainer">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    // placeholder="비밀번호 확인"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label htmlFor="sellTitle" className="formList">
                    비밀번호 확인
                  </label>
                  <span></span>
                </div>
              </section>
              <br />
              <section className="editInfoSection">
                <div className="editInfoContainer">
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    // placeholder="닉네임을 입력하세요"
                    value={nickname}
                    required
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <label htmlFor="sellTitle" className="formList">
                    닉네임
                  </label>
                  <span></span>
                </div>
              </section>
              <br />
              <br />
              <br />
              <br />
              <section className="editInfoSection">
                <span className="formList">자기소개</span>
                <div className="editInfoContainer">
                  <textarea
                    type="text"
                    id="introduction"
                    name="introduction"
                    placeholder="자기소개를 입력해 주세요"
                    rows="4"
                    cols="50"
                    onChange={(e) => setIntroduction(e.target.value)}
                    required
                  />
                </div>
              </section>

              {/* <label htmlFor="profileImage">
                프로필 이미지:
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={(e) => setProfileImage(e.target.files[0])}
              /> */}
              <br></br>

              <label htmlFor="interests">관심분야 태그:</label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
              <br />
              <InterestTag userData={userData} />
            </form>
            <br />
            <button type="button" onClick={handleDeleteAccount}>
              탈퇴
            </button>
            <button type="submit">등록</button>
          </div>
        </div>
      </div>
      <br />

      <div className="vinylpic">
        <div className="vinyl">
          <MypageVinyl userData={userData} />
        </div>
      </div>
    </Screen>
  );
}

export default MypageEditInformationScreen;
