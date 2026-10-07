import api from "@/services/axios/Configs/config";

export async function resetPassword(data) {
  const response = await api.post("/user/password/reset", data);

  return response.data;
}
