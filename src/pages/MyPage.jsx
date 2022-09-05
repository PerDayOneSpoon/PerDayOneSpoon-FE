import Layout from '../layout/Layout';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import UserInfo from '../components/UserInfo';

const MyPage = () => {
  const user = {
    profile: '프로필 이미지',
    name: '홍길동',
    status: '습관 만들기!',
  };

  return (
    <Layout>
      <Header />
      <UserInfo isMypage={true} user={user} />
      <NavBar />
    </Layout>
  );
};

export default MyPage;
