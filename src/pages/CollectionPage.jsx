import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import CollectionList from '../components/collection/CollectionList';

const CollectionPage = () => {
  return (
    <Layout hasNavBar={true}>
      <Header title='뱃지 컬렉션' />
      <CollectionList />
    </Layout>
  );
};

export default CollectionPage;
