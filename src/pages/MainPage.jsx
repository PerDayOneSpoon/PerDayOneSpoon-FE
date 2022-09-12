import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalList from '../components/goal/GoalList';
import NavBar from '../components/global/NavBar';
import Graph from '../components/Graph';
import CommonText from '../components/elements/CommonText';
import AddButton from '../components/elements/AddButton';
import { colors } from '../theme/theme';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { goalApi } from '../api/goalApi';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { getGoalListSelector, goalTimeState } from '../recoil/goal';
import { goalListState } from '../recoil/goal';

import char1 from '../assets/imgs/character1.png';
import char2 from '../assets/imgs/character2.png';
import char3 from '../assets/imgs/character3.png';
import char4 from '../assets/imgs/character4.png';
import char5 from '../assets/imgs/character5.png';
import moment from 'moment';

const MainPage = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: mainGoalData,
  } = useQuery('getGoalInfo', goalApi.getGoal, {
    onSuccess: () => {
      // console.log('mainGoalData', data);
    },
  });

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

  console.log(mainGoalData);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header title='주간 습관 달성률' bgColor={colors.secondary} />
      <Graph />
      <CommonText isSubtitle1={true} mg='16px 0 4px 0'>
        오늘의 습관
      </CommonText>
      <CommonText isCaption={true} fc={colors.text}>
        {mainGoalData.data.goalResponseDtoList[0].currentdate}
      </CommonText>
      <GoalList isMain={true} data={mainGoalData.data.goalResponseDtoList} />
      <NavBar />
      <AddButton handleAddClick={() => navigate('/create')} />
    </Layout>
  );
};

export default MainPage;
