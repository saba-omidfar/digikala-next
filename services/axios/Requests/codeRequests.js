import api from "../Configs/config";

export async function sendCode(username, guestCartId) {
  try {
    const res = await api.post(`/auth/login/sendCode`, {
      username,
      guestCartId,
    });
    return res.data;
  } catch (err) {
    return Promise.reject(err.response?.data || err);
  }
}

export async function verifyCode(username, code, guestCartId) {
  try {
    const res = await api.post(`/auth/login/verifyCode`, {
      username,
      code,
      guestCartId,
    });
    return res.data;
  } catch (err) {
    return Promise.reject(err.response?.data || err);
  }
}
