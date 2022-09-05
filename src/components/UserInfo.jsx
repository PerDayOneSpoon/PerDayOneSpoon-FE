import styled from 'styled-components';

const UserInfo = ({ isMypage, user }) => {
  if (isMypage) {
    return (
      <Container>
        <ProfileImgContainer>
          <ProfileImg />
        </ProfileImgContainer>
        <UserName>{user.name}</UserName>
        <UserStatus>{user.status}</UserStatus>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileImgContainer>
        <ProfileImg />
      </ProfileImgContainer>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProfileImgContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
`;
const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
`;
const UserName = styled.div`
  margin-bottom: 8px;
`;
const UserStatus = styled.div``;
