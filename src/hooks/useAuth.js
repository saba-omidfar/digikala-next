import { useQuery } from "react-query";
import { userLogin, userLogout } from "@/services/axios/Requests/authRequests";

function useLogin(username) {
  return useQuery(["User", username], () => userLogin(username));
}

function useLogout(username) {
  return useQuery(["User", username], () => userLogout(username));
}

export { useLogin, useLogout };
