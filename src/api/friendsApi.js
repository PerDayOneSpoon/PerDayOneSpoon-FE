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
};
