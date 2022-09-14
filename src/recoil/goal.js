import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { goalApi } from '../api/goalApi';
import { DefaultValue } from 'recoil';

const { persistAtom } = recoilPersist();
let i = 0;

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
          hh: Number(getTime[i].split(':')[0]),
          mm: Number(getTime[i].split(':')[1]),
          ss: Number(getTime[i].split(':')[2]),
          isPlay: false,
          currentTime: 0,
        };
        i++;
        return timeValue;
      },
  }),
  // effects_UNSTABLE: [persistAtom],
});
