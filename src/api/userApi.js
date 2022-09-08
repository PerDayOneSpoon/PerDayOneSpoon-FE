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

  updateUserStatus: (data) => {
    console.log('UPDATE USER INFO API', data);
    return instance.patch('/change/status', {
      nickname: data.nickname,
      status: data.status,
    });
  },

  logout: () => {
    return instance.delete('/delete/user/logout');
  },
};
