import { useMutation } from "react-query";

import { reportPriceFeedback } from "@/services/axios/Requests/priceFeedbackRequest";

export function useReportPrice() {
  return useMutation({
    mutationFn: reportPriceFeedback,

    retry: false,

    onError: () => {},
  });
}
