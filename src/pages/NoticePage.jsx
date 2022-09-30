import Header from '../components/global/Header';
import Layout from '../layout/Layout';

const NoticePage = () => {
  return (
    <Layout hasNavBar={false}>
      <Header title='알림' hasBack={true} />
    </Layout>
  );
};

export default NoticePage;
