import api from "../Configs/config";

export const reportPriceFeedback = async ({ productId, ...data }) => {
  const res = await api.post(`/product/${productId}/price-feedback/`, data, {
    validateStatus: (status) => {
      return status === 409 || (status >= 200 && status < 300);
    },
  });

  return res.data;
};
