import styled from 'styled-components';
import Friend from './Friend';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { colors } from '../../theme/theme';

const FriendsList = ({ peopleList, handleUserClick }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <Container ref={scrollRef}>
      {peopleList?.map((person, i) => (
        <Friend
          key={person.id}
          person={person}
          handleUserClick={() => {
            handleUserClick(person.id);
          }}
        />
      ))}
    </Container>
  );
};

export default FriendsList;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px 24px;
  overflow-x: scroll;
  background-color: ${colors.white};
  margin-left: -16px;
  margin-right: -16px;

  -ms-overflow-style: none;
  scrollbar-width: 1px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
