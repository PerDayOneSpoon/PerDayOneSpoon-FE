import styled from 'styled-components';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { userApi } from '../../api/userApi';
import { colors } from '../../theme/theme';
import CommonText from '../elements/CommonText';

const SetUserInfo = ({
  onlyView,
  userInfo,
  editUserInfo,
  handleInputChange,
}) => {
  const queryClient = useQueryClient();

  const profileImg = useRef();

  const updateUserImgMutation = useMutation(userApi.updateUserImg, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getUserInfo');
    },
  });

  const handleClickImageUpload = () => {
    profileImg.current.click();
  };

  const handleChangeProfile = (e) => {
    const formData = new FormData();
    formData.append('multipartFile', e.target.files[0]);

    updateUserImgMutation.mutate(formData);
  };

  return (
    <Container>
      <Top>
        <ProfileImgContainer>
          <ProfileImg
            src={userInfo.data.profileImage}
            onClick={handleClickImageUpload}
          />
        </ProfileImgContainer>
        <ImgInput type='file' ref={profileImg} onChange={handleChangeProfile} />
        <CommonText isSubtitle1={true}>{userInfo.data.nickname}</CommonText>
        <CommonText isBody2={true}>{userInfo.data.status}</CommonText>
      </Top>
      <Middle>
        <SettingForm>
          <FormLeft>
            <CommonText isSubtitle1={true}>이름</CommonText>
          </FormLeft>
          <InputRight
            type='text'
            value={editUserInfo.nickname}
            name='nickname'
            onChange={handleInputChange}
            disabled={onlyView}
          />
        </SettingForm>
        <SettingForm>
          <FormLeft>상태 메세지</FormLeft>
          <InputRight
            type='text'
            value={editUserInfo.status}
            name='status'
            onChange={handleInputChange}
            disabled={onlyView}
          />
        </SettingForm>
        <SettingForm>
          <FormLeft>검색 코드</FormLeft>
          <FormRight>{userInfo.data.socialCode}</FormRight>
        </SettingForm>
      </Middle>
    </Container>
  );
};

export default SetUserInfo;

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
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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

const InputRight = styled.input`
  width: 100%;
  margin-left: 16px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.border};
  padding: 8px;

  &:disabled {
    color: ${colors.text};
  }
`;

const ImgInput = styled.input`
  display: none;
`;
