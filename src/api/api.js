import { instance } from '../shared/axios';
import axios from 'axios';

export const apis = {
  getRefreshToken: ({ refreshToken }) => {
    return instance.post(
      '/login/reissue',
      {},
      {
        headers: {
          refreshToken: refreshToken,
        },
      }
    );
  },
};

export const API = {
  KAKAO_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/kakao`,
  GOOGLE_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/google`,
};
