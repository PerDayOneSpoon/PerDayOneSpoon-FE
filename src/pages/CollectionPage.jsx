import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import CollectionList from '../components/collection/CollectionList';
import Modal from '../components/global/Modal';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../recoil/common';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navBarState } from '../recoil/common';

const CollectionPage = () => {
  // 뱃지 페이지 준비 중
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const setNavBar = useSetRecoilState(navBarState);

  // const handleModalOk = () => {
  //   navigate('/');
  //   setNavBar('달성');
  //   setModal({ open: false });
  // };

  // useEffect(() => {
  //   setModal({ open: true, type: 'alert' });
  // }, []);

  return (
    <Layout hasNavBar={true}>
      <Header title='뱃지 컬렉션' />
      <CollectionList />
      {/* <Modal
        bgTransparent={false}
        handleModalOk={() => handleModalOk()}
        modalText='뱃지 페이지는 현재 준비 중입니다😀'
      /> */}
    </Layout>
  );
};

export default CollectionPage;
