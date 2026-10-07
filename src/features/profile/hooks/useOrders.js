"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";

import {
  getOrders,
  getOrdersTabs,
  getReturns,
  getOrderDetails,
  reorderItems,
  searchOrders,
} from "@/services/axios/Requests/ordersRequest";

const defaultPager = {
  current_page: 1,
  total_pages: 1,
  total_items: 0,
};

export function useOrders() {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "in_progress";
  const page = searchParams.get("page") || "1";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders", activeTab, page],
    queryFn: () => getOrders({ activeTab, page }),
    select: (json) => ({
      items: json?.data?.orders ?? [],
      pager: json?.data?.pager ?? defaultPager,
    }),
  });

  return {
    data: data ?? { items: [], pager: defaultPager },
    isLoading,
    isError,
    refetch,
  };
}

export function useOrdersTabs() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ordersTabs"],
    queryFn: getOrdersTabs,
    select: (json) => json?.data?.tabs ?? null,
  });

  return {
    data: data ?? null,
    isLoading,
    isError,
    refetch,
  };
}

export function useReturns() {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "returned";
  const page = searchParams.get("page") || "1";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["returns", activeTab, page],
    queryFn: () => getReturns({ activeTab, page }),
    select: (json) => ({
      items: json?.data?.return_requests ?? [],
      pager: json?.data?.pager ?? defaultPager,
    }),
  });

  return {
    data: data ?? { items: [], pager: defaultPager },
    isLoading,
    isError,
    refetch,
  };
}

export function useOrderDetails(orderId) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const result = await getOrderDetails(orderId);

      return result;
    },
    enabled: !!orderId,
    select: (json) => json?.data?.order ?? null,
  });

  return {
    data: data ?? null,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export function useReorderItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId }) => reorderItems(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries(["UserCart"]);
    },
  });
}

export function useSearchOrders({
  activeTab = "in_progress",
  q = "",
  page = 1,
}) {
  console.log("activeTab ->", activeTab);
  console.log("q ->", q);

  const normalizedQuery = q.trim();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["searchOrders", activeTab, normalizedQuery, page],

    queryFn: () =>
      searchOrders({
        activeTab,
        q: normalizedQuery,
        page,
      }),

    enabled: normalizedQuery.length > 0,

    select: (json) => ({
      orders: json?.data?.orders ?? [],
    }),
  });

  return {
    data: data ?? { orders: [] },
    isLoading,
    isError,
    error,
    refetch,
  };
}
