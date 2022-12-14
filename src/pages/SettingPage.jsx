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
      return alert('???????????? ?????? ?????? ???????????????.');

    if (imageFile.size > 11000000)
      return alert('10MB ????????? ???????????? ?????? ??? ????????????.');

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
      alert('???????????? ????????? ??? ????????????.');
    }
  };

  const handleRightButtonClick = (e) => {
    if (e.target.innerText === '??????') {
      setOnlyView(false);
    }

    if (e.target.innerText === '??????') {
      const newForm = {
        nickname: editUserInfo.nickname,
        status: editUserInfo.status,
      };

      if (newForm.nickname.length === 0) {
        setToast(false);
        setToastMessage('????????? ????????? ?????????');
        setTimeout(() => setToast(true), 3000);
      } else if (newForm.nickname.length > 8) {
        setToast(false);
        setToastMessage('????????? 8??? ????????? ???????????????');
        setTimeout(() => setToast(true), 3000);
      } else if (newForm.status?.length > 50) {
        setToast(false);
        setToastMessage('?????????????????? 50??? ????????? ????????? ?????????');
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
        title='????????? ??????'
        hasBack={true}
        handleRightButtonClick={handleRightButtonClick}
        rightButton={onlyView ? '??????' : '??????'}
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
