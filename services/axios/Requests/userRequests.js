import api from "../Configs/config";

export async function getMe() {
  try {
    const res = await api.get("/user/init");
    return res.data.user;
  } catch (err) {
    if (err.response?.status === 401) {
      return null;
    }
    throw err;
  }
}

export async function userLogout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function getFavoriteProducts() {
  const res = await api.get("/profile/favorite-products");
  return res.data.data;
}
