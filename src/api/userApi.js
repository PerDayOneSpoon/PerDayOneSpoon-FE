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

  updateUserProfile: (formData) => {
    return instance.patch('/change/profile', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },

  logout: () => {
    return instance.delete('/delete/user/logout');
  },

  unregister: () => {
    return instance.delete('/delete/user/register');
  },
};
