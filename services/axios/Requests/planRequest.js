import api from "@/services/axios/Configs/config";

export async function fetchPlans() {
  const res = await api.get(`/plans`);
  return res.data.data;
}
