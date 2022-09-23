import styled from 'styled-components';
import Friend from './Friend';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { colors } from '../../theme/theme';
import React, { useRef, createRef } from 'react';

const FriendsList = ({ peopleList, handleUserClick }) => {
  const scrollRef = useHorizontalScroll();

  const focusRefs = useRef(peopleList.map(() => createRef()));

  // const focusRefs = Array.from({ length: peopleList.length }, () =>
  //   createRef()
  // );

  // const addRefs = (el) => {
  //   if (el && !focusRefs.current.includes(el)) {
  //     focusRefs.current.push(el);
  //   }
  //   console.log(focusRefs.current);
  // };

  // const fixMyRef = () =>
  //   myRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //     inline: 'nearest',
  //   });

  // useEffect(() => {
  //   fixMyRef();
  // }, []);

  console.log(focusRefs);

  return (
    <Container ref={scrollRef}>
      {peopleList.map((person, i) => (
        // <div key={i} ref={focusRefs.current[i]}>
        //   {console.log(focusRefs.current[i])}
        // </div>
        <Friend
          key={person.id}
          person={person}
          ref={focusRefs.current[i]}
          handleUserClick={() => {
            // focusRefs.current.scrollIntoView({ behavior: 'smooth' });
            // focusRefs.current.forEach((ref) => {
            //   ref.current.scrollIntoView({ behavior: 'smooth' });
            // });
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
