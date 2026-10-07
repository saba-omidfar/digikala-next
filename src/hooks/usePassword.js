import { useMutation } from "react-query";

import { resetPassword } from "@/services/axios/Requests/passwordRequests";

export function useResetPassword() {
  return useMutation(resetPassword);
}
