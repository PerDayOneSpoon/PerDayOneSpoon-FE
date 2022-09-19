import styled from 'styled-components';
import Goal from './Goal';
import CalendarGoal from './CalendarGoal';
import GoalEmpty from './GoalEmpty';

const GoalList = ({ isMain, data }) => {
  if (data === undefined || data.length === 0) {
    return <GoalEmpty />;
  }

  if (isMain) {
    return (
      <Container>
        {data.map((item) => (
          <Goal key={item.id} item={item} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {data.map((item) => (
        <CalendarGoal key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default GoalList;

const Container = styled.div`
  padding: 24px 0;
`;
