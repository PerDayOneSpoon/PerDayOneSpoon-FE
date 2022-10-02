import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import AddButton from '../components/elements/AddButton';
import Main from '../components/Main';
import { colors } from '../theme/theme';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  realTimeNoticeState,
  welcomeMessageState,
} from '../recoil/realTimeData';
import { useRecoilState } from 'recoil';
import Modal from '../components/global/Modal';
import { modalState } from '../recoil/common';

const MainPage = () => {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useRecoilState(realTimeNoticeState);
  const [welcomeMessage, setWelcomeMessage] =
    useRecoilState(welcomeMessageState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleIconStatus = () => {
    const readTrueData = noticeData.every(({ read }) => read === true);

    if (noticeData.length === 0 || readTrueData) {
      return 'notification';
    } else {
      return 'notificationAlram';
    }
  };

  useEffect(() => {
    if (welcomeMessage !== '') {
      setModal({ open: true, type: 'alert' });
    }
  }, [welcomeMessage]);

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header
        title='주간 습관 달성률'
        bgColor={colors.secondary}
        hasIcon={true}
        icon={handleIconStatus()}
      />
      <Main />
      <AddButton handleAddClick={() => navigate('/create')} />
      {modal.open && modal.type === 'alert' && welcomeMessage !== '' && (
        <Modal
          modalText={welcomeMessage}
          handleModalOk={() => {
            setModal({ open: false });
            setWelcomeMessage('');
          }}
        />
      )}
    </Layout>
  );
};

export default MainPage;
