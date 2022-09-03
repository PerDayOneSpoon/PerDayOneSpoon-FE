import Layout from '../layout/Layout';
import Header from '../components/Header';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';

const MainPage = () => {
  return (
    <Layout hasNavBar={true}>
      <Header />
      <MonthCalendar />
      <GoalList />
      <NavBar />
    </Layout>
  );
};

export default MainPage;
