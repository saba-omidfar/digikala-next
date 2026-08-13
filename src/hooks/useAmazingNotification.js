import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  addIncredibleNotification,
  removeIncredibleNotification,
  getIncredibleNotificationStatus,
} from "@/services/axios/Requests/notificationRequests";

// function useToggleAmazingNotif() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({ productId, channels }) => postNotifications({ productId, channels }),
//     {
//       onSuccess: (res, variables) => {
//         const { productId, channels } = variables;

//         if (res.action === "remove") {
//           queryClient.setQueryData(["AmazingNotifStatus", productId], {
//             isActive: false,
//             channels: {},
//           });
//         }

//         if (res.action === "add") {
//           queryClient.setQueryData(["AmazingNotifStatus", productId], {
//             isActive: true,
//             channels,
//           });
//         }

//         queryClient.invalidateQueries(["AmazingNotifStatus", productId]);
//       },
//     },
//   );
// }

// function useToggleIncredibleNotification() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({ productId, type, send_sms, send_email, send_notification }) =>
//       postIncredibleNotifications({
//         productId,
//         type,
//         send_sms,
//         send_email,
//         send_notification,
//       }),
//     {
//       onSuccess: (res, variables) => {
//         const { productId, type, send_sms, send_email, send_notification } =
//           variables;

//         if (res.action === "add") {
//           queryClient.setQueryData(["IncredibleNotification", productId], {
//             isActive: true,
//             type,
//             send_sms,
//             send_email,
//             send_notification,
//           });
//         }
//       },
//     },
//   );
// }

// function useGetAmazingNotifStatus({ productId }, options = {}) {
//   return useQuery(
//     ["AmazingNotifStatus", productId],
//     () => getNotificationStatus({ productId }),
//     options,
//   );
// }

function useAddIncredibleNotification() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId, send_sms, send_email, send_notification }) =>
      addIncredibleNotification({
        productId,
        send_sms,
        send_email,
        send_notification,
      }),
    {
      onSuccess: (_, variables) => {
        const { productId, send_sms, send_email, send_notification } =
          variables;

        queryClient.setQueryData(["IncredibleNotification", productId], {
          isActive: true,
          send_sms,
          send_email,
          send_notification,
        });

        queryClient.invalidateQueries(["IncredibleNotification", productId]);
      },
    },
  );
}

function useRemoveIncredibleNotification() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId }) => removeIncredibleNotification(productId),
    {
      onSuccess: (_, variables) => {
        const { productId } = variables;

        queryClient.setQueryData(["IncredibleNotification", productId], {
          isActive: false,
          send_sms: false,
          send_email: false,
          send_notification: false,
        });

        queryClient.invalidateQueries(["IncredibleNotification", productId]);
      },
    },
  );
}

function useGetIncredibleNotificationStatus({ productId }, options = {}) {
  return useQuery(
    ["IncredibleNotification", productId],
    () => getIncredibleNotificationStatus({ productId }),
    {
      enabled: !!productId,
      ...options,
    },
  );
}

export {
  useAddIncredibleNotification,
  useRemoveIncredibleNotification,
  useGetIncredibleNotificationStatus,
  // useToggleAmazingNotif,
  // useGetAmazingNotifStatus,
  // useToggleIncredibleNotification,
};
