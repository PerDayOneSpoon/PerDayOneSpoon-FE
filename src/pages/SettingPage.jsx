import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import SetUserInfo from '../components/user/SetUserInfo';
import Loading from '../components/global/Loading';
import { userApi } from '../api/userApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../shared/localStorage';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/common';

const SettingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editUserInfo, setEditUserInfo] = useRecoilState(userInfoState);
  const [file, setFile] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: userInfo,
  } = useQuery(['userInfo'], userApi.getUserInfo, {
    onSuccess: (data) => {
      setEditUserInfo({
        nickname: data.data.nickname,
        status: data.data.status,
      });
    },
    staleTime: 60000,
  });

  const [onlyView, setOnlyView] = useState(true);

  const { isLoading: isUpdateLoading, mutate: updateUserProfileMutation } =
    useMutation(userApi.updateUserProfile, {
      onSuccess: () => {
        queryClient.invalidateQueries('userInfo');
        queryClient.invalidateQueries('myCalendar');
      },
      onError: (error) => {
        console.log('updateUserProfile ERROR', error);
      },
    });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setEditUserInfo({ ...editUserInfo, [name]: value });
  };

  const handleChangeImg = (e) => {
    // const formData = new FormData();
    // formData.append('multipartFile', e.target.files[0]);
    setFile(e.target.files[0]);

    const readerImg = new FileReader();
    readerImg.readAsDataURL(e.target.files[0]);
    readerImg.onload = () => {
      const previewImgUrl = readerImg.result;
      setPreviewImg(previewImgUrl);
    };
  };

  const handleRightButtonClick = (e) => {
    setOnlyView(!onlyView);

    if (e.target.innerText === '저장') {
      const formData = new FormData();

      const newForm = {
        nickname: editUserInfo.nickname,
        status: editUserInfo.status,
      };

      console.log('NEW FORM', newForm);

      formData.append('multipartFile', file);
      formData.append(
        'dto',
        new Blob([JSON.stringify(newForm)], { type: 'application/json' })
      );

      updateUserProfileMutation(formData);
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Layout hasNavBar={false}>
      <Header
        title='프로필 편집'
        hasBack={true}
        handleRightButtonClick={handleRightButtonClick}
        rightButton={onlyView ? '수정' : '저장'}
      />
      <SetUserInfo
        onlyView={onlyView}
        userInfo={userInfo}
        previewImg={previewImg}
        editUserInfo={editUserInfo}
        handleInputChange={handleInputChange}
        handleChangeImg={handleChangeImg}
      />
    </Layout>
  );
};

export default SettingPage;
