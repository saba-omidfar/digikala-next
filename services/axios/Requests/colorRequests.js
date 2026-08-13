import api from "../Configs/config";

export async function getColorPalettes() {
  const res = await api.get(`/color-palettes`);
  return res.data.data;
}
