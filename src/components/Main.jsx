import Graph from './Graph';
import CommonText from './elements/CommonText';
import GoalList from './goal/GoalList';
import { useQuery } from 'react-query';
import { goalApi } from '../api/goalApi';
import { colors } from '../theme/theme';
import Loading from './global/Loading';

const Main = () => {
  const {
    isLoading,
    isError,
    error,
    data: mainGoalData,
  } = useQuery('getGoalInfo', goalApi.getGoal, {
    onSuccess: (data) => {},
  });

  if (isLoading) {
    return <Loading />;
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
