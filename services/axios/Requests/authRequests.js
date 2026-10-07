import api from "@/services/axios/Configs/config";

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

export async function loginWithPassword(username, password, guestCartId) {
  const res = await api.post("/auth/login-password", {
    username,
    password,
    guestCartId,
  });

  return res.data;
}

export const checkUsername = async (username) => {
  const res = await api.post("/auth/check-username", {
    username,
  });

  return res.data;
};
