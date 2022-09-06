import styled from 'styled-components';
import { colors } from '../../theme/theme';
import Goal from './Goal';
import GoalEmpty from './GoalEmpty';
import { goalApi } from '../../api/goalApi';

const GoalList = ({ isMain }) => {
  // const Goals = useQuery('goal_list', goalApi.getGoal, {
  //   onSuccess: (data) => {
  //     console.log('성공했어!!!!', data);
  //   },
  // });

  const data = [
    { id: 1, title: 'a' },
    { id: 2, title: 'b' },
    { id: 3, title: 'c' },
    { id: 4, title: 'c' },
    { id: 5, title: 'c' },
  ];

  if (data.length === 0) {
    return <GoalEmpty />;
  }

  return (
    <Container>
      {data.map((item) => (
        <Goal key={item.id} data={item} isMain={isMain} />
      ))}
    </Container>
  );
};

export default GoalList;

const Container = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${colors.border};
`;
