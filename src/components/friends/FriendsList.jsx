import styled from 'styled-components';
import Friend from './Friend';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { colors } from '../../theme/theme';
import { useRef } from 'react';

const FriendsList = ({ peopleList, handleUserClick }) => {
  const scrollRef = useHorizontalScroll();
  const focusRef = useRef();

  console.log(focusRef.current);

  return (
    <Container ref={scrollRef}>
      {peopleList.map((person) => (
        <Friend
          key={person.id}
          person={person}
          focusRef={focusRef}
          handleUserClick={() => {
            focusRef.current.focus();
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
