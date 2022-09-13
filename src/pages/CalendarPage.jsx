import Layout from '../layout/Layout';
import Header from '../components/global/Header';
import Calendar from '../components/Calendar';
import NavBar from '../components/global/NavBar';
import { colors } from '../theme/theme';

const CalendarPage = () => {
  return (
    <Layout hasNavBar={true} bgColor={colors.bgColor}>
      <Header hasIcon={true} icon={'addFriend'} title='캘린더' />
      <Calendar />
      <NavBar />
    </Layout>
  );
};

export default CalendarPage;
