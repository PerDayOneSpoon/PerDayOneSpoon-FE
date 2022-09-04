export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_KAKAO}&response_type=code`;

export const API = {
  KAKAO_LOGIN: `${process.env.REACT_APP_BASE_URL}/user/login/kakao`,
};
