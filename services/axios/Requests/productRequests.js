import api from "../Configs/config";

export async function addIncredibleNotification({
  productId,
  send_sms,
  send_email,
  send_notification,
}) {
  const res = await api.post(`/product/${productId}/observe/add`, {
    send_sms,
    send_email,
    send_notification,
  });

  return res.data;
}

export async function removeIncredibleNotification(productId) {
  const res = await api.post(`/product/${productId}/observe/remove`);

  return res.data;
}

export async function getIncredibleNotificationStatus({ productId }) {
  const res = await api.get(`/product/${productId}/observe/status`, {
    data: {
      productId,
    },
  });

  return res.data;
}

export async function addFavorite({ productId }) {
  const res = await api.post(`/product/${productId}/favorite/add`, {
    productId,
  });

  return res.data;
}

export async function removeFavorite(productId) {
  const res = await api.post(`/product/${productId}/favorite/remove`);

  return res.data;
}

export async function getFavoriteStatus({ productId }) {
  const res = await api.get(`/product/${productId}/favorite/status`, {
    data: {
      productId,
    },
  });

  return res.data;
}

export async function addToRecentViewed({ productId }) {
  const res = await api.post(`/product/${productId}/recent-viewed/add`);
  return res.data;
}

export async function getRecentViewed() {
  const res = await api.get("/products/recent-viewed");
  return res.data.data;
}

export async function postComment(productId, comment) {
  const res = await api.post(
    `/rate-review/products/${productId}/submit/`,
    comment,
  );
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
