import { useQuery, useMutation } from "react-query";
import {
  userLogin,
  userLogout,
  loginWithPassword,
  checkUsername,
} from "@/services/axios/Requests/authRequests";

function useLogin(username) {
  return useQuery(["User", username], () => userLogin(username));
}

function useLogout(username) {
  return useQuery(["User", username], () => userLogout(username));
}

function useLoginWithPassword() {
  return useMutation(({ username, password, guestCartId }) =>
    loginWithPassword(username, password, guestCartId),
  );
}

function useCheckUsername() {
  return useMutation(({ username }) => checkUsername(username));
}

export { useLogin, useLogout, useLoginWithPassword, useCheckUsername };
