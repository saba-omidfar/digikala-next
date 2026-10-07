import api from "@/services/axios/Configs/config";

export async function fetchMainCategories() {
  const res = await api.get(`/main-categories`);
  return res.data.data;
}
