import React from 'react';
import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalForm from '../components/goal/GoalForm';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { goalApi } from '../api/goalApi';
import { useRecoilState } from 'recoil';
import { goalState } from '../recoil/common';

const CreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(goalState);

  const addGoalMutation = useMutation(goalApi.addGoal, {
    onSuccess: () => {
      // queryClient.invalidateQueries('goal_list');
      setFormData({
        ...formData,
        title: '',
        category: 3,
        characterId: 0,
        privateCheck: false,
      });
      navigate('/');
    },
    onError: ({ response }) => {
      alert(response.data.errorMessage);
      setFormData({
        ...formData,
        title: '',
        category: 3,
        characterId: 0,
        privateCheck: false,
      });
    },
  });

  const handleOkClick = () => {
    if (formData.title === '' || formData.characterId === 0) {
      return alert('내용을 채워주세요');
    } else {
      addGoalMutation.mutate([formData]);
    }
  };

  return (
    <Layout>
      <Header hasBack={true} title='목표 추가' handleOkClick={handleOkClick} />
      <GoalForm />
    </Layout>
  );
};

export default CreatePage;
