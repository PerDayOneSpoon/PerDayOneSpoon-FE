import styled from 'styled-components';
import Friend from './Friend';

const FriendsList = () => {
  const frineds = [
    {
      id: 1,
      profileImage: '이미지',
      nickname: '나',
    },
    {
      id: 2,
      profileImage: '이미지',
      nickname: '친구1',
    },
    {
      id: 3,
      profileImage: '이미지',
      nickname: '친구2',
    },
    {
      id: 4,
      profileImage: '이미지',
      nickname: '친구3',
    },
    {
      id: 5,
      profileImage: '이미지',
      nickname: '친구4',
    },
    {
      id: 6,
      profileImage: '이미지',
      nickname: '친구5',
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
