import { useState } from 'react';
import styled from 'styled-components';

const Goal = () => {
  const [isTimer, setIsTimer] = useState(false);

  return (
    <Container onClick={() => setIsTimer(!isTimer)}>
      <Contents>
        <RightContent>
          <Chracter />
          <div>
            <Title>목표이름</Title>
            <Period>시작날짜 - 끝나는 날짜</Period>
          </div>
        </RightContent>
        <Icon />
      </Contents>
      {isTimer && (
        <TimerContainer>
          <Time>10:00</Time>
          <Timer>
            <ProgressBar />
            <Button>시작</Button>
          </Timer>
        </TimerContainer>
      )}
    </Container>
  );
};

export default Goal;

const Container = styled.div`
  border-radius: 10px;
  padding: 16px;
  background-color: orange;
  cursor: pointer;

  & + & {
    margin-top: 16px;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RightContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const Chracter = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: white;
  margin-right: 6px;
`;
const Title = styled.p`
  line-height: 24px;
`;
const Period = styled.p`
  line-height: 20px;
`;
const Icon = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`;

const TimerContainer = styled.div`
  margin-top: 16px;
`;

const Time = styled.div``;

const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  margin-top: 4px;
  background-color: white;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 50px;
  margin-left: 16px;
`;
