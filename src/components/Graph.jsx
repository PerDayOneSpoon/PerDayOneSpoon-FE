import styled from 'styled-components';

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
      <Date>2022년 8월 14일 ~ 2022년 8월 20일</Date>
      <GraphBox>
        {data.map((list) => (
          <GraphList key={list.id}>
            <GraphBar percentage={list.percentage} />
            <Day>{list.day}</Day>
          </GraphList>
        ))}
      </GraphBox>
    </Container>
  );
};

export default Graph;

const Container = styled.div``;

const Date = styled.div`
  margin-bottom: 8px;
`;

const GraphBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #aaa;
  padding: 16px;
  border-radius: 10px;
`;
const GraphList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const GraphBar = styled.div`
  position: relative;
  width: 20px;
  height: 80px;
  background-color: #eee;
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
    background-color: #777;
  }
`;
const Day = styled.div``;
