import api from "../Configs/config";

export async function userLogin() {
  try {
    const res = await api.post("/auth/login");
    return res.data;
  } catch (err) {}
}

export async function userLogout() {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (err) {}
}
