import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalList from '../components/goal/GoalList';
import NavBar from '../components/global/NavBar';
import Graph from '../components/Graph';

const MainPage = () => {
  return (
    <Layout hasNavBar={true}>
      <Header title='주간 목표 달성률' isBg={true} />
      <Graph />
      <GoalList isMain={true} />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
