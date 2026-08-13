import { useMutation } from "react-query";

import { reportProductFeedback } from "@/services/axios/Requests/productFeedbackRequest";

export function useReportProduct() {
  return useMutation({
    mutationFn: reportProductFeedback,

    retry: false,

    onError: () => {},
  });
}
