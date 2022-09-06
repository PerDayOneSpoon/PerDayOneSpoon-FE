import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import NavBar from '../components/global/NavBar';

const Calendar = () => {
  return (
    <Layout hasNavBar={true}>
      <Header icon={'addFriend'} />
      <FriendsList />
      <MonthCalendar isMain={true} />
      <GoalList />
      <NavBar />
    </Layout>
  );
};

export default Calendar;
