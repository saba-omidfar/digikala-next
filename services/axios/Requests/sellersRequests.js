import api from "../Configs/config";

export async function fetchProductSellers(productId) {
  const res = await api.get(`/products/${productId}/sellers`);
  return res.data.data;
}
