import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import UserInfo from '../components/user/UserInfo';
import CollectionList from '../components/collection/CollectionList';

const CollectionPage = () => {
  return (
    <Layout hasNavBar={true}>
      <Header />
      {/* <UserInfo isCollection={true} user={user} /> */}
      <CollectionList />
      <NavBar />
    </Layout>
  );
};

export default CollectionPage;
