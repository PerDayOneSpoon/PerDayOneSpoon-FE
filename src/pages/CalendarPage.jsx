import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import NavBar from '../components/global/NavBar';
import { colors } from '../theme/theme';

const CalendarPage = () => {
  const data = [];

  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header hasIcon={true} icon={'addFriend'} title='캘린더' />
      <FriendsList />
      <MonthCalendar />
      <CommonText isSubtitle1={true} mg={'16px 0 0 0'}>
        09월 09일의 습관
      </CommonText>
      <GoalList data={data} />
      <NavBar />
    </Layout>
  );
};

export default CalendarPage;
