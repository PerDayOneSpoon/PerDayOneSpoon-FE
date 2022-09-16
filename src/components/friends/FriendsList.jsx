import styled from 'styled-components';
import Friend from './Friend';

const FriendsList = ({ peopleList }) => {
  return (
    <Container>
      {peopleList.map((person) => (
        <Friend key={person.id} person={person} />
      ))}
    </Container>
  );
};

export default FriendsList;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
