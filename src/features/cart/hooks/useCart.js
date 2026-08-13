import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  addProductToCart,
  getUserCart,
  removeProductFromCart,
  getNextCart,
  addToNextCart,
  removeFromNextCart,
  removeCart,
  toggleInsurance,
  addPlusPlan,
  removePlusPlan,
} from "@/services/axios/Requests/cartRequests";

function useAddProductToCart() {
  const queryClient = useQueryClient();

  return useMutation(addProductToCart, {
    onSuccess: async (_, variables) => {
      const freshCart = await getUserCart(variables.guestCartId);

      queryClient.setQueryData(["UserCart", variables.guestCartId], freshCart);

      queryClient.invalidateQueries(["NextCart"]);
    },
  });
}

function useRemoveProductFromCart() {
  const queryClient = useQueryClient();

  return useMutation(removeProductFromCart, {
    onSuccess: async (_, variables) => {
      const freshCart = await getUserCart(variables.guestCartId);

      queryClient.setQueryData(["UserCart", variables.guestCartId], freshCart);

      queryClient.invalidateQueries(["NextCart"]);
    },
  });
}

function useGetUserCart(guestCartId) {
  return useQuery(["UserCart", guestCartId], () => getUserCart(guestCartId), {
    enabled: true,
  });
}

function useRemoveCart() {
  const queryClient = useQueryClient();

  return useMutation(removeCart, {
    onSuccess: (_, guestCartId) => {
      queryClient.removeQueries(["UserCart", guestCartId]);
      queryClient.removeQueries(["NextCart"]);

      localStorage.removeItem("guestCartId");
    },
  });
}

function useGetNextCart(guestCartId) {
  return useQuery(["NextCart", guestCartId], () => getNextCart(guestCartId), {
    enabled: true,
  });
}

function useAddToNextCart() {
  const queryClient = useQueryClient();

  return useMutation(addToNextCart, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["UserCart", variables.guestCartId]);

      queryClient.invalidateQueries(["NextCart", variables.guestCartId]);
    },
  });
}

function useRemoveFromNextCart() {
  const queryClient = useQueryClient();

  return useMutation(removeFromNextCart, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["UserCart", variables.guestCartId]);

      queryClient.invalidateQueries(["NextCart", variables.guestCartId]);
    },
  });
}

function useToggleInsurance() {
  const queryClient = useQueryClient();

  return useMutation(toggleInsurance, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["UserCart", variables.guestCartId]);
    },
  });
}

function useAddPlan() {
  const queryClient = useQueryClient();

  return useMutation(addPlusPlan, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["UserCart", variables.guestCartId]);
    },
  });
}

function useRemovePlan() {
  const queryClient = useQueryClient();

  return useMutation(removePlusPlan, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["UserCart", variables?.guestCartId]);
    },
  });
}

export {
  useAddProductToCart,
  useGetUserCart,
  useRemoveProductFromCart,
  useRemoveCart,
  useGetNextCart,
  useAddToNextCart,
  useRemoveFromNextCart,
  useToggleInsurance,
  useAddPlan,
  useRemovePlan,
};
