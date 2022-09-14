import Graph from './Graph';
import CommonText from './elements/CommonText';
import GoalList from './goal/GoalList';
import { useQuery } from 'react-query';
import { goalApi } from '../api/goalApi';
import { colors } from '../theme/theme';
import { useRecoilValue } from 'recoil';
import { asyncGetGoal } from '../recoil/goal';
import { useEffect } from 'react';

const Main = () => {
  const {
    isLoading,
    isError,
    error,
    data: mainGoalData,
  } = useQuery('getGoalInfo', goalApi.getGoal, {
    onSuccess: () => {},
  });

  // ['00:01:00', '00:02:00', '00:01:00', '00:01:00', '00:01:00']

  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [mainGoal, setMainGoal] = useRecoilState(goalListState);

  // const getMainGoal = useRecoilValueLoadable(getGoalListSelector);

  // console.log(getMainGoal);

  // const requestFetchTodos = useCallback(() => {
  //   if (getMainGoal === null || getMainGoal === undefined) {
  //     return;
  //   }

  //   switch (getMainGoal.state) {
  //     case 'loading':
  //       setIsLoading(true);
  //       break;

  //     case 'hasValue':
  //       setIsLoading(false);
  //       setMainGoal(getMainGoal.contents);
  //       break;

  //     case 'hasError':
  //       setIsError(false);
  //       setIsLoading(false);
  //       break;

  //     default:
  //       return;
  //   }
  // }, [getMainGoal]);

  // useEffect(() => {
  //   requestFetchTodos();
  // }, [requestFetchTodos]);

  // const [test, setTest] = useRecoilState(getGoalListSelector);
  // const [time, setTime] = useRecoilState(goalTimeState);

  // console.log('getGoalListSelector!!!', test);
  // console.log(time);

  // console.log(mainGoalData.data);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  const {
    weekRateDtoList,
    currentDate,
    weekStartDate,
    weekEndDate,
    todayGoalsDtoList,
  } = mainGoalData.data;

  return (
    <>
      <Graph
        weekRateDtoList={weekRateDtoList}
        weekStartDate={weekStartDate}
        weekEndDate={weekEndDate}
      />
      <CommonText isSubtitle1={true} mg='16px 0 4px 0'>
        오늘의 습관
      </CommonText>
      <CommonText isCaption={true} fc={colors.text}>
        {currentDate}
      </CommonText>
      <GoalList isMain={true} data={todayGoalsDtoList} />
    </>
  );
};

export default Main;
