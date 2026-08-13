import api from "../Configs/config";

export const reportComment = async ({ commentId }) => {
  const res = await api.post(`/comments/${commentId}/report/`);
  return res;
};
