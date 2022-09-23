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

  const { isLoading: searchDateLoading, data: getSearchDate } = useQuery(
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
    ['monthSearch', month, userId],
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

  if (searchDateLoading) {
    return <Loading />;
  }

  const { monthCalenderDtoList, peopleList, todayGoalsDtoList, me } =
    calendarData.data;

  // const testObj = [
  //   {
  //     id: 62,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 61,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 60,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 59,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 58,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 57,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 56,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 55,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 54,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 53,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 52,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 51,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  //   {
  //     id: 40,
  //     nickname: '소연123456',
  //     profileImage:
  //       'https://perday-onespoon.s3.ap-northeast-2.amazonaws.com/8135a4a0-a838-4570-9ffe-729afd1300c1test.jpg',
  //     socialId: null,
  //     status: null,
  //   },
  // ];

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
