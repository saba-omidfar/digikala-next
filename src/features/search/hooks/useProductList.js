"use client";

import { useEffect, useMemo, useRef } from "react";

import { useListing } from "@/contexts/ListingContext";

export function useProductList() {
  const loadMoreRef = useRef(null);

  const {
    data,
    filters,
    banners,
    totalItems,
    page,
    setPage,
    loadMore,
    isLoading,
    isFetchingMore,
    isAutoFetchEnabled,
    goToPage,
  } = useListing();

  const products = useMemo(() => {
    const source = data?.widgets?.length ? data.widgets : data?.products || [];

    return source.filter((item) =>
      ["product", "giftcard"].includes(item?.type || item?.product_type),
    );
  }, [data]);

  useEffect(() => {
    const current = loadMoreRef.current;

    if (!current || !isAutoFetchEnabled || isLoading || isFetchingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [loadMore, isAutoFetchEnabled, isLoading, isFetchingMore]);

  return {
    filters,
    products,
    banners,
    totalItems,
    page,
    setPage,
    isLoading,
    isFetchingMore,
    isAutoFetchEnabled,
    goToPage,
    loadMoreRef,
  };
}
