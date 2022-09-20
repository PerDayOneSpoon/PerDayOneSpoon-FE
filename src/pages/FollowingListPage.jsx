import Header from '../components/global/Header';
import Layout from '../layout/Layout';
import FollowingList from '../components/friends/FollowingList';

const FollowingListPage = () => {
  return (
    <Layout hasNavBar={false}>
      <Header hasBack={true} title='팔로잉 목록' />
      <FollowingList />
    </Layout>
  );
};

export default FollowingListPage;
