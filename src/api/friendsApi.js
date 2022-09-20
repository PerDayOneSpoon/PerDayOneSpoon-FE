import { instance } from '../shared/axios';

export const friendsApi = {
  addFriend: ({ friendId }) => {
    return instance.post(`/friends/${friendId}`);
  },

  getFriendGoal: (friendId) => {
    return instance.get(`/confirm/calendar/friend/${friendId}`);
  },

  getSearchFriends: (data) => {
    return instance.get(`/search/friends/${data}`);
  },

  getFollower: () => {
    return instance.get('/search/friends/follower');
  },

  getFollowing: () => {
    return instance.get('/search/friends/following');
  },

  deleteFollower: ({ friendId }) => {
    return instance.delete(`/delete/follower/${friendId}`);
  },

  deleteFollowing: ({ friendId }) => {
    return instance.delete(`/delete/following/${friendId}`);
  },
};
