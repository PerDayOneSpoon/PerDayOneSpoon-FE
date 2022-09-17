import styled from 'styled-components';
import Friend from './Friend';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const FriendsList = ({ peopleList }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <Container ref={scrollRef}>
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
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: 1px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
