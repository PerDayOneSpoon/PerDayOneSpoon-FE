import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import SetUserInfo from '../components/user/SetUserInfo';

const SettingPage = () => {
  const handleRightButtonClick = () => {
    console.log('click!!!');
  };

  return (
    <Layout>
      <Header
        title='프로필 편집'
        hasBack={true}
        handleRightButtonClick={handleRightButtonClick}
        rightButton='수정'
      />
      <SetUserInfo isSettingPage={true} />
      <NavBar />
    </Layout>
  );
};

export default SettingPage;
