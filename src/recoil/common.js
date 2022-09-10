import { atom } from 'recoil';

export const goalState = atom({
  key: 'goalState',
  default: {
    title: '',
    category: 3,
    characterId: 0,
    privateCheck: false,
    time: '05:20',
  },
});
