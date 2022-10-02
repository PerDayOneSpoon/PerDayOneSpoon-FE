import Header from '../components/global/Header';
import Layout from '../layout/Layout';
import Notice from '../components/Notice';

const NoticePage = () => {
  return (
    <Layout hasNavBar={false}>
      <Header title='알림' hasBack={true} />
      <Notice />
    </Layout>
  );
};

export default NoticePage;
