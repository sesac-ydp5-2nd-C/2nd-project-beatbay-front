import { create } from 'apisauce';
import axios from 'axios';

export const baseURL = 'http://localhost:8000';

const setInterceptors = (instance) => {
  instance.interceptors.request.use(
    async (config) => {
      // 여기서 헤더에 토큰 추가
      return config;
      // throw new axios.Cancel();
    },

    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      if (error.response.status == 400 || error.response.status == 401) {
        alert('로그인이 필요합니다 !');
        localStorage.removeItem('login_id');
        window.history.back();
      }
      // if (axios.isCancel(error)) {
      //   // 요청이 취소되었을 때 처리
      //   console.log('Request was canceled');
      // }
      return error.response;
    },
  );
  return instance;
};

export const createInstance = (url = baseURL) => {
  const instance = axios.create({ baseURL: url, withCredentials: true });
  return setInterceptors(instance);
};

export const BB = create({ axiosInstance: createInstance() });
