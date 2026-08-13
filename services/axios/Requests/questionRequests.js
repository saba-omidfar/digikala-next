import api from "../Configs/config";

export async function postQuestion(productId, question) {
  const res = await api.post(`/questions/${productId}`, question);
  return res;
}

export async function postAnswerQuestion(answer) {
  const res = await api.post(`/questions/answer`, answer);
  return res;
}

export async function getReactionsAnswer({ answerId }) {
  const res = await api.get(`/answer/${answerId}/reactions`);
  return res.data;
}

export async function postReactionAnswer({ answerId, type }) {
  const res = await api.patch(`/answer/${answerId}/reactions`, {
    type,
  });
  return res.data;
}
