import api from "../Configs/config";

export async function getFeedbacks({ targetId, targetType }) {
  const res = await api.get(`/feedbacks/${targetType}/${targetId}`);
  return res.data;
}

export async function postFeedback({ targetId, targetType, type }) {
  const res = await api.patch(`/feedbacks/${targetType}/${targetId}`, {
    type,
  });
  return res.data.data;
}
