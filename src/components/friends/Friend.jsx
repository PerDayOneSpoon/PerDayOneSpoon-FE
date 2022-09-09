import styled from 'styled-components';
import CommonText from '../elements/CommonText';

const Friend = ({ friend }) => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImg />
      </ProfileContainer>
      <CommonText isCaption={true}>{friend.name}</CommonText>
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  margin-bottom: 8px;
`;
const ProfileImg = styled.div``;
