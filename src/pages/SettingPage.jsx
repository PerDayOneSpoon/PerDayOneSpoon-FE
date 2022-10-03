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
import imageCompression from 'browser-image-compression';

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
        queryClient.invalidateQueries(['userInfo']);
        queryClient.invalidateQueries(['myCalendar']);
        queryClient.invalidateQueries(['peopleSearchDate']);
      },
      onError: (error) => {
        console.log('updateUserProfile ERROR', error);
      },
    });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setEditUserInfo({ ...editUserInfo, [name]: value });
  };

  const handleChangeImg = async (e) => {
    const imageFile = e.target.files[0];

    const acceptImageFiles = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!acceptImageFiles.includes(imageFile.type))
      return alert('지원하지 않는 파일 형식입니다.');

    if (imageFile.size > 11000000)
      return alert('10MB 이하의 이미지만 올릴 수 있습니다.');

    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 3000,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      setFile(compressedFile);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
    } catch (error) {
      alert('이미지를 불러올 수 없습니다.');
    }
  };

  const handleRightButtonClick = (e) => {
    setOnlyView(!onlyView);

    if (e.target.innerText === '저장') {
      const formData = new FormData();

      const newForm = {
        nickname: editUserInfo.nickname,
        status: editUserInfo.status,
      };

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
