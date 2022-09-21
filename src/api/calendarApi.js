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

  getCalendarMonth: ({ calendarMonth, memberId }) => {
    return instance.get(
      `/confirm/calendar/month/${calendarMonth}?memberId=${memberId}`
    );
  },
};
