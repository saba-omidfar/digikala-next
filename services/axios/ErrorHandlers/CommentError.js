import api from "../Configs/config";

export async function fetchComments(productId) {
  const res = await api.get(`/comments/${productId}`);
  return res.data.data;
}

export async function postComment(productId, comment) {
  const res = await api.post(`/comments/${productId}`, comment);
  return res;
}

export async function postReactionComment({ commentId, type }) {
  const res = await api.patch(`/comments/reactions`, { commentId, type });
  return res.data.data;
}
