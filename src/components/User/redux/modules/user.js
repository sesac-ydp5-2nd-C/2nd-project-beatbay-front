// import axios from 'axios';

// const kakaoLogin = (code) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: 'GET',
//       url: `http//15.164.171.113/oauth/callback/kakao?code=${code}`,
//     })
//       .then((res) => {
//         console.log(res); //토큰이 넘어올 것

//         const ACCESS_TOKEN = res.data.accessToken;

//         localStorage.setItem('token', ACCESS_TOKEN); //예시로 로컬에 저장

//         history.replace('/'); //토큰 받았으나 메인으로 화면 전환
//       })
//       .catch((err) => {
//         console.log('소셜로그인 에러'.err);
//         window.alert('로그인에 실패하였습니다.');
//         history.replace('/user'); //토큰 받았으나 메인으로 화면 전환
//       });
//   };
// };
