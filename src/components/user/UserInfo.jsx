import styled from 'styled-components';
import { useQuery } from 'react-query';
import { userApi } from '../../api/userApi';
import { colors } from '../../theme/theme';
import { useNavigate } from 'react-router-dom';
import CommonText from '../elements/CommonText';
import Loading from '../global/Loading';

const UserInfo = ({ isMypage }) => {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery('getUserInfo', userApi.getUserInfo, {
    onSuccess: (data) => {
      console.log('GET USER INFO', data);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {/* <Top> */}
      <ProfileImgContainer>
        <ProfileImg src={userInfo.data.profileImage} />
      </ProfileImgContainer>
      <ProfileBox>
        <CommonText isSubtitle1={true}>{userInfo.data.nickname}</CommonText>
        <CommonText isBody2={true} mg='8px 0 10px' fc={colors.text}>
          {userInfo.data.status}
        </CommonText>
        <EditProfileButton
          onClick={() => {
            navigate('/setting');
          }}
        >
          프로필 편집
        </EditProfileButton>
      </ProfileBox>
      {/* </Top> */}
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: -16px -16px 24px -16px;
  padding: 30px 16px;
  background-color: ${colors.white};
  border-radius: 0 0 16px 16px;
  overflow: hidden;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.06);
`;

const ProfileBox = styled.div``;

const ProfileImgContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-right: 16px;
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
  width: 202px;
  height: 30px;
  border: none;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  border-radius: 6px;
  padding: 6px 0;
  background-color: ${colors.primary};
  cursor: pointer;
`;
