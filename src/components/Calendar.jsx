import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import Loading from './global/Loading';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { calendarApi } from '../api/calendarApi';
import { useEffect, useState } from 'react';
import { friendsApi } from '../api/friendsApi';
import { useRecoilState } from 'recoil';
import { calendarUserIdState } from '../recoil/common';

const Calendar = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [month, setMonth] = useState('');
  const searchDate = dayjs(dateValue).format('YYYY-MM-DD');
  const [userId, setUserId] = useRecoilState(calendarUserIdState);

  const {
    isLoading,
    isError,
    error,
    data: calendarData,
  } = useQuery(['myCalendar'], calendarApi.getCalendar, {
    onSuccess: (data) => {
      setUserId(data.data.peopleList[0].id);
    },
  });

  const {
    isLoading: searchDateLoading,
    isFetching: searchDateFetching,
    data: getSearchDate,
  } = useQuery(
    ['friendDateSearch', searchDate, userId],
    () =>
      calendarApi.getCalendarDate({
        calendarDate: searchDate,
        memberId: Number(userId),
      }),
    {
      onSuccess: () => {},
      enabled: !!dateValue,
      staleTime: Infinity,
    }
  );

  const getSearchMonth = useQuery(
    ['friendDateSearch', month, userId],
    () =>
      calendarApi.getCalendarMonth({
        calendarMonth: month,
        memberId: Number(userId),
      }),
    {
      onSuccess: () => {},
      enabled: !!month,
      staleTime: Infinity,
    }
  );

  const getUserData = useQuery(
    ['friendGoal', userId],
    () => friendsApi.getFriendGoal(userId),
    {
      enabled: !!userId,
      staleTime: Infinity,
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

  const handleUserClick = (id) => {
    setUserId(id);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (searchDateLoading || searchDateFetching) {
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
          getUserData.data === undefined
            ? monthCalenderDtoList
            : getSearchMonth.data === undefined
            ? getUserData.data.data.monthCalenderDtoList
            : getSearchMonth.data.data.monthCalenderDtoList
        }
      />
      <CommonText isCallout={true} mg={'24px 0 0 0'}>
        {dayjs(dateValue).format('MM월 DD일')}의 습관
      </CommonText>
      {me ? (
        getSearchDate === undefined ? (
          <GoalList
            isMain={false}
            data={todayGoalsDtoList}
            isMe={getUserData?.data?.data.me}
          />
        ) : (
          <GoalList
            isMain={false}
            data={getSearchDate.data.todayGoalsDtoList}
            isMe={getUserData?.data?.data.me}
          />
        )
      ) : (
        <GoalList
          isMain={false}
          data={getSearchDate.data.data.todayGoalsDtoList}
        />
      )}
    </>
  );
};

export default Calendar;
