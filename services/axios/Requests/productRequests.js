import api from "@/services/axios/Configs/config";

export async function addRecentViewedProduct(productId) {
  const res = await api.post(`/product/${productId}/recent-viewed/add`);
  return res.data;
}

export async function removeRecentViewedProduct(productId) {
  const res = await api.post(`/product/${productId}/recent-viewed/remove`);
  return res.data;
}

export async function postComment(productId, comment) {
  const res = await api.post(
    `/rate-review/products/${productId}/submit/`,
    comment,
  );
  return res;
}

export async function updateComment(productId, commentId, comment) {
  const res = await api.patch(`/rate-review/products/${productId}/update/`, {
    ...comment,
    comment_id: commentId,
  });

  return res;
}

export async function removeComment(productId, commentId) {
  const res = await api.delete(`/rate-review/products/${productId}/remove/`, {
    data: {
      comment_id: commentId,
    },
  });

  return res;
}

export async function postQuestion(productId, text) {
  const res = await api.post(`/product/${productId}/questions/add/`, text);
  return res;
}

export async function postAnswer(questionId, body) {
  const res = await api.post(`/questions/${questionId}/answer/add/`, body);

  return res;
}
