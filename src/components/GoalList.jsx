import styled from 'styled-components';
import { colors } from '../theme/theme';
import Goal from './Goal';

const GoalList = () => {
  const data = [
    { id: 1, title: 'a' },
    { id: 2, title: 'b' },
    { id: 3, title: 'c' },
    { id: 4, title: 'c' },
    { id: 5, title: 'c' },
    { id: 6, title: 'c' },
    { id: 7, title: 'c' },
  ];
  return (
    <Container>
      {data.map((item) => (
        <Goal key={item.id} data={item} />
      ))}
    </Container>
  );
};

export default GoalList;

const Container = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${colors.border};
`;
