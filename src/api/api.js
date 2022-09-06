import { instance } from '../shared/axios';

export const API = {
  KAKAO_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/kakao`,
  GOOGLE_LOGIN: `${process.env.REACT_APP_BASE_URL}/login/google`,
};
