import FriendsList from '../components/friends/FriendsList';
import MonthCalendar from '../components/MonthCalendar';
import GoalList from '../components/goal/GoalList';
import CommonText from '../components/elements/CommonText';
import Loading from './global/Loading';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { calendarApi } from '../api/calendarApi';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { calendarUserIdState } from '../recoil/common';

const Calendar = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [month, setMonth] = useState(dayjs(new Date()).format('YYYY-MM'));
  const [userId, setUserId] = useRecoilState(calendarUserIdState);
  const searchDate = dayjs(dateValue).format('YYYY-MM-DD');

  const {
    isLoading,
    isError,
    error,
    data: calendarData,
  } = useQuery(['myCalendar'], calendarApi.getCalendar, {
    onSuccess: (data) => {
      setUserId(data.data.peopleList[0].id);
    },
    // refetchOnMount: false,
    // staleTime: Infinity,
  });

  const { isLoading: isDateLoading, data: peopleSearchDate } = useQuery(
    ['peopleSearchDate', searchDate, userId],
    () =>
      calendarApi.getCalendarDate({
        calendarDate: searchDate,
        memberId: Number(userId),
      }),
    {
      // refetchOnMount: false,
      // enabled: false,
      // staleTime: Infinity,
      // keepPreviousData: true,

      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!dateValue,
      keepPreviousData: true,
    }
  );

  const { isLoading: isMonthLoading, data: peopleSearchMonth } = useQuery(
    ['peopleSearchMonth', month, userId],
    () =>
      calendarApi.getCalendarMonth({
        calendarYearAndMonth: month,
        memberId: Number(userId),
      }),
    {
      // refetchOnMount: false,
      // staleTime: Infinity,
      // enabled: !!month,
      // keepPreviousData: true,

      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!month,
      keepPreviousData: true,
    }
  );

  const { isLoading: isPersonGoal, data: personGoal } = useQuery(
    ['personGoal', userId],
    () => calendarApi.getCalendarPersonGoal(userId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
      enabled: false,
      keepPreviousData: true,
    }
  );

  // 캘린더에서 년월 변경
  const handleGetMonth = (view, activeStartDate) => {
    setMonth(dayjs(activeStartDate).format('YYYY-MM'));
  };

  // 캘린더 날짜 변경
  const handleChangeDate = (date) => {
    setDateValue(date);
  };

  // 친구리스트에서 유저 선택
  const handleUserClick = (id) => {
    setUserId(id);
  };

  if (isLoading || isDateLoading || isMonthLoading || isPersonGoal) {
    return <Loading />;
  }

  // const { peopleList } = calendarData.data;

  // console.log('calendarData.data', calendarData.data);
  // console.log('peopleSearchDate', peopleSearchDate);
  // console.log('peopleSearchMonth', peopleSearchMonth);
  // console.log('personGoal', personGoal);

  return (
    <>
      <FriendsList
        peopleList={calendarData?.data?.peopleList}
        handleUserClick={handleUserClick}
      />
      <MonthCalendar
        monthCalenderDtoList={peopleSearchMonth?.data?.monthCalenderDtoList}
        handleChangeDate={handleChangeDate}
        dateValue={dateValue}
        handleGetMonth={({ action, activeStartDate, value, view }) => {
          handleGetMonth(view, activeStartDate);
        }}
      />
      <CommonText isCallout={true} mg={'24px 0 0 0'}>
        {dayjs(dateValue).format('MM월 DD일')}의 습관
      </CommonText>
      <GoalList
        data={peopleSearchDate?.data?.todayGoalsDtoList}
        // isMe={userId === peopleList[0].id ? true : false}
        isMe={peopleSearchDate?.data?.me}
      />
    </>
  );
};

export default Calendar;
