import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Header from '../components/Header';
import CalendarFriendsList from '../components/CalendarFriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/GoalList';
import NavBar from '../components/NavBar';

const Calendar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken == null || accessToken === '') {
      navigate('/login');
    }
  }, []);

  return (
    <Layout hasNavBar={true}>
      <Header icon={'addFriend'} />
      <CalendarFriendsList />
      <MonthCalendar isMain={true} />
      <GoalList />
      <NavBar />
    </Layout>
  );
};

export default Calendar;
