import Layout from '../layout/Layout';
import Header from '../components/Header';
import GoalForm from '../components/GoalForm';
import BottomSheetModal from '../components/BottomSheetModal';

const CreatePage = () => {
  return (
    <Layout>
      <Header isTitle={true} title='목표 추가' />
      <GoalForm />
      <BottomSheetModal />
    </Layout>
  );
};

export default CreatePage;
