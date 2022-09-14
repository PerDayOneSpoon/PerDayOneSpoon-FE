import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { calendarApi } from '../api/calendarApi';
import { useEffect, useState } from 'react';

const Calendar = () => {
  const data = [];
  const [dateValue, setDateValue] = useState(new Date());

  const [startDateOfMonth, setStartDateOfMonth] = useState('');
  const [endDateOfMonth, setEndtDateOfMonth] = useState('');

  const [month, setMonth] = useState('');

  // console.log('성공????', monthData);

  // const { data: monthData } = useQuery(
  //   'getMonthData',
  //   () =>
  //     calendarApi.getMonthCalendar({
  //       startDate: startDateOfMonth,
  //       endDate: endDateOfMonth,
  //     }),
  //   {
  //     onSuccess: (data) => {
  //       console.log('data?????', data);
  //     },
  //   }
  // );

  // let startDateOfMonth = '';
  // let endDateOfMonth = '';

  // const { data: monthData } = useQuery('getMonthData', calendarApi.getMonthCalendar, {

  // })

  const handleChangeDate = (date) => {
    setDateValue(date);
  };

  const getMonthStartEndDate = (locale, date) => {
    setStartDateOfMonth(dayjs(date).startOf('week').format());
    setEndtDateOfMonth(dayjs(date).endOf('month').endOf('week').format());

    console.log('시작 날짜', startDateOfMonth);
    console.log('끝 날짜', endDateOfMonth);

    return dayjs(date).format('YYYY년 MM월');
  };

  const handleGetStartEndDate = ({ action, activeStartDate, value, view }) => {
    if (view === 'month') {
      setMonth(dayjs(activeStartDate).format('MM'));
    }
  };
  console.log('달!!!', month);

  return (
    <>
      <FriendsList />
      <MonthCalendar
        dateValue={dateValue}
        handleChangeDate={handleChangeDate}
        handleGetStartEndDate={handleGetStartEndDate}
      />
      <CommonText isSubtitle1={true} mg={'16px 0 0 0'}>
        {dayjs(dateValue).format('MM월 DD일')}의 습관
      </CommonText>
      <GoalList data={data} />
    </>
  );
};

export default Calendar;
