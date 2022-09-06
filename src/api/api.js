import { instance } from '../shared/axios';
import axios from 'axios';

export const getUser = async () => {
  const response = await instance.get('/api/main/auth');
  return response.data;
};

export const addGoal = (data) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/create`, data);
};

// Read
// export const getGoal = () => {
//   return axios.get(`${process.env.REACT_APP_BASE_URL}/confirm/goal`);
// };

export const API = {
  KAKAO_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/kakao`,
  GOOGLE_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/google`,
};
