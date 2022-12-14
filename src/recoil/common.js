import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const modalState = atom({
  key: 'modalState',
  default: {
    open: false,
    type: 'delete',
  },
});

export const bottomModalState = atom({
  key: 'bottomModalState',
  default: {
    open: false,
    type: '',
  },
});

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    nickname: '',
    status: '',
  },
});

export const navBarState = atom({
  key: 'navBarState',
  default: '달성',
  effects_UNSTABLE: [persistAtom],
});

export const calendarUserIdState = atom({
  key: 'calendarUserIdState',
  default: '',
});

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
