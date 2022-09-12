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

  updateUserImg: (formData) => {
    console.log('프사바꾸자!!!!', formData);
    return instance.patch('/change/image', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },

  getSearchFriends: (data) => {
    if (data.queryKey[0] === null || data.queryKey[0] === '') {
      return false;
    } else {
      return instance.get(`/search/friends/${data.queryKey[0]}`);
    }
  },

  logout: () => {
    return instance.delete('/delete/user/logout');
  },

  unregister: () => {
    return instance.delete('/delete/user/register');
  },
};
