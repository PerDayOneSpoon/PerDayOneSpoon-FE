import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { goalApi } from '../api/goalApi';
import { stringToTime } from '../utils/stringToTime';

const { persistAtom } = recoilPersist({
  key: 'goalId',
});
let i = -1;

export const goalTimeFamily = atomFamily({
  key: 'goalTimeFamily',
  default: selectorFamily({
    key: 'asyncGetGoalTime',
    get:
      (id) =>
      async ({ get }) => {
        const { data } = await goalApi.getGoal();
        const getTime = data.todayGoalsDtoList.map((item) => item.time);
        const timeValue = {
          id: id,
          hh: Number(getTime[i]?.split(':')[0]),
          mm: Number(getTime[i]?.split(':')[1]),
          ss: Number(getTime[i]?.split(':')[2]),
          isPlay: false,
          currentTime: 0,
        };
        i++;
        return timeValue;
      },
  }),
  // effects_UNSTABLE: [persistAtom],
});

// =====================================================================
// export const timerState = atom({
//   key: 'timerState',
//   default: 0,
// });

export const goalTimeId = atom({
  key: 'goalTimeId',
  default: 0,
});

// export const goalTimerState = atomFamily({
//   key: 'goalTimerState',
//   default: (id) => ({
//     id: id,
//     displayTime: 0,
//     totalTime: 0,
//     isPlay: false,
//     isDone: false,
//   }),
// });

// export const goalTimerSelectorFamily = selectorFamily({
//   key: 'goalTimerSelectorFamily',
//   get:
//     (id) =>
//     ({ get }) =>
//       get(goalTimerState(id)),

//   set:
//     (id) =>
//     ({ get, set, reset }, info) => {
//       if (info instanceof DefaultValue) {
//         reset(goalTimerState(id));
//         set(goalTimerState, (prev) => prev.filter((item) => item !== id));

//         return;
//       }

//       console.log('info', info);

//       set(goalTimerState(id), info);
//       // set(goalTimerState, (prev) => Array.from(new Set([...prev, info.id])));
//     },
// });
