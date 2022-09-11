import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import SetUserInfo from '../components/user/SetUserInfo';
import { userApi } from '../api/userApi';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/common';

const SettingPage = () => {
  const queryClient = useQueryClient();
  const [editUserInfo, setEditUserInfo] = useRecoilState(userInfoState);

  const {
    isLoading,
    isError,
    error,
    data: userInfo,
  } = useQuery('getUserInfo', userApi.getUserInfo, {
    onSuccess: (data) => {
      setEditUserInfo({
        ...editUserInfo,
        nickname: data.data.nickname,
        status: data.data.status,
      });
    },
  });

  const [onlyView, setOnlyView] = useState(true);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setEditUserInfo({ ...editUserInfo, [name]: value });
  };

  const handleRightButtonClick = (e) => {
    if (e.target.innerText === '수정') {
      setOnlyView(false);
    }
    if (e.target.innerText === '저장') {
      setOnlyView(true);
      updateUserStatusMutation.mutate(editUserInfo);
    }
  };

  const updateUserStatusMutation = useMutation(userApi.updateUserStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('getUserInfo');
    },
  });

  if (isLoading) {
    return <div>로딩 중..</div>;
  }

  return (
    <Layout>
      <Header
        title='프로필 편집'
        hasBack={true}
        handleRightButtonClick={handleRightButtonClick}
        rightButton={onlyView ? '수정' : '저장'}
      />
      <SetUserInfo
        onlyView={onlyView}
        userInfo={userInfo}
        editUserInfo={editUserInfo}
        handleInputChange={handleInputChange}
      />
      <NavBar />
    </Layout>
  );
};

export default SettingPage;
