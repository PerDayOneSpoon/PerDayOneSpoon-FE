import { instance } from '../shared/axios';

export const addCommentApi = {
  getBadge: ({ goalId, comment }) => {
    return instance.post(`/create/comment/${goalId}`, {
      content: comment,
    });
  },
};

export const deleteCommentApi = {
  getBadge: ({ goalId }) => {
    return instance.delete(`/delete/comment/${goalId}`);
  },
};
