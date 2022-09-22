import styled from 'styled-components';
import Goal from './Goal';
import CalendarGoal from './CalendarGoal';
import GoalEmpty from './GoalEmpty';
import Modal from '../global/Modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/common';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';

const GoalList = ({ isMain, data, isMe }) => {
  const queryClient = useQueryClient();

  const [modal, setModal] = useRecoilState(modalState);
  const [modalText, setModalText] = useState('');
  const [deleteItem, setDeleteItem] = useState('');

  const deleteGoalMutation = useMutation(goalApi.deleteGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('goalInfo');
      queryClient.invalidateQueries('friendDateSearch');
      queryClient.invalidateQueries('friendGoal');
    },
  });

  const handleAchiveCheck = () => {
    setModalText('타이머를 완료해 주세요!');
    setModal({ open: true, type: 'alert' });
  };

  const handleGoalDelete = (deleteId) => {
    setModalText('모든 날짜의 해당 습관이 삭제됩니다. 삭제하시겠습니까?');
    setModal({ open: true, type: 'confirm' });
    setDeleteItem(deleteId);
  };

  const handleDelete = () => {
    setModal({ open: false });
    deleteGoalMutation.mutate({ goalFlag: deleteItem });
  };

  if (data === undefined || data.length === 0) {
    return <GoalEmpty />;
  }

  if (isMain) {
    return (
      <Container>
        {data !== undefined &&
          data.map((item) => (
            <Goal
              key={item.id}
              item={item}
              handleAchiveCheck={() => handleAchiveCheck()}
              handleGoalDelete={(deleteId) => handleGoalDelete(deleteId)}
            />
          ))}
        {modal.open && modal.type === 'confirm' && (
          <Modal modalText={modalText} handleModalOk={handleDelete} />
        )}
        {modal.open && modal.type === 'alert' && (
          <Modal
            modalText={modalText}
            handleModalOk={() => setModal({ open: false })}
          />
        )}
      </Container>
    );
  }

  return (
    <Container>
      {data.map((item) => (
        <CalendarGoal key={item.id} item={item} isMe={isMe} />
      ))}
    </Container>
  );
};

export default GoalList;

const Container = styled.div`
  padding: 24px 0;
`;
