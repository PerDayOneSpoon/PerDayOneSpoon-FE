import Layout from '../layout/Layout';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';

const MainPage = () => {
  return (
    <Layout>
      <MonthCalendar />
      <GoalList />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
