// Goal copy  연결
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { goalApi } from '../api/goalApi';
import useInterval from '../hooks/useInterval';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { persistAtom } = recoilPersist({
  key: 'goals',
});
// let i = 0;

// export const goalTimeFamily = atomFamily({
//   key: 'goalTimeFamily',
//   default: selectorFamily({
//     key: 'asyncGetGoalTime',
//     get:
//       (id) =>
//       async ({ get }) => {
//         const { data } = await goalApi.getGoal();
//         const getTime = data.todayGoalsDtoList.map((item) => item.time);
//         const timeValue = {
//           id: id,
//           hh: Number(getTime[i]?.split(':')[0]),
//           mm: Number(getTime[i]?.split(':')[1]),
//           ss: Number(getTime[i]?.split(':')[2]),
//           isPlay: false,
//           currentTime: 0,
//         };
//         i++;
//         return timeValue;
//       },
//   }),
//   // effects_UNSTABLE: [persistAtom],
// });

// =================================================================================

// const localStorageEffect =
//   (key) =>
//   ({ setSelf, onSet }) => {
//     const savedTime = localStorage.getItem(key);
//     if (savedTime !== null) {
//       setSelf(useLocalStorage(`timer:time${key}`, 0,, ));
//     }
//   };

// export const goalTimeFamily = atom({
//   key: 'goalTimeFamily',
//   default: (id) => {
//     return {
//       id,
//       time: '',
//       isPlay: false,
//       totalTime: 0,
//       currentTime: 0,
//       percentage: 0,
//     };
//   },
//   effects_UNSTABLE: [persistAtom],
// });

export const clickedGoalId = atom({
  key: 'clickedGoalId',
  default: '',
});

export const goalTimeFamily = atomFamily({
  key: 'goalTimeFamily',
  default: (id) => {
    return {
      id,
      time: '',
      isPlay: false,
      currentTime: 0,
      totalTime: 0,
      percentage: 0,
    };
  },
  effects_UNSTABLE: [persistAtom],
});

// export const timeSelectorFamily = selectorFamily({
//   key: 'timeSelectorFamily',
//   get:
//     (id) =>
//     ({ get }) => {
//       return get(goalTimeFamily(id));
//     },
//   set:
//     (id) =>
//     ({ set }, newVal) => {
//       // const time = goalTimeFamily(id).time;
//       // goalTimeFamily(id),
//       // set();
//       // const intervalTime = setInterval(() => {
//       //   set(goalTimeFamily(id), (prev) => (prev.time += 1));
//       // }, 1000);
//       // newVal
//       // if (newVal.isPlay) {
//       //   set(
//       //     setInterval(() => {
//       //       newVal.time += 1;
//       //     }, 1000)
//       //   );
//       // }
//       // set(goalTimeFamily(id), newVal);
//     },
// });

// const goalTimeSelector = selector({
//   key: 'goalTimeSelector',
//   get: async () => {
//     const { data } = await goalApi.getGoal();
//     return data
//   },
//   set: ({set}) => {
//     set(goalTimeFamily(data.id))
//   }
// });

// const asyncUserEffect =
//   (key) =>
//   ({ setSelf, onSet }) => {
//     const localTimeData = localStorage.getItem(key);

//     setSelf(() => {
//       if (localTimeData !== null) {
//         return console.log('localTimeData 없음');
//       } else {
//         const { data } = goalApi.getGoal();
//         const getTime = data.todayGoalsDtoList.map((item) => item.time);
//         return getTime;
//       }
//     });

//     onSet((newValue, _, isReset) => {
//       localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

// export const goalTimeFamily = atomFamily({
//   key: 'goalTimeFamily',
//   effects: [localStorageEffect('goalTimeFamily')],
// });
