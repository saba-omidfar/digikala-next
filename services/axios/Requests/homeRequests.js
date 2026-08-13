import api from "../Configs/config";

export async function fetchIndexPage() {
  const res = await api.get(`/home`);
  return res.data.data;
}

export async function fetchBannersHomeZoneSlider() {
  const res = await api.get(`/home/banners-home-zone-slider`);
  return res.data.data;
}

export async function fetchDeepLinks() {
  const res = await api.get(`/home/deep-links`);
  return res.data.data;
}

export async function fetchBannersHomeZoneTop() {
  const res = await api.get(`/home/banners-home-zone-top`);
  return res.data.data;
}

export async function fetchBannersHomeZoneTopSecond() {
  const res = await api.get(`/home/banners-home-zone-top-second`);
  return res.data.data;
}

export async function fetchBannersHomeZoneMiddle() {
  const res = await api.get(`/home/banners-home-zone-middle`);
  return res.data.data;
}

export async function fetchBannersHomeZoneMiddleThird() {
  const res = await api.get(`/home/banners-home-zone-middle-third`);
  return res.data.data;
}

export async function fetchBannersHomeZoneBottom() {
  const res = await api.get(`/home/banners_home_web_zone_bottom`);
  return res.data.data;
}

export async function fetchMagazinNews() {
  const res = await api.get(`/home/`);
  return res.data.data;
}
