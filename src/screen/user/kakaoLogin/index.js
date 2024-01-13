import KakaoLogin from 'react-kakao-login';

const SocialKakao = () => {
  const kakaoClientId = '1b3f4e90bde253a802ad08134afe8d96';
  const kakaoOnSuccess = async (data) => {
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
  };
  const kakaoOnFailure = (error) => {};
  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
