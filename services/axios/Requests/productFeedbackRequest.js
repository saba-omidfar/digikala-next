import api from "../Configs/config";

export const reportProductFeedback = async ({ productId, ...data }) => {
  const res = await api.post(`/product/${productId}/feedback/save/`, data, {
    validateStatus: (status) => {
      return status === 409 || (status >= 200 && status < 300);
    },
  });

  return res.data;
};
