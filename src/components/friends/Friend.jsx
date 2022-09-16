import styled from 'styled-components';
import CommonText from '../elements/CommonText';

const Friend = ({ person }) => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImg src={person.profileImage} />
      </ProfileContainer>
      <CommonText isCaption={true}>{person.nickname}</CommonText>
    </Container>
  );
};

export default Friend;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  & + & {
    margin-left: 16px;
  }
`;

const ProfileContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 8px;
  overflow: hidden;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
