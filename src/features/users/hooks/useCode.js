import { useMutation } from "react-query";

import { sendCode, verifyCode } from "@/services/axios/Requests/codeRequests";

function useSendCode() {
  return useMutation(({ username, guestCartId, purpose }) =>
    sendCode(username, guestCartId, purpose),
  );
}

function useVerifyCode() {
  return useMutation(({ username, code, guestCartId }) =>
    verifyCode(username, code, guestCartId),
  );
}

export { useSendCode, useVerifyCode };
