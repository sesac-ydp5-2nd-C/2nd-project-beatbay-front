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
      return error.response;
    },
  );
  return instance;
};

export const createInstance = (url = baseURL) => {
  const instance = axios.create({ baseURL: url });
  return setInterceptors(instance);
};

export const BB = create({ axiosInstance: createInstance() });
