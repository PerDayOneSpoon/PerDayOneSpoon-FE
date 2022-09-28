import Graph from './Graph';
import CommonText from './elements/CommonText';
import GoalList from './goal/GoalList';
import { useQuery } from 'react-query';
import { goalApi } from '../api/goalApi';
import { colors } from '../theme/theme';
import Loading from './global/Loading';

const Main = ({ handleStartCilck }) => {
  const {
    isLoading,
    isError,
    error,
    data: mainGoalData,
  } = useQuery(['goalInfo'], goalApi.getGoal, {
    onSuccess: (data) => {},
    staleTime: Infinity,
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
      <CommonText isBody={true} fw='600' mg='24px 0 6px 0'>
        오늘의 습관
      </CommonText>
      <CommonText isFootnote1={true} fc={colors.gray500}>
        {currentDate}
      </CommonText>
      <GoalList
        isMain={true}
        data={todayGoalsDtoList}
        handleStartCilck={handleStartCilck}
      />
    </>
  );
};

export default Main;
