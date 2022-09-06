import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { userApi } from '../../api/userApi';
import { colors } from '../../theme/theme';

const UserInfo = ({ isMypage }) => {
  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery('getUserInfo', userApi.getUserInfo, {
    onSuccess: (data) => {
      console.log('user정보', data);
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
          <ChangingText>프로필사진바꾸기</ChangingText>
          <Statue>{userInfo.data.status}</Statue>
        </Top>
        <Middle>
          <SettingForm>
            <FormLeft>이름</FormLeft>
            <FormRight>{userInfo.data.nickname}</FormRight>
          </SettingForm>
          <SettingForm>
            <FormLeft>상태 메세지</FormLeft>
            <FormRight>{userInfo.data.status}</FormRight>
          </SettingForm>
          <SettingForm>
            <FormLeft>검색 코드</FormLeft>
            <FormRight>{userInfo.data.socialCode}</FormRight>
          </SettingForm>
        </Middle>
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
const Top = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`;
const ProfileImgContainer = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChangingText = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 4px;
  font-size: 16px;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
`;

const Statue = styled.div``;
const Middle = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.border};
  padding-top: 24px;
`;

const SettingForm = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 24px;
  }
`;

const FormLeft = styled.div`
  min-width: 90px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

const FormRight = styled.div`
  width: 100%;
  margin-left: 16px;
  opacity: 0.3;
  border-bottom: 1px solid ${colors.border};
  padding: 8px 0;
`;
