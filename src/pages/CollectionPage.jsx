import Layout from '../layout/Layout';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import UserInfo from '../components/UserInfo';
import CollectionList from '../components/CollectionList';

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
