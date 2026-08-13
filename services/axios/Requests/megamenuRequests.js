import api from "../Configs/config";

export async function getMegamenu() {
  const res = await api.get(`/megamenu`);
  return res.data.data;
}

export async function getFreshMegamenu() {
  const res = await api.get(`/fresh/megamenu`);
  return res.data.data;
}
