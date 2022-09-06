import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Goal = ({ isMain }) => {
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
        <Icon onClick={(e) => e.stopPropagation()} />
      </Contents>
      {isMain && isTimer && (
        <TimerContainer>
          <Timer>
            <Time>10:00</Time>
            <ProgressBar />
          </Timer>
          <Button onClick={(e) => e.stopPropagation()}>시작</Button>
        </TimerContainer>
      )}
    </Container>
  );
};

export default Goal;

const slide = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
`;

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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 16px;
  animation: ${slide} 1s 0s;
`;

const Time = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Timer = styled.div`
  width: 100%;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  margin-top: 4px;
  background-color: white;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 50px;
  margin-bottom: -4px;
  margin-left: 16px;
`;
