export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_KAKAO}&response_type=code`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_REST_API_KEY_GOOGLE}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_GOOGLE}&response_type=code&scope=email%20profile%20openid&access_type=offline`;

export const API = {
  KAKAO_LOGIN: `${process.env.REACT_APP_BASE_URL}/user/login/kakao`,
  GOOGLE_LOGIN: `${process.env.REACT_APP_BASE_URL}/user/login/google`,
};
