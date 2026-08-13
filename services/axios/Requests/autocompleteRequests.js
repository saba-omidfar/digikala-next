import api from "../Configs/config";

export async function fetchAutocomplete(query = "") {
  const res = await api.get(`/autocomplete/?q=${query}`);
  return res.data.data;
}
