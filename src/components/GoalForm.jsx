import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconAddCharacter } from '../assets/icons/icon-add-character.svg';
import BottomSheetModal from '../components/BottomSheetModal';
import MonthCalendar from './MonthCalendar';
import { colors } from '../theme/theme';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/modalAtom';

const GoalForm = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <>
      <Container>
        <Top>
          <IconContainer>
            <IconAddCharacter />
          </IconContainer>
          <InputTitle placeholder='제목' />
        </Top>
        <Bottom>
          <SetForm>
            <FormLeft>목표일</FormLeft>
            <FormRight>목표일 설정</FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>시작 날짜</FormLeft>
            <FormRight onClick={() => setIsOpen(true)}>
              2022년 08월 31일
            </FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>종료 날짜</FormLeft>
            <FormRight>2022년 08월 31일</FormRight>
          </SetForm>
          <SetForm>
            <FormLeft>시간 설정</FormLeft>
            <FormRight>미설정</FormRight>
          </SetForm>
        </Bottom>
      </Container>

      {/* 목표일 설정 모달 */}
      {/* <BottomSheetModal handleModalClose={handleModalClose}>
        <Days>
          <Day>3일</Day>
          <Day>7일</Day>
        </Days>
      </BottomSheetModal> */}

      {/* 날짜 설정 모달 */}
      <BottomSheetModal isHeader={true} headerTitle='날짜'>
        <MonthCalendar />
      </BottomSheetModal>

      {/* 시간 설정 모달 */}
      {/* <BottomSheetModal></BottomSheetModal> */}
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

const Days = styled.ul`
  text-align: center;
  padding-bottom: 24px;
`;

const Day = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
`;
