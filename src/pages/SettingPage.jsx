import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import SetUserInfo from '../components/user/SetUserInfo';

const SettingPage = () => {
  return (
    <Layout>
      <Header title='?' />
      <SetUserInfo isSettingPage={true} />
      <NavBar />
    </Layout>
  );
};

export default SettingPage;
