import Layout from '../layout/Layout';
import Header from '../components/Header';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';
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
