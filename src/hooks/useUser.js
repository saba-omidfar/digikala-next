import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  getMe,
  userLogout,
  getFavoriteProducts,
} from "@/services/axios/Requests/userRequests";

function useGetMe() {
  return useQuery(["me"], () => getMe(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
}

function useLogout() {
  const queryClient = useQueryClient();

  return useMutation(["me"], () => userLogout(), {
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
    },
    onError: (err) => {
      console.error(
        "❌ خطا در خروج کاربر:",
        err?.response?.data?.message || err.message,
      );
    },
  });
}

function useGetFavorites() {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: getFavoriteProducts,
  });
}

export { useGetMe, useLogout, useGetFavorites };
