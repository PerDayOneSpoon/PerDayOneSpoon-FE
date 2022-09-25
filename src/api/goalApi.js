import { instance } from '../shared/axios';

export const goalApi = {
  addGoal: (data) => {
    return instance.post('/create', data);
  },

  getGoal: () => {
    return instance.get('/confirm/goal');
  },

  achieveGoal: ({ goalId, achivement }) => {
    return instance.patch(`/change/${goalId}`, {
      achivement: achivement,
    });
  },

  deleteGoal: ({ goalFlag }) => {
    return instance.delete(`/delete/${goalFlag}`);
  },

  changePrivateGoal: ({ goalFlag, privateCheck }) => {
    return instance.patch(`/change/goal/${goalFlag}`, {
      privateCheck: privateCheck,
    });
  },

  likeGoal: ({ goalFlag }) => {
    return instance.patch(
      `/heart/${goalFlag}
    `
    );
  },
};
