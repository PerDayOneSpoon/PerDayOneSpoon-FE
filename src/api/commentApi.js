import { instance } from '../shared/axios';

export const commentApi = {
  addComment: ({ goalId, content }) => {
    return instance.post(`/create/comment/${goalId}`, {
      content: content,
    });
  },

  deleteComment: ({ commentId }) => {
    return instance.delete(`/delete/comment/${commentId}`);
  },
};
