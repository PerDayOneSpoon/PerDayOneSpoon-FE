import styled from 'styled-components';
import { colors } from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import CommonText from '../elements/CommonText';
import CommonButton from '../elements/CommonButton';

const UserInfo = ({ userInfo }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ProfileImgContainer>
        <ProfileImg src={userInfo.profileImage} />
      </ProfileImgContainer>
      <ProfileBox>
        <CommonText isCallout={true} fw='600'>
          {userInfo.nickname}
        </CommonText>
        <CommonText isFootnote1={true} fc={colors.gray700} mg='8px 0 16px'>
          {userInfo.status}
        </CommonText>
        <CommonButton
          handleButtonClick={() => {
            navigate('/setting');
          }}
          wd='240px'
          pd='8px 0'
          bdrs='22px'
          fz='15px'
          fw='600'
          bd={`1px solid ${colors.gray300}`}
          bg={colors.white}
          text='프로필 편집'
        />
      </ProfileBox>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 -16px 24px -16px;
  padding: 30px 16px;
  background-color: ${colors.white};
  border-radius: 0 0 16px 16px;
  overflow: hidden;
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.06);
`;

const ProfileBox = styled.div`
  max-width: 260px;
  text-align: center;
  word-break: break-all;
`;

const ProfileImgContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditProfileButton = styled.button`
  color: ${colors.white};
  width: 200px;
  height: 30px;
  border: none;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  border-radius: 6px;
  margin-top: 8px;
  padding: 6px 0;
  background-color: ${colors.primary};
  cursor: pointer;
`;
