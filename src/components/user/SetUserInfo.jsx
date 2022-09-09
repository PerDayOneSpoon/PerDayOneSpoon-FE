import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { userApi } from '../../api/userApi';
import { colors } from '../../theme/theme';
import { useState, useRef } from 'react';
import CommonText from '../elements/CommonText';

const SetUserInfo = ({ isSettingPage }) => {
  const queryClient = useQueryClient();

  const [onlyView, setOnlyView] = useState(true);

  const profileImg = useRef();
  const nicknameRevised_input = useRef('');
  const statusRevised_input = useRef('');

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

  const updateUserStatusMutation = useMutation(userApi.updateUserStatus, {
    onSuccess: (data) => {
      console.log('UPDATE USER INFO', data);
      queryClient.invalidateQueries('getUserInfo');
    },
  });

  // const updateUserImgMutation = useMutation(userApi.updateUserImg, {
  //   onSuccess: (data) => {
  //     console.log('UPDATE USER IMG', data);
  //     queryClient.invalidateQueries('getUserInfo');
  //   },
  // });

  const onCickImageUpload = () => {
    profileImg.current.click();
  };

  const updateProfile = (e) => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    console.log(profileImg.current.files[0]);
    updateUserStatusMutation.mutate(e);
  };

  if (isLoading) {
    return <div>로딩 중..</div>;
  }

  if (isSettingPage) {
    return (
      <Container>
        <Top>
          <ProfileImgContainer>
            <ProfileImg
              src={userInfo.data.profileImage}
              onClick={onCickImageUpload}
            />
          </ProfileImgContainer>
          <input
            type='file'
            ref={profileImg}
            onChange={updateProfile}
            style={{ display: 'none' }}
          />
          <Status>{userInfo.data.status}</Status>
        </Top>
        <Middle>
          <SettingForm>
            <FormLeft>
              <CommonText isSubtitle1={true}>이름</CommonText>
            </FormLeft>
            <InputRight
              type='text'
              defaultValue={userInfo.data.nickname}
              name='nickname'
              disabled={onlyView}
              ref={nicknameRevised_input}
            />
          </SettingForm>
          <SettingForm>
            <FormLeft>상태 메세지</FormLeft>
            <InputRight
              type='text'
              defaultValue={userInfo.data.status}
              name='status'
              ref={statusRevised_input}
              disabled={onlyView}
            />
          </SettingForm>
          <SettingForm>
            <FormLeft>개인 코드</FormLeft>
            <FormRight>{userInfo.data.socialCode}</FormRight>
          </SettingForm>
          {onlyView ? (
            <button
              onClick={() => {
                setOnlyView(!onlyView);
              }}
            >
              수정
            </button>
          ) : (
            <button
              onClick={() => {
                const data = {
                  nickname: nicknameRevised_input.current.value,
                  status: statusRevised_input.current.value,
                };
                updateUserStatusMutation.mutate(data);
                setOnlyView(!onlyView);
              }}
            >
              저장
            </button>
          )}
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

const Status = styled.div``;
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
  opacity: 0.3;
  border-bottom: 1px solid ${colors.border};
  padding: 8px 0;
`;
