import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalList from '../components/goal/GoalList';
import NavBar from '../components/global/NavBar';
import Graph from '../components/Graph';
import CommonText from '../components/elements/CommonText';
import AddButton from '../components/elements/AddButton';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header title='주간 목표 달성률' bgColor={colors.secondary} />
      <Graph />
      <CommonText isSubtitle1={true} mg='16px 0 4px 0'>
        오늘의 습관
      </CommonText>
      <CommonText isCaption={true} fc={colors.text}>
        2022년 8월 14일
      </CommonText>
      <GoalList isMain={true} />
      <NavBar />
      <AddButton handleAddClick={() => navigate('/create')} />
    </Layout>
  );
};

export default MainPage;
