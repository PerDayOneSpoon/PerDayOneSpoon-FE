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
import ToastModal from '../components/global/ToastModal';

const SettingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editUserInfo, setEditUserInfo] = useRecoilState(userInfoState);
  const [file, setFile] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const [onlyView, setOnlyView] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toast, setToast] = useState(true);

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
      onSettled: () => {
        queryClient.invalidateQueries(['userInfo']);
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
    if (e.target.innerText === '수정') {
      setOnlyView(false);
    }

    if (e.target.innerText === '저장') {
      const newForm = {
        nickname: editUserInfo.nickname,
        status: editUserInfo.status,
      };

      if (newForm.nickname.length === 0) {
        setToast(false);
        setToastMessage('이름을 설정해 주세요');
        setTimeout(() => setToast(true), 3000);
      } else if (newForm.nickname.length > 8) {
        setToast(false);
        setToastMessage('이름은 8자 이하만 가능합니다');
        setTimeout(() => setToast(true), 3000);
      } else if (newForm.status?.length > 50) {
        setToast(false);
        setToastMessage('상태메시지는 50자 이하로 작성해 주세요');
        setTimeout(() => setToast(true), 3000);
      } else {
        setOnlyView(true);
        const formData = new FormData();

        formData.append('multipartFile', file);
        formData.append(
          'dto',
          new Blob([JSON.stringify(newForm)], { type: 'application/json' })
        );

        updateUserProfileMutation(formData);
      }
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  if (isLoading || isUpdateLoading || isFetching) {
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
      {toastMessage !== '' ? (
        <ToastModal toastMessage={toastMessage} displayNone={toast} />
      ) : null}
    </Layout>
  );
};

export default SettingPage;
