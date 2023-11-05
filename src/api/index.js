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
      console.log(response);
      return response;
    },

    async (error) => {
      console.log(error);
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
