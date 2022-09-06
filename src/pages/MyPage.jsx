import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import UserInfo from '../components/user/UserInfo';
import Setting from '../components/user/Setting';

const MyPage = () => {
  return (
    <Layout>
      <Header icon={'setting'} />
      <UserInfo isMypage={true} />
      <Setting />
      <NavBar />
    </Layout>
  );
};

export default MyPage;
