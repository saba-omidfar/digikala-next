import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  addAddress,
  editAddress,
  getAddresses,
  removeAddress,
  setDefaultAddress,
} from "@/services/axios/Requests/profileRequests";

export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
}

export function useEditAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
}

export function useRemoveAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
  });
}

export function useGetAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDefaultAddress,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
