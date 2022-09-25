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

  getCalendarMonth: (data) => {
    return instance.get(
      `/confirm/calendar/month/${data.calendarYearAndMonth}?memberId=${data.memberId}`
    );
  },

  getCalendarPersonGoal: (userId) => {
    return instance.get(`/confirm/calendar/friend/${userId}`);
  },
};
