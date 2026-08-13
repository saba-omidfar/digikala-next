// hooks/useReportComment.js

import { useMutation } from "react-query";

import { reportComment } from "@/services/axios/Requests/commentRequests";

export function useReportComment() {
  return useMutation(({ commentId }) => reportComment({ commentId }), {
    onError: (err) => {
      console.error("Error reporting comment:", err);
    },
  });
}
