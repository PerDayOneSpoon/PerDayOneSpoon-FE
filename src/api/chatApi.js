import { instance } from '../shared/axios';

export const chatApi = {
  // 채팅방 생성
  createChat: async (friendId) => {
    const data = await instance.post('/chat/room/private/9');
    return data;
  },
};
