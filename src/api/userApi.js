import { instance } from '../shared/axios';

export const userApi = {
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

  getUserInfo: () => {
    return instance.get('/confirm/profile');
  },

  logout: () => {
    return instance.delete('/delete/user/logout');
  },
};
