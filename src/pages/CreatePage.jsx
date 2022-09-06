import React from 'react';
import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalForm from '../components/goal/GoalForm';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { goalApi } from '../api/goalApi';

const CreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const title_input = React.useRef();

  const addGoalMutation = useMutation(goalApi.addGoal, {
    onSuccess: () => {
      // queryClient.invalidateQueries('goal_list');
      title_input.current.value = '';
    },
  });

  const onClickAddHandler = () => {
    if (title_input.current.value === '') {
      return;
    }
    const data = {
      title: title_input.current.value,
      start_date: '2020-08-07',
      end_date: '2020-08-07',
      time: '6시간 30분',
      category: 3,
      privateCheck: true,
      characterId: 1,
    };
    addGoalMutation.mutate(data);
    navigate('/');
  };

  return (
    <Layout>
      <Header
        isTitle={true}
        title='목표 추가'
        onClickAddHandler={onClickAddHandler}
      />
      <GoalForm title_input={title_input} />
    </Layout>
  );
};

export default CreatePage;
