import api from "../Configs/config";

// export async function postNotifications({ productId, channels }) {
//   const res = await api.post(`/notifications/amazing`, {
//     productId,
//     channels,
//   });
//   return res.data;
// }

// export async function getNotificationStatus({ productId }) {
//   const res = await api.get(`/notifications/status`, {
//     params: {
//       productId,
//     },
//   });

//   return res.data;
// }

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
  const res = await api.get(`/product/${productId}/observe/status`);

  return res.data;
}
