import { instance } from '../shared/axios';

export const calendarApi = {
  getCalendar: () => {
    return instance.get('/confirm/calender');
  },
};
