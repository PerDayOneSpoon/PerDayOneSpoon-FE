import styled from 'styled-components';
import { colors } from '../theme/theme';
import CommonText from './elements/CommonText';

const Graph = () => {
  const data = [
    {
      id: 1,
      percentage: '70',
      day: '일',
    },
    {
      id: 2,
      percentage: '100',
      day: '월',
    },
    {
      id: 3,
      percentage: '50',
      day: '화',
    },
    {
      id: 4,
      percentage: '0',
      day: '수',
    },
    {
      id: 5,
      percentage: '100',
      day: '목',
    },
    {
      id: 6,
      percentage: '70',
      day: '금',
    },
    {
      id: 7,
      percentage: '33',
      day: '토',
    },
  ];

  return (
    <Container>
      <CommonText
        isCaption={true}
        mg={'0 0 8px 0'}
        pd={'0 16px'}
        bgColor={colors.secondary}
        fc={colors.text}
      >
        2022년 8월 14일 ~ 2022년 8월 20일
      </CommonText>
      <GraphBox>
        {data.map((list) => (
          <GraphList key={list.id}>
            <GraphBar percentage={list.percentage} />
            <CommonText isCaption={true}>{list.day}</CommonText>
          </GraphList>
        ))}
      </GraphBox>
    </Container>
  );
};

export default Graph;

const Container = styled.div`
  margin-left: -16px;
  margin-right: -16px;
  margin-top: -26px;
  background-color: ${colors.secondary};
  border-radius: 0 0 16px 16px;
  overflow: hidden;

  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.06);
`;

const Date = styled.div`
  /* margin-bottom: 8px; */
`;

const GraphBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.secondary};
  padding: 16px 32px;
`;
const GraphList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GraphBar = styled.div`
  position: relative;
  width: 20px;
  height: 80px;
  background-color: ${colors.white};
  margin-bottom: 8px;
  border-radius: 6px;
  overflow: hidden;

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: ${({ percentage }) => `${percentage}%`};
    background-color: ${colors.primary};
  }
`;
