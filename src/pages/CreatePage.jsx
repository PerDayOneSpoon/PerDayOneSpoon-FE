import React from 'react';
import Layout from '../layout/Layout';
import Header from '../components/Header';
import GoalForm from '../components/GoalForm';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const title_input = React.useRef();

  const addGoal = (data) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/create`, data);
  };

  const addGoalMutation = useMutation(addGoal, {
    onSuccess: () => {
      queryClient.invalidateQueries('goal_list');
      title_input.current.value = '';
    },
  });

  const onClickAddHandler = () => {
    if (title_input.current.value === '') {
      return;
    }
    const data = {
      title: title_input.current.value,
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
