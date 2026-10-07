import api from "@/services/axios/Configs/config";

export const reportComment = async ({ commentId }) => {
  const res = await api.post(`/comments/${commentId}/report/`);
  return res;
};
