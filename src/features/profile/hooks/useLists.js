"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams, useRouter } from "next/navigation";

import {
  getPublicList,
  getUserWishlists,
  getWishlistDetails,
  addProductToWishlist,
  createWishlist,
  updateWishlist,
  removeWishlist,
  removeWishlistProduct,
  getFavoriteProducts,
  addFavoriteProduct,
  removeFavoriteProduct,
  getObservedProducts,
  addObservedProduct,
  removeObservedProduct,
  getRecentViewedProducts,
} from "@/services/axios/Requests/profileRequests";

export function useGetPublicList() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";

  const { data, isLoading, refetch } = useQuery(
    ["PublicList", page],
    () =>
      getPublicList({
        page,
      }),
    {
      keepPreviousData: true,
    },
  );

  return {
    data,
    isLoading,
    refetch,
  };
}

export function useGetUserWishlists() {
  const { data, isLoading, refetch } = useQuery(
    ["UserLists"],
    getUserWishlists,
  );

  return {
    userLists: data || [],
    userListsIsLoading: isLoading,
    refetch,
  };
}

export function useCreateWishlist() {
  const queryClient = useQueryClient();

  const mutation = useMutation(createWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["PublicList"]);
    },
  });

  return {
    createWishlist: mutation.mutate,
    isCreating: mutation.isLoading,
  };
}

export function useGetWishlistDetails(wishlistCode) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "1";

  const setSort = (newSort) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", String(newSort));
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const { data, isLoading, refetch } = useQuery(
    ["PublicList", wishlistCode, page, sort],
    () =>
      getWishlistDetails({
        wishlistCode,
        page,
        sort,
      }),
    {
      enabled: !!wishlistCode,
      keepPreviousData: true,
    },
  );

  return {
    data,
    isLoading,
    sort: Number(sort),
    setSort,
    refetch,
  };
}

export function useUpdateWishlist() {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateWishlist, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["PublicList"]);

      queryClient.invalidateQueries(["PublicList", variables?.wishlistCode]);
    },
  });

  return {
    updateWishlist: mutation.mutate,
    isUpdating: mutation.isLoading,
  };
}

export function useRemoveWishlist() {
  const queryClient = useQueryClient();

  const mutation = useMutation(removeWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["PublicList"]);
    },
  });

  return {
    removeWishlist: mutation.mutate,
    isRemoving: mutation.isLoading,
  };
}

export function useAddProductToWishlist() {
  const queryClient = useQueryClient();

  const mutation = useMutation(addProductToWishlist, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["PublicList"]);
      queryClient.invalidateQueries(["PublicList", variables?.wishlistCode]);
      queryClient.invalidateQueries(["UserLists"]);
    },
  });

  return {
    addProductToWishlist: mutation.mutateAsync,
    isAdding: mutation.isLoading,
  };
}

export function useRemoveWishlistProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation(removeWishlistProduct, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["PublicList"]);
      queryClient.invalidateQueries(["UserLists"]);

      if (variables?.wishlistCode) {
        queryClient.invalidateQueries(["PublicList", variables.wishlistCode]);
      }
    },
  });

  return {
    removeWishlistProduct: mutation.mutateAsync,
    isRemoving: mutation.isLoading,
  };
}

// FAVORITES

export function useFavoriesProducts() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("activeTab") || "announcements";
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "1";

  const setSort = (newSort) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", String(newSort));
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const { data, isLoading, refetch } = useQuery(
    ["favorites", activeTab, page, sort],
    () =>
      getFavoriteProducts({
        activeTab,
        page,
        sort,
      }),
    {
      keepPreviousData: true,
    },
  );

  return {
    data: data?.data ?? null,
    isLoading,
    sort: Number(sort),
    setSort,
    refetch,
  };
}

export function useAddFavoriteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteProduct,

    onSuccess: (_, productId) => {
      queryClient.setQueryData(["me"], (oldUser) => {
        if (!oldUser) return oldUser;

        const id = String(productId);

        return {
          ...oldUser,
          favorite_products: [...(oldUser.favorite_products || []), id],
        };
      });

      queryClient.invalidateQueries(["favorites"]);
    },
  });
}

export function useRemoveFavoriteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavoriteProduct,

    onSuccess: (_, productId) => {
      queryClient.setQueryData(["me"], (oldUser) => {
        if (!oldUser) return oldUser;

        const id = String(productId);

        return {
          ...oldUser,
          favorite_products: (oldUser.favorite_products || []).filter(
            (item) => String(item) !== id,
          ),
        };
      });

      queryClient.invalidateQueries(["favorites"]);
    },
  });
}

// OBSERVED

export function useObservedProducts() {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "favorites";
  const page = searchParams.get("page") || "1";

  const { data, isLoading, refetch } = useQuery(
    ["observed-products", activeTab, page],
    () =>
      getObservedProducts({
        activeTab,
        page,
      }),
    {
      keepPreviousData: true,
    },
  );

  return {
    data: data?.data ?? null,
    isLoading,
    refetch,
  };
}

export function useAddObservedProduct() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId, send_sms, send_email, send_notification }) =>
      addObservedProduct({
        productId,
        send_sms,
        send_email,
        send_notification,
      }),
    {
      onSuccess: (_, variables) => {
        const { productId, send_sms, send_email, send_notification } =
          variables;

        queryClient.setQueryData(["me"], (oldUser) => {
          if (!oldUser) return oldUser;

          const alreadyExists = oldUser.observed_products?.some(
            (item) => String(item.productId) === String(productId),
          );

          if (alreadyExists) {
            return oldUser;
          }

          return {
            ...oldUser,
            observed_products: [
              ...(oldUser.observed_products || []),
              {
                productId: Number(productId),
                type: "on_incredible_offer",
                send_sms,
                send_email,
                send_notification,
              },
            ],
          };
        });

        queryClient.invalidateQueries(["observed-products"]);
      },
    },
  );
}

export function useRemoveObservedProduct() {
  const queryClient = useQueryClient();

  return useMutation(({ productId }) => removeObservedProduct(productId), {
    onSuccess: (_, variables) => {
      const { productId } = variables;

      queryClient.setQueryData(["me"], (oldUser) => {
        if (!oldUser) return oldUser;

        return {
          ...oldUser,
          observed_products: (oldUser.observed_products || []).filter(
            (item) => String(item.productId) !== String(productId),
          ),
        };
      });

      queryClient.invalidateQueries(["observed-products"]);
    },
  });
}

// RECENT-VIEWED

export function useRecentViewedProducts() {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["recent-viewed-products"],
    getRecentViewedProducts,
    {
      keepPreviousData: true,
    },
  );

  return {
    data: data?.data?.recent_viewed_products ?? null,
    isLoading,
    isFetching,
    refetch,
  };
}
