import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { goalApi } from '../api/goalApi';

const { persistAtom } = recoilPersist();

export const goalTimeState = atom({
  key: 'goalTimeState',
  default: '',
});

export const getGoalListSelector = selector({
  key: 'getGoalListSelector',
  get: async ({ get }) => {
    try {
      const goalTime = get(goalTimeState);
      const { data } = await goalApi.getGoal();
      console.log(data.goalResponseDtoList.map((item) => item.time));
      // data.goalResponseDtoList.map((item) => goalTime.push(item.time))
      return goalTime;
    } catch (error) {
      return error.response;
    }
  },
});

// export const goalListState = atom({
//   key: 'goalListState',
//   default: {},
//   effects_UNSTABLE: [persistAtom],
// });
