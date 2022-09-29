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
import { goalTimeId } from '../../recoil/goal';
import { stringToTime } from '../../utils/stringToTime';
import useInterval from '../../hooks/useInterval';
import { goalTimerState } from '../../recoil/goal';

const GoalList = ({ isMain, data, isMe, handleStartCilck }) => {
  const queryClient = useQueryClient();

  const [modal, setModal] = useRecoilState(modalState);
  const [modalText, setModalText] = useState('');
  const [deleteItem, setDeleteItem] = useState('');
  const [kindOfModal, setKindOfModal] = useState('');
  const [initClickId, setInitClickId] = useState(0);
  const [clickedId, setClickedId] = useRecoilState(goalTimeId);

  // const [goalTimer, setGoalTimer] = useRecoilState(goalTimerState);

  const [second, setSecond] = useState(0);

  const deleteGoalMutation = useMutation(goalApi.deleteGoal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['myCalendar']);
      queryClient.invalidateQueries(['goalInfo']);
      queryClient.invalidateQueries(['peopleSearchDate']);
      queryClient.invalidateQueries(['peopleSearchMonth']);
      queryClient.invalidateQueries(['personGoal']);
    },
  });

  const handleAchiveCheck = () => {
    setModalText('타이머를 완료해 주세요!');
    setModal({ open: true, type: 'alert' });
  };

  const handleGoalDelete = (deleteId) => {
    setKindOfModal('delete');
    setModalText('모든 날짜의 해당 습관이 삭제됩니다. 삭제하시겠습니까?');
    setModal({ open: true, type: 'confirm' });
    setDeleteItem(deleteId);
  };

  const handleTimerClick = (id) => {
    setKindOfModal('timer');
    setModalText(
      '시작한 습관은 다른 습관과 동시에 진행할 수 없습니다. 타이머를 시작하시겠습니까?'
    );
    setModal({ open: true, type: 'confirm' });

    setInitClickId(id);

    // const clickData = data.filter((item) => item.id === clickedId);

    // const setLocalData = {
    //   id: clickData[0].id,
    //   totalTime: stringToTime(clickData[0].time),
    //   isDone: clickData[0].achievementCheck,
    //   isPlay: true,
    //   displayTime: stringToTime(clickData[0].time),
    // };

    // localStorage.setItem('timer', JSON.stringify(setLocalData));
  };

  // console.log(goalTimer);

  // useEffect(() => {
  //   setGoalTimer((prev) => {
  //     return {
  //       ...prev,
  //       id: item.id,
  //       displayTime: stringToTime(time),
  //       totalTime: stringToTime(time),
  //       isDone: item.achievementCheck,
  //     };
  //   });
  // }, []);

  const handleDelete = () => {
    setModal({ open: false });
    deleteGoalMutation.mutate({ goalFlag: deleteItem });
  };

  const handleTimerStartCilck = () => {
    const clickData = data.filter((item) => item.id === clickedId);
    const setLocalData = {
      id: clickData[0].id,
      totalTime: stringToTime(clickData[0].time),
      isDone: clickData[0].achievementCheck,
      isPlay: true,
      displayTime: stringToTime(clickData[0].time),
    };
    localStorage.setItem('timer', JSON.stringify(setLocalData));

    // const local = JSON.parse(localStorage.getItem('timer'));
    // const newLocal = { ...local, isPlay: true };
    // localStorage.setItem('timer', JSON.stringify(newLocal));
  };

  // useInterval(JSON.parse(localStorage.getItem('timer'))?.isPlay, second);

  // useEffect(() => {

  //   const timerInterval = setInterval(() => {
  //     play && console.log('실행????????????');
  //   }, 1000);

  //   return () => {
  //     clearInterval(timerInterval);
  //   };
  // }, []);

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
              // handleStartCilck={(id) => {
              //   handleTimerClick(id);
              //   setClickedId(id);
              //   // handleStartCilck()
              // }}
            />
          ))}
        {modal.open && modal.type === 'confirm' && kindOfModal === 'delete' && (
          <Modal modalText={modalText} handleModalOk={handleDelete} />
        )}
        {/* {modal.open && modal.type === 'confirm' && kindOfModal === 'timer' && (
          <Modal
            modalText={modalText}
            handleModalOk={() => {
              setModal({ open: false });
              setClickedId(initClickId);
              handleTimerStartCilck();
            }}
          />
        )} */}
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
