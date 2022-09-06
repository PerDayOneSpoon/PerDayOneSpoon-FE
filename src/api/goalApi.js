import { instance } from '../shared/axios';

export const goalApi = {
  addGoal: (data) => {
    console.log(data);
    return instance.post('/create', data);
  },

  getGoal: () => {
    return instance.get('/confirm/goal');
  },
};
