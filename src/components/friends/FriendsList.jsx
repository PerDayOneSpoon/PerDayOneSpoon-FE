import styled from 'styled-components';
import Friend from './Friend';

const FriendsList = () => {
  const frineds = [
    {
      id: 1,
      profile: '이미지',
      name: '나',
    },
    {
      id: 2,
      profile: '이미지',
      name: '친구1',
    },
    {
      id: 3,
      profile: '이미지',
      name: '친구2',
    },
    {
      id: 4,
      profile: '이미지',
      name: '친구3',
    },
    {
      id: 5,
      profile: '이미지',
      name: '친구4',
    },
    {
      id: 6,
      profile: '이미지',
      name: '친구5',
    },
  ];

  return (
    <Container>
      {frineds.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </Container>
  );
};

export default FriendsList;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;