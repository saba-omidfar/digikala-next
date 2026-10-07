import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  getMe,
  userLogout,
  getProfile,
  updateProfile,
  updatePersonalInfo,
  updateEmail,
  verifyEmail,
  resendEmailVerification,
  updatePhone,
  verifyPhone,
  resendPhoneVerification,
  deleteAccount,
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

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}

function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

function useUpdatePersonalInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePersonalInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

// ADD OR UPDATE EMAIL

function useUpdateEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmail,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmail,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

function useResendEmailVerification() {
  return useMutation({
    mutationFn: resendEmailVerification,
  });
}

// ADD OR UPDATE PHONE

function useUpdatePhone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePhone,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

function useVerifyPhone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyPhone,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}

function useResendPhoneVerification() {
  return useMutation({
    mutationFn: resendPhoneVerification,
  });
}

function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      queryClient.clear();
    },
  });
}

export {
  useGetMe,
  useLogout,
  useUpdatePersonalInfo,
  useUpdateProfile,
  useUpdateEmail,
  useVerifyEmail,
  useResendEmailVerification,
  useDeleteAccount,
  useUpdatePhone,
  useVerifyPhone,
  useResendPhoneVerification,
};
