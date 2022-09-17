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
    return instance.patch('/change/status', {
      nickname: data.nickname,
      status: data.status,
    });
  },

  updateUserImg: (formData) => {
    return instance.patch('/change/image', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },

  getSearchFriends: (data) => {
    return instance.get(`/search/friends/${data}`);
  },

  logout: () => {
    return instance.delete('/delete/user/logout');
  },

  unregister: () => {
    return instance.delete('/delete/user/register');
  },
};
