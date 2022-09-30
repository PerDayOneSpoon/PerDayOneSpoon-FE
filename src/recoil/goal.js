import { atom, atomFamily, selector, selectorFamily } from 'recoil';
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

let i = 0;

export const goalTimeFamily = atomFamily({
  key: 'goalTimeFamily',
  default: selectorFamily({
    key: 'asyncGetGoalTime',
    get:
      (id) =>
      async ({ get }) => {
        const { data } = await goalApi.getGoal();

        const getTime = data?.todayGoalsDtoList?.map((item) => item.time);
        const index = data?.todayGoalsDtoList?.map((item, i) => i);

        const timeValue = {
          id: id,
          totalTime: stringToTime(getTime[i]),
          displayTime: stringToTime(getTime[i]),
          isPlay: false,
          currentTime: 0,
        };

        return timeValue;
      },
    set: ({ set }, newValue) => {
      console.log('newValue', newValue);
      const key = newValue++;
      set(goalTimeFamilyKey, key);
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
