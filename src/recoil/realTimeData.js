import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'realTime-data',
  storage: sessionStorage,
});

export const realTimeNoticeState = atom({
  key: 'realTimeNoticeState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const welcomeMessageState = atom({
  key: 'welcomeMessageState',
  default: '',
});
