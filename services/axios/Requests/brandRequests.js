import api from "../Configs/config";

export async function fetchPopularBrands() {
  const res = await api.get("/brands/popular-brands");
  return res.data.data;
}
