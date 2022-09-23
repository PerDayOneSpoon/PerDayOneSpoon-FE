import { instance } from '../shared/axios';

export const calendarApi = {
  getCalendar: () => {
    return instance.get('/confirm/calendar');
  },

  getCalendarDate: ({ calendarDate, memberId }) => {
    return instance.get(
      `/confirm/calendar/member/${calendarDate}?memberId=${memberId}`
    );
  },

  getCalendarMonth: ({ calendarYearAndMonth, memberId }) => {
    return instance.get(
      `/confirm/calendar/month/${calendarYearAndMonth}?memberId=${memberId}`
    );
  },
};

// {calendarYearAndMonth}

// /confirm/calendar/month/{calendarYearAndMonth}?calendarYearAndMonth=2022-05&memberId=62
