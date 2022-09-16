import styled from 'styled-components';
import Goal from './Goal';
import GoalEmpty from './GoalEmpty';
import { calendarApi } from '../../api/calendarApi';
import { useQuery } from 'react-query';

const GoalList = ({ isMain, data }) => {
  if (data === undefined || data.length === 0) {
    return <GoalEmpty />;
  }

  if (isMain) {
    return (
      <Container>
        {data.map((item) => (
          <Goal key={item.id} item={item} isMain={isMain} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {data.map((item) => (
        <Goal key={item.id} item={item} isMain={isMain} />
      ))}
    </Container>
  );
};

export default GoalList;

const Container = styled.div`
  padding: 16px 0 64px;
`;
