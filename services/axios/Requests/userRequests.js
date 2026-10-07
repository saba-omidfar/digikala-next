import api from "@/services/axios/Configs/config";

export async function getProfile() {
  const res = await api.get("/user/profile");

  return res.data;
}

export async function getMe() {
  const guestCartId = localStorage.getItem("guestCartId");

  const res = await api.get("/user/init", {
    params: {
      guestCartId,
    },
  });

  return res.data.data;
}

export async function getGuestId() {
  const existingGuestId = localStorage.getItem("guestCartId");

  if (existingGuestId) {
    return existingGuestId;
  }

  const res = await api.post("/guest/init");

  const guestCartId = res.data.guestCartId;

  localStorage.setItem("guestCartId", guestCartId);

  return guestCartId;
}

export async function saveGuestLocation({ guestCartId, address }) {
  const res = await api.post("/guest/location", {
    guestCartId,
    address,
  });

  return res.data;
}

export async function saveUserLocation(address) {
  const res = await api.post("/profile/address/location", address);

  return res.data;
}

export async function userLogout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function updatePersonalInfo(data) {
  const res = await api.patch("/user/profile/personal-info/update", data);

  return res.data;
}

export async function updateProfile(data) {
  const res = await api.patch("/user/profile/update", data);

  return res.data;
}

// EMAIL

export async function updateEmail(data) {
  const res = await api.patch("/user/profile/email/update", data);

  return res.data;
}

export async function verifyEmail(data) {
  const res = await api.post("/user/profile/email/verify", data);

  return res.data;
}

export async function resendEmailVerification(data) {
  const res = await api.post("/user/profile/email/resend-code", data);

  return res.data;
}

// PHONE

export async function updatePhone(data) {
  const res = await api.patch("/user/profile/phone/update", data);

  return res.data;
}

export async function verifyPhone(data) {
  const res = await api.post("/user/profile/phone/verify", data);

  return res.data;
}

export async function resendPhoneVerification(data) {
  const res = await api.post("/user/profile/phone/resend-code", data);

  return res.data;
}

// FAVORITE PRODUCTS

export async function getFavoriteProducts() {
  const res = await api.get("/profile/favorite-products");
  return res.data.data;
}

export async function deleteAccount() {
  const res = await api.delete("/user/profile/delete");

  return res.data;
}
