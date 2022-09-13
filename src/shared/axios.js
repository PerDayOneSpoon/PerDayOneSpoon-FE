import axios from 'axios';
import {
  setToken,
  getAccessToken,
  getRefreshToken,
  removeToken,
} from './localStorage';
import { userApi } from '../api/userApi';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (error) => {
    console.log('axios 파일 request error', error);
    // window.location('/login');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log('RESPONSE INTERCEPTORS SUCCESS', response);
    return response;
  },
  async (error) => {
    const {
      data: responseData,
      config: originalRequest,
      status: statusCode,
    } = error.response;

    // message: "토큰이 존재하지 않습니다."
    if (responseData.code === '400') {
      window.location.replace('/login');
    }

    // message: "변조된 토큰입니다."
    if (responseData.code === '401') {
      removeToken();
      window.location.replace('/');
    }

    // "message": "만료된 토큰 입니다."
    if (responseData.code === '408') {
      const token = getRefreshToken();
      if (token) {
        try {
          const response = await userApi.getRefreshToken({
            refreshToken: token,
          });
          setToken(
            response.headers.authorization,
            response.headers.refreshtoken
          );
          return instance(originalRequest);
        } catch (err) {
          removeToken();
          window.location.replace('/');
        }
      }
    }

    console.log('axios 파일 response error', error);
    return Promise.reject(error);
  }
);
