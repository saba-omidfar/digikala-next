import api from "../Configs/config";

export async function fetchFaq(page = 1, query = "") {
  const res = await api.get(`/faq/?page=${page}&q=${query}`);
  return res.data.data;
}

export async function fetchFaqCategory(categoryId) {
  const res = await api.get(
    `/faq/categories/${categoryId}/?categoryId=${categoryId}`,
  );
  return res.data.data;
}

export async function fetchFaqQuestion(questionId) {
  const res = await api.get(`/faq/questions/${questionId}`);
  return res.data.data;
}
