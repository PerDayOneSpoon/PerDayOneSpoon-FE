import Layout from '../layout/Layout';
import Header from '../components/Header';
import GoalForm from '../components/GoalForm';

const CreatePage = () => {
  return (
    <Layout>
      <Header isTitle={true} title='목표 추가' />
      <GoalForm />
    </Layout>
  );
};

export default CreatePage;
