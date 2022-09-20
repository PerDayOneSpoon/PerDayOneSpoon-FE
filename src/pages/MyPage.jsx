import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import MyInfo from '../components/MyInfo';
import { colors } from '../theme/theme';

const MyPage = () => {
  return (
    <Layout>
      <Header title='마이페이지' bgColor={colors.white} />
      <MyInfo />
    </Layout>
  );
};

export default MyPage;
