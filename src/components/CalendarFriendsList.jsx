import styled from 'styled-components';
import CalendarFriend from './CalendarFriend';

const CalendarFriendsList = () => {
  const frineds = [
    {
      id: 1,
      profile: '이미지',
      name: '친구1',
    },
    {
      id: 2,
      profile: '이미지',
      name: '친구2',
    },
    {
      id: 3,
      profile: '이미지',
      name: '친구3',
    },
    {
      id: 4,
      profile: '이미지',
      name: '친구4',
    },
    {
      id: 5,
      profile: '이미지',
      name: '친구5',
    },
  ];

  return (
    <Container>
      {frineds.map((friend) => (
        <CalendarFriend key={friend.id} friend={friend} />
      ))}
    </Container>
  );
};

export default CalendarFriendsList;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
