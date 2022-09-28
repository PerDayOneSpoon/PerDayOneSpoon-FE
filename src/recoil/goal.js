import { atom, atomFamily, selectorFamily } from 'recoil';
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
        const response = await goalApi.getGoal();
        const getTime = response.data.todayGoalsDtoList.map(
          (item) => item.time
        );
        const isDone = response.data.todayGoalsDtoList.map(
          (item) => item.achievementCheck
        );
        const timeValue = {
          id: id,
          totalTime: stringToTime(getTime[i]),
          displayTime: stringToTime(getTime[i]),
          isPlay: false,
          currentTime: 0,
          isDone: isDone[i],
        };
        i++;
        return timeValue;
      },
  }),
  effects_UNSTABLE: [persistAtom],
});

export const timerState = atom({
  key: 'timerState',
  default: 0,
});

export const goalTimeId = atom({
  key: 'goalTimeId',
  default: 0,
});
