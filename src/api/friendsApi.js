import { instance } from '../shared/axios';

export const friendsApi = {
  addFriend: ({ friendId }) => {
    return instance.post(`/friends/${friendId}`);
  },
};
