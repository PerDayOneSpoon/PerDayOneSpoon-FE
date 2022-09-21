import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    status: '',
  },
});

export const navBarState = atom({
  key: 'navBarState',
  default: '홈',
  effects_UNSTABLE: [persistAtom],
});

export const calendarUserIdState = atom({
  key: 'calendarUserIdState',
  default: '',
});
