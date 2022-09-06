import { instance } from '../shared/axios';
import axios from 'axios';

export const apis = {
  getUser: () => {
    return instance.get('/api/main/auth');
  },
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

  addGoal: (data) => {
    console.log(data);
    return instance.post('/create', data);
  },

  getGoal: () => {
    return instance.get('/confirm/goal');
  },
};

// export const addGoal = (data) => {
//   return axios.post(`${process.env.REACT_APP_BASE_URL}/create`, data);
// };

// Read
// export const getGoal = () => {
//   return axios.get(`${process.env.REACT_APP_BASE_URL}/confirm/goal`);
// };

export const API = {
  KAKAO_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/kakao`,
  GOOGLE_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/google`,
};
