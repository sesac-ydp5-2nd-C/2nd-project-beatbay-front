import React, { useEffect, useState } from 'react';
import Screen from '../../Screen';
// import SellFormCategory from '../../../components/SellForm/SellFormCategory';
// import SellFormStatus from '../../../components/SellForm/SellFormStatus';
import './style.scss';
// import SellFromImg from '../../../components/SellForm/SellFromImg';
// import CustomDropdown from '../../../components/common/customDropdown/CustomDropdown';
// import { useNavigate } from 'react-router-dom';
import hashtag from '../../../asset/hashtag.svg';

import InterestTag from '../../../components/interestTag/InterestTag';

import {
  DeleteDeleteUser,
  getMypage,
  patchUpdateUser,
} from '../../../api/mypage';
import UserProfileVinyl from '../../../components/userProfileVinyl/UserProfileVinyl';
import AddTagButton from '../../../components/myPageIcons/addTag';

function MypageEditInformationScreen() {
  const [isFormValid, setIsFormValid] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [nickname, setNickname] = useState();
  const [introduction, setIntroduction] = useState();
  const [interests, setInterests] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [interestTag, setInterestTag] = useState('');

  const [establishUserData, setEstablishUserData] = useState();

  useEffect(() => {
    renderMyData();
  }, []);

  const renderMyData = () => {
    getMypage().then((res) => {
      // console.log(establishUserData.user_interest);
      if (res.data.result === 'mypage main') {
        setEstablishUserData(res.data.userData);

        setEmail(res.data.userData.user_id);
        setNickname(res.data.userData.user_nickname || '');
        setIntroduction(res.data.userData.user_comment || '');
        setInterests(res.data.userData.user_interest.split(',') || []);
        setProfileImage(res.data.userData.user_profile_img || '');
      }
    });
  };
  const isValidPassword = (password) => {
    //패스워드 검사 로직
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/.test(
      password,
    );
  };

  const handleUpdate = () => {
    if (!nickname) {
      alert('닉네임이 작성되지 않았습니다.');
    } else if (!password) {
      alert('비밀번호가 작성되지 않았습니다.');
    } else if (!confirmPassword) {
      alert('비밀번호 확인이 작성되지 않았습니다.');
    } else if (!isValidPassword(password)) {
      alert(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
    } else if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인을 다르게 입력하셨습니다.');
    } else {
      const formData = new FormData();
      formData.append('userId', email);
      formData.append('userPw', password);

      formData.append('userNickname', nickname);
      formData.append('userComment', introduction);

      const stringTags = interests.join(', ');
      formData.append('userInterest', stringTags);

      // formData.append('userInterest', interests);
      formData.append('uploadFiles', uploadedImage);

      patchUpdateUser(formData).then((res) => {
        alert('수정완료');
        document.location.href = '/mypage';
      });

      // const apidata = {
      //   user_nickname: nickname,
      //   user_comment: introduction,
      //   user_interest: interestTag,
      //   user_profile_img: profileImage,
      // };
      // console.log(apidata);
      // patchUpdateUser(apidata).then((res) => {
      //   console.log(res);

      //   if (res.data.result === true) {
      //     alert('등록완료!');
      //   } else {
      //     alert('등록과정에서 오류가 발생했습니다');
      //   }
      // });
    }
  };

  const handleDeleteAccount = () => {
    if (!nickname) {
      alert('닉네임이 작성되지 않았습니다.');
    } else if (!password) {
      alert('비밀번호가 작성되지 않았습니다.');
    } else if (!confirmPassword) {
      alert('비밀번호 확인이 작성되지 않았습니다.');
    } else if (!isValidPassword(password)) {
      alert(
        '비밀번호는 특수문자, 영문, 숫자의 조합으로 8자리이상이어야 합니다.',
      );
    } else if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인을 다르게 입력하셨습니다.');
    } else {
      const apidata = {
        user_id: email,
        userPw: password,
      };
      DeleteDeleteUser(apidata).then((res) => {
        if (res.data.result === true) {
          alert('탈퇴완료');
          document.location.href = '/';
        }
      });
    }
    // 회원 탈퇴 로직을 구현할 수 있습니다.
  };

  const removeLatestInterestTag = () => {
    // interests 배열이 비어있지 않은 경우에만 실행
    if (interests.length > 0) {
      const updatedInterests = [...interests];
      // 배열에서 가장 마지막 요소를 제거
      updatedInterests.pop();
      setInterests(updatedInterests);
    }
  };

  return (
    <Screen>
      {establishUserData && (
        <div>
          <div className="editInformationContainer">
            <div className="UPEContainer">
              <div className="editForm">
                <form onSubmit={handleUpdate}>
                  <h1>회원정보 수정</h1>

                  <section className="editInfoSection">
                    <div
                      className="editInfoContainer"
                      style={{ fontWeight: '700', fontSize: '16px' }}
                    >
                      ID: {establishUserData.user_id}
                    </div>
                  </section>

                  <section className="editInfoSection">
                    <div className="editInfoContainer">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="formList">비밀번호</label>
                      <span></span>
                    </div>
                    {!password && !isFormValid && (
                      <p className="error-message">
                        비밀번호는 필수 항목입니다.
                      </p>
                    )}
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
                    {!confirmPassword && !isFormValid && (
                      <p className="error-message">
                        비밀번호는 필수 항목입니다.
                      </p>
                    )}
                  </section>
                  <br />
                  <section className="editInfoSection">
                    <div className="editInfoContainer">
                      <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={nickname}
                        style={{ color: 'black' }}
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
                    <div
                      className="editInfoContainer"
                      style={{ marginTop: '25px' }}
                    >
                      <textarea
                        type="text"
                        id="introduction"
                        name="introduction"
                        placeholder={
                          // establishUserData && establishUserData.user_comment
                          '관심사를 작성해보세요!'
                        }
                        // rows="4"
                        // cols="50"
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        required
                      />
                      {/* {' '}
                  {!introduction && (
                    <p className="sellFormMsg">자기소개는 필수 항목입니다.</p>
                  )} */}
                    </div>
                  </section>
                  <br></br>
                  <img src={hashtag} className="hashtag" />
                  <div className="addTagSection">
                    <label htmlFor="interests">관심분야 태그</label>
                    <br></br>
                    <br></br>
                    <input
                      type="text"
                      id="interest"
                      name="interest"
                      onChange={(e) => setInterestTag(e.target.value)}
                    />
                    {/* <div className="addTagButton"> */}
                    <AddTagButton
                      onAddTag={() => {
                        // interestTag가 빈 문자열인지 확인
                        if (interestTag.trim() !== '') {
                          // interestTag가 빈 문자열이 아니면 추가
                          setInterests([...interests, interestTag]);
                          // console.log([...interests, interestTag]);
                        } else {
                          // interestTag가 빈 문자열이면 알림 또는 다른 동작 수행
                          alert('관심사를 입력해주세요.');
                        }
                      }}
                    />
                    {/* </div> */}
                    <button
                      type="button"
                      onClick={removeLatestInterestTag}
                      className="deleteTag"
                    >
                      {/* 새로운 버튼 */}
                      최신 태그 삭제
                    </button>
                  </div>
                  {interests.length === 0 ? (
                    <InterestTag />
                  ) : (
                    <InterestTag userData={{ user_interest: interests }} />
                  )}
                </form>
              </div>
            </div>
            <div className="R-UPEContainer">
              <div className="vinylpic">
                <div className="vinyl">
                  <UserProfileVinyl
                    userData={establishUserData}
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                  />
                </div>
                {/* <p className="error-message">
                  {PWCerrorMessage}
                  {PWCerrorMessage}
                  {NerrorMessage}
                </p> */}
              </div>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="editQuit"
              >
                탈퇴
              </button>

              <button
                type="submit"
                onClick={handleUpdate}
                className="editSubmit"
              >
                등록
              </button>
            </div>
          </div>

          <br />
        </div>
      )}
    </Screen>
  );
}

export default MypageEditInformationScreen;
