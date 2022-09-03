import styled from 'styled-components';
import { ReactComponent as IconAddCharacter } from '../assets/icons/icon-add-character.svg';

const GoalForm = () => {
  return (
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
          <FormRight>2022년 08월 31일</FormRight>
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
