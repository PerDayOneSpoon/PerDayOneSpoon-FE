import { atom } from 'recoil';

// export const goalState = atom({
//   key: 'goalState',
//   default: ''
// });

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    status: '',
  },
});
