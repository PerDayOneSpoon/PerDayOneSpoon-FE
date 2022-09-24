import styled from 'styled-components';
import Friend from './Friend';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { colors } from '../../theme/theme';
import React, { useRef, createRef } from 'react';

const FriendsList = ({ peopleList, handleUserClick }) => {
  const scrollRef = useHorizontalScroll();

  const focusRefs = useRef(peopleList.map(() => createRef()));

  return (
    <Container ref={scrollRef}>
      {peopleList.map((person, i) => (
        <Friend
          key={person.id}
          person={person}
          handleUserClick={() => {
            handleUserClick(person.id);
          }}
        />
      ))}
      {/* <div ref={myRef} /> */}
    </Container>
  );
};

export default React.memo(FriendsList);

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
