import Header from '../components/global/Header';
import Layout from '../layout/Layout';
import FollowerList from '../components/friends/FollowerList';

const FollowerListPage = () => {
  return (
    <Layout hasNavBar={false}>
      <Header hasBack={true} title='팔로워 목록' />
      <FollowerList />
    </Layout>
  );
};

export default FollowerListPage;
