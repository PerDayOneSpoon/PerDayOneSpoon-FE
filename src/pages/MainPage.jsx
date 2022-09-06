import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import GoalList from '../components/goal/GoalList';
import NavBar from '../components/global/NavBar';
import Graph from '../components/Graph';

const MainPage = () => {
  return (
    <Layout hasNavBar={true}>
      <Header icon={'create'} />
      <Graph />
      <GoalList isMain={true} />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
