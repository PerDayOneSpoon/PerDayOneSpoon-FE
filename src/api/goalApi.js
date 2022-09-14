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
};
