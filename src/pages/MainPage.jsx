import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import AddButton from '../components/elements/AddButton';
import Main from '../components/Main';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const MainPage = ({ handleStartCilck }) => {
  const navigate = useNavigate();

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header title='주간 습관 달성률' bgColor={colors.secondary} />
      <Main handleStartCilck={handleStartCilck} />
      <AddButton handleAddClick={() => navigate('/create')} />
    </Layout>
  );
};

export default MainPage;
