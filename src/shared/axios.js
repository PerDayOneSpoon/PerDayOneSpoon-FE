import axios from 'axios';
import {
  setToken,
  getAccessToken,
  getRefreshToken,
  removeToken,
} from './localStorage';
import { apis } from '../api/api';
import { useNavigate } from 'react-router-dom';
// import { getNewAccessToken } from '../shared/common';

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
    return response;
  },
  async (error) => {
    const {
      data: responseData,
      config: originalRequest,
      status: statusCode,
    } = error.response;

    const navigate = useNavigate();

    // 토큰이 헤더에 없음  ???????
    if (responseData === 404) {
      window.location.replace('/');
    }

    // message: "변조된 토큰입니다."
    if (responseData.code === 401) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      window.location.replace('/');
    }

    // "message": "만료된 토큰입니다."
    if (responseData.code === 408) {
      const token = getRefreshToken();
      if (token) {
        try {
          const response = await apis.getRefreshToken({ refreshToken: token });
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
