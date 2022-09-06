import axios from 'axios';
import { getNewAccessToken } from '../shared/common';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (error) => {
    console.log('axios 파일 21번째 줄 error', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      data: responseData,
      config: originalRequest,
      status: statusCode,
    } = error.response;

    // message: "변조된 토큰입니다."
    if (responseData.code === 401) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      window.location.replace('/');
    }

    // "message": "만료된 토큰입니다."
    if (responseData.code === 408) {
      getNewAccessToken();
    }

    console.log('axios 파일 49번째 줄 error', error);
    return Promise.reject(error);
  }
);
