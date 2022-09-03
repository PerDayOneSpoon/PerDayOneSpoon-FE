import Layout from '../layout/Layout';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import UserInfo from '../components/UserInfo';
import CollectionList from '../components/CollectionList';

const CollectionPage = () => {
  const user = {
    profile: '프로필 이미지',
    name: '홍길동',
    status: '습관 만들기!',
  };

  return (
    <Layout hasNavBar={true}>
      <Header />
      <UserInfo isCollection={true} user={user} />
      <CollectionList />
      <NavBar />
    </Layout>
  );
};

export default CollectionPage;
