import { instance } from '../shared/axios';

const KAKAO_LOGIN = `${process.env.REACT_APP_BASE_URL}/login/kakao`;
const GOOGLE_LOGIN = `${process.env.REACT_APP_BASE_URL}/login/google`;

export const socialLoginApi = {
  googleLogin: (code) => {
    return instance.get(`${GOOGLE_LOGIN}?code=${code}`);
  },
  kakaoLogin: (code) => {
    return instance.get(`${KAKAO_LOGIN}?code=${code}`);
  },
};
