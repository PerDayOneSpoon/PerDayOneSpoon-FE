import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import Loading from './global/Loading';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { calendarApi } from '../api/calendarApi';
import { useState } from 'react';

const Calendar = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [month, setMonth] = useState('');
  const searchDate = dayjs(dateValue).format('YYYY-MM-DD');

  const {
    isLoading,
    isError,
    error,
    data: calendarData,
  } = useQuery('getCalendarInfo', calendarApi.getCalendar, {
    onSuccess: () => {},
  });

  const search = useQuery(
    searchDate,
    () => calendarApi.getCalendarDate(searchDate),
    {
      onSuccess: () => {},
    }
  );

  const handleChangeDate = (date) => {
    setDateValue(date);
  };

  const handleGetMonth = ({ action, activeStartDate, value, view }) => {
    if (view === 'month') {
      setMonth(dayjs(activeStartDate).format('MM'));
    }
  };

  // console.log('달!!!', month);

  if (isLoading) {
    return <Loading />;
  }

  const { monthCalenderDtoList, peopleList } = calendarData.data;

  return (
    <>
      <FriendsList peopleList={peopleList} />
      <MonthCalendar
        dateValue={dateValue}
        handleChangeDate={handleChangeDate}
        handleGetMonth={handleGetMonth}
        monthCalenderDtoList={monthCalenderDtoList}
      />
      <CommonText isSubtitle1={true} mg={'16px 0 0 0'}>
        {dayjs(dateValue).format('MM월 DD일')}의 습관
      </CommonText>
      {/* <GoalList data={todayGoalsDtoList} isMain={false} /> */}
      <GoalList data={search?.data?.data} isMain={false} />
    </>
  );
};

export default Calendar;
