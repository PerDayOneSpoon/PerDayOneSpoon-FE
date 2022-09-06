import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconAddCharacter } from '../assets/icons/icon-add-character.svg';
import BottomSheetModal from '../components/BottomSheetModal';
import MonthCalendar from './MonthCalendar';
import { colors } from '../theme/theme';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/modalAtom';

const GoalForm = ({ title_input }) => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleOkClick = () => {
    if (modal.type === 'month') {
      console.log('month ok click');
    }
    if (modal.type === 'time') {
      console.log('time ok click');
    }
  };

  // const handleModalTitle = (type) => {
  //   if (type === 'time') return '시간';

  // };

  return (
    <>
      <Container>
        <Top>
          <IconContainer>
            <IconAddCharacter />
          </IconContainer>
          <InputTitle placeholder='제목' ref={title_input} />
        </Top>
        <Bottom>
          <SetForm>
            <FormLeft>목표일</FormLeft>
            <FormRight onClick={() => setModal({ open: true, type: 'day' })}>
              목표일 설정
            </FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>시작 날짜</FormLeft>
            <FormRight>2022년 08월 31일</FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>종료 날짜</FormLeft>
            <FormRight>2022년 08월 31일</FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>시간 설정</FormLeft>
            <FormRight onClick={() => setModal({ open: true, type: 'time' })}>
              미설정
            </FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>공개 설정</FormLeft>
            <FormRight
              onClick={() => setModal({ open: true, type: 'private' })}
            >
              전체 공개
            </FormRight>
          </SetForm>
          <SetForm></SetForm>
        </Bottom>
      </Container>

      {/* 모달 */}
      <BottomSheetModal
        isHeader={
          modal.type === 'day' || modal.type === 'private' ? false : true
        }
        title={modal.type === 'time' ? '시간' : null}
        handleOkClick={handleOkClick}
      >
        {/* {modal.type === 'month' && <MonthCalendar />} */}
        {modal.type === 'day' && (
          <Lists>
            <List>3일</List>
            <List>7일</List>
          </Lists>
        )}
        {modal.type === 'time' && <div>시간설정 모달</div>}
        {modal.type === 'private' && (
          <Lists>
            <List>전체 공개</List>
            <List>나만 보기</List>
          </Lists>
        )}
      </BottomSheetModal>
    </>
  );
};

export default GoalForm;

const Container = styled.div``;

const Top = styled.div`
  height: 172px;
  background-color: #eee;
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
`;

const InputTitle = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  padding: 4px;
  outline: none;
  background-color: transparent;

  ::placeholder {
    text-align: center;
  }
`;

const Bottom = styled.div``;

const SetForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 32px;
  }
`;

const FormLeft = styled.div``;
const FormRight = styled.div`
  cursor: pointer;
`;

const Lists = styled.ul`
  text-align: center;
  padding-bottom: 24px;
`;

const List = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
`;
