import styled from 'styled-components';
import Goal from './Goal';
import CalendarGoal from './CalendarGoal';
import GoalEmpty from './GoalEmpty';
import Modal from '../global/Modal';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/common';
import { useMutation, useQueryClient } from 'react-query';
import { goalApi } from '../../api/goalApi';
import { goalTimeId, isStartState } from '../../recoil/goal';

const GoalList = ({ isMain, data, isMe }) => {
  const queryClient = useQueryClient();

  const [modal, setModal] = useRecoilState(modalState);
  const [modalText, setModalText] = useState('');
  const [deleteItem, setDeleteItem] = useState('');
  const [kindOfModal, setKindOfModal] = useState('');
  const [initClickId, setInitClickId] = useState(0);
  const [clickedId, setClickedId] = useRecoilState(goalTimeId);
  const [isStart, setIsStart] = useRecoilState(isStartState);

  const deleteGoalMutation = useMutation(goalApi.deleteGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['myCalendar']);
      queryClient.invalidateQueries(['goalInfo']);
      queryClient.invalidateQueries(['peopleSearchDate']);
      queryClient.invalidateQueries(['peopleSearchMonth']);
      queryClient.invalidateQueries(['personGoal']);
    },
  });

  /* 습관 체크 안되어 있는데 클릭한 경우 모달 생성 */
  const handleAchiveCheck = () => {
    setModalText('타이머를 완료해 주세요!');
    setModal({ open: true, type: 'alert' });
  };

  /* 습관 삭제 시 모달 생성 */
  const handleGoalDelete = (deleteId) => {
    setKindOfModal('delete');
    setModalText('모든 날짜의 해당 습관이 삭제됩니다. 삭제하시겠습니까?');
    setModal({ open: true, type: 'confirm' });
    setDeleteItem(deleteId);
  };

  /* 삭제 모달 확인 버튼 클릭 */
  const handleDelete = () => {
    setModal({ open: false });
    setClickedId(0);
    deleteGoalMutation.mutate({ goalFlag: deleteItem });
  };

  /* t */
  const handleModalOpen = (id) => {
    setInitClickId(id);
    setKindOfModal('timer');
    setModalText(
      '한 번 시작한 습관은 정지할 수 없으며 페이지를 이동하면 멈춥니다. 타이머를 시작하시겠습니까?'
    );
    setModal({ open: true, type: 'confirm' });
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
              isPlaying={false}
              handleAchiveCheck={() => handleAchiveCheck()}
              handleGoalDelete={(deleteId) => handleGoalDelete(deleteId)}
              handleModalOpen={(id) => handleModalOpen(id)}
              // isStart={isStart}
              clickedId={clickedId}
            />
          ))}
        {modal.open && modal.type === 'confirm' && kindOfModal === 'delete' && (
          <Modal modalText={modalText} handleModalOk={handleDelete} />
        )}
        {modal.open && modal.type === 'confirm' && kindOfModal === 'timer' && (
          <Modal
            modalText={modalText}
            handleModalOk={() => {
              setModal({ open: false });
              setIsStart(true);
              setClickedId(initClickId);
            }}
          />
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
