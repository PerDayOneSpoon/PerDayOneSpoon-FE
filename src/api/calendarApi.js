import { instance } from '../shared/axios';

export const calendarApi = {
  getCalendar: () => {
    return instance.get('/confirm/calendar');
  },

  getCalendarDate: ({ calendarDate }) => {
    return instance.get(`/confirm/calendar/${calendarDate}`);
  },
};
