import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import AddButton from '../components/elements/AddButton';
import Main from '../components/Main';
import LoginLoading from '../components/login/LoginLoading';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const MainPage = ({ handleTimerStartCilck }) => {
  const navigate = useNavigate();

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header title='주간 습관 달성률' bgColor={colors.secondary} />
      <Main handleTimerStartCilck={handleTimerStartCilck} />
      <AddButton handleAddClick={() => navigate('/create')} />
    </Layout>
  );
};

export default MainPage;
