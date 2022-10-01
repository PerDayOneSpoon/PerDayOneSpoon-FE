import { atom, atomFamily, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { goalApi } from '../api/goalApi';
import { stringToTime } from '../utils/stringToTime';
import { useRef } from 'react';

const { persistAtom } = recoilPersist({
  key: 'goals-info',
});

export const goalTimeFamilyKey = atom({
  key: 'goalTimeFamilyKey',
  default: 0,
});

export const goalTimeFamily = atomFamily({
  key: 'goalTimeFamily',
  default: selectorFamily({
    key: 'goalTimeFamily/selectorFamily',
    get:
      (id) =>
      async ({ get }) => {
        const { data } = await goalApi.getGoal();
        const dataList = data.todayGoalsDtoList;
        const target = dataList.find((v) => v.id === id);

        return {
          id: target.id,
          totalTime: stringToTime(target.time),
          displayTime: stringToTime(target.time),
          isPlay: false,
          currentTime: 0,
        };
      },
  }),
  effects_UNSTABLE: [persistAtom],
});

export const goalTimeId = atom({
  key: 'goalTimeId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const isStartState = atom({
  key: 'isStartState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
