import styled, { css } from 'styled-components';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useRecoilValue } from 'recoil';
import { calendarUserIdState } from '../../recoil/common';

const Friend = ({ person, handleUserClick }) => {
  const userId = useRecoilValue(calendarUserIdState);

  return (
    <Container onClick={handleUserClick}>
      <ProfileContainer focusUser={person.id === userId}>
        <ProfileImg
          src={person.profileImage}
          focusUser={person.id === userId}
        />
      </ProfileContainer>
      <CommonText isFootnote1={true} fc={colors.gray500}>
        {person.nickname}
      </CommonText>
    </Container>
  );
};

export default Friend;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
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
  box-sizing: border-box;
`;

const ProfileImg = styled.img`
  display: inline-block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;

  ${({ focusUser }) =>
    focusUser
      ? css`
          border: 3px solid ${colors.orange500};
        `
      : css`
          border: 3px solid transparent;
        `}
`;
