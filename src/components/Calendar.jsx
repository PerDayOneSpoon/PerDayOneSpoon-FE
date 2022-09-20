import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import Loading from './global/Loading';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { calendarApi } from '../api/calendarApi';
import { useState } from 'react';
import { friendsApi } from '../api/friendsApi';

const Calendar = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [month, setMonth] = useState('');
  const searchDate = dayjs(dateValue).format('YYYY-MM-DD');
  const [userId, setUserId] = useState('');

  const {
    isLoading,
    isError,
    error,
    data: calendarData,
  } = useQuery(['getGoalInfo', 2], calendarApi.getCalendar, {
    onSuccess: (data) => {
      setUserId(data.data.peopleList[0].id);
    },
    staleTime: Infinity,
  });

  const search = useQuery(
    ['searchUser', searchDate, userId],
    () =>
      calendarApi.getCalendarDate({
        calendarDate: searchDate,
        memberId: Number(userId),
      }),
    {
      onSuccess: () => {},
      staleTime: Infinity,
    }
  );

  const uid = useQuery(
    ['friendGoal', userId],
    () => friendsApi.getFriendGoal(userId),
    {
      enabled: !!userId,
      staleTime: Infinity,
    }
  );

  // console.log('uid data', uid);
  // console.log('userId!!!!!', userId);
  // console.log('searchDate!!!!!', searchDate);

  const handleChangeDate = (date) => {
    setDateValue(date);
  };

  const handleGetMonth = ({ action, activeStartDate, value, view }) => {
    if (view === 'month') {
      setMonth(dayjs(activeStartDate).format('MM'));
    }
  };

  const handleUserClick = (id) => {
    console.log(id, 'user click');
    setUserId(id);
  };

  // console.log('달!!!', month);

  if (isLoading) {
    return <Loading />;
  }

  const { monthCalenderDtoList, peopleList, todayGoalsDtoList, me } =
    calendarData.data;

  return (
    <>
      <FriendsList
        peopleList={peopleList}
        handleUserClick={(id) => handleUserClick(id)}
      />
      <MonthCalendar
        dateValue={dateValue}
        handleChangeDate={handleChangeDate}
        handleGetMonth={handleGetMonth}
        monthCalenderDtoList={
          uid.data === undefined
            ? monthCalenderDtoList
            : uid.data.data.monthCalenderDtoList
        }
      />
      <CommonText isCallout={true} mg={'24px 0 0 0'}>
        {dayjs(dateValue).format('MM월 DD일')}의 습관
      </CommonText>
      {me ? (
        search.data === undefined ? (
          <GoalList isMain={false} data={todayGoalsDtoList} />
        ) : (
          <GoalList isMain={false} data={search.data.data.todayGoalsDtoList} />
        )
      ) : (
        <GoalList isMain={false} data={search.data.data.todayGoalsDtoList} />
      )}
    </>
  );
};

export default Calendar;
