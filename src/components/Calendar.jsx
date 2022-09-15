import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import Loading from './global/Loading';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { calendarApi } from '../api/calendarApi';
import { useEffect, useState } from 'react';

const Calendar = () => {
  const data = [];
  const [dateValue, setDateValue] = useState(new Date());
  const [month, setMonth] = useState('');

  const {
    isLoading,
    isError,
    error,
    data: calendarData,
  } = useQuery('getCalendarInfo', calendarApi.getCalendar, {
    onSuccess: () => {},
  });

  const handleChangeDate = (date) => {
    setDateValue(date);
  };

  const handleGetStartEndDate = ({ action, activeStartDate, value, view }) => {
    if (view === 'month') {
      setMonth(dayjs(activeStartDate).format('MM'));
    }
  };

  console.log('달!!!', month);

  if (isLoading) {
    return <Loading />;
  }

  const { monthCalenderDtoList, todayGoalsDtoList } = calendarData.data;

  return (
    <>
      <FriendsList />
      <MonthCalendar
        dateValue={dateValue}
        handleChangeDate={handleChangeDate}
        handleGetStartEndDate={handleGetStartEndDate}
        monthCalenderDtoList={monthCalenderDtoList}
      />
      <CommonText isSubtitle1={true} mg={'16px 0 0 0'}>
        {dayjs(dateValue).format('MM월 DD일')}의 습관
      </CommonText>
      <GoalList data={todayGoalsDtoList} isMain={false} />
    </>
  );
};

export default Calendar;
