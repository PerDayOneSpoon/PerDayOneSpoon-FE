import { instance } from '../shared/axios';

export const collectionApi = {
  getBadge: () => {
    return instance.get('/confirm/badge');
  },
};
