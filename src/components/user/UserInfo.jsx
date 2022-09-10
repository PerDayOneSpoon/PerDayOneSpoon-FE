import styled from 'styled-components';
import { useQuery } from 'react-query';
import { userApi } from '../../api/userApi';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
    return <div>로딩 중..</div>;
  }

  if (isMypage) {
    return (
      <Container>
        <Top>
          <ProfileImgContainer>
            <ProfileImg src={userInfo.data.profileImage} />
          </ProfileImgContainer>
          <div>
            <CommonText isSubtitle1={true}>{userInfo.data.nickname}</CommonText>
            <CommonText isBody2={true}>{userInfo.data.status}</CommonText>
            <EditProfileButton
              onClick={() => {
                navigate('/setting');
              }}
            >
              프로필 편집
            </EditProfileButton>
          </div>
        </Top>
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
  margin: 11px -16px 0;
  display: flex;
  /* align-items: center;
  justify-content: center; */
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 0 0 16px 16px;
  overflow: hidden;

  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.06);
`;

const Top = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const ProfileImgContainer = styled.div`
  width: 96px;
  height: 96px;

  margin: 0 26px 16px 16px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
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
  border-radius: 6px;
  background-color: ${colors.primary};
`;
