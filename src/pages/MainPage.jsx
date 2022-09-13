import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import AddButton from '../components/elements/AddButton';
import Main from '../components/Main';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

import char1 from '../assets/imgs/character1.png';
import char2 from '../assets/imgs/character2.png';
import char3 from '../assets/imgs/character3.png';
import char4 from '../assets/imgs/character4.png';
import char5 from '../assets/imgs/character5.png';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header title='주간 습관 달성률' bgColor={colors.secondary} />
      <Main />
      <NavBar />
      <AddButton handleAddClick={() => navigate('/create')} />
    </Layout>
  );
};

export default MainPage;
