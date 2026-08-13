"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useScreenStatus from "@/hooks/useScreenStatus";

export function useCompare(productIds) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productIds) return;

    setIsLoading(true);

    try {
      const ids = productIds.map((id) => id.replace("dkp-", ""));

      const query = ids
        .map((id, index) => `product_ids%5B${index}%5D=${id}`)
        .join("&");

      const res = await fetch(`/api/product/compare/?${query}`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productIds]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

export function useSearchCompare(productIds) {
  const { isSmallScreen } = useScreenStatus();
  const isFetchingRef = useRef(false);

  const query = new URLSearchParams();

  const MAX_AUTO_PAGE = 10;

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isManualPagination, setIsManualPagination] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const totalItems = data?.pager?.total_items || 0;
  const isAutoFetchEnabled = !isManualPagination && page < MAX_AUTO_PAGE;

  const buildQueryString = (pageNumber = 1, searchValue = "") => {
    const query = new URLSearchParams();

    query.set("page", pageNumber);

    if (searchValue.trim()) {
      query.set("q", searchValue.trim());
    }

    return query.toString();
  };

  const buildUrl = (pageNumber, searchValue) => {
    const ids = productIds.map((id) => id.replace("dkp-", ""));

    const query = ids
      .map((id, index) => `product_ids%5B${index}%5D=${id}`)
      .join("&");

    const queryString = buildQueryString(pageNumber, searchValue);

    return `/api/product/compare/search/?${query}&${queryString}`;
  };

  const fetchPage = useCallback(
    async (pageNumber = 1, append = false) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;

      append ? setIsFetchingMore(true) : setIsLoading(true);

      try {
        const url = buildUrl(pageNumber, searchValue);
        console.log("URL =>", url);

        if (!url) {
          console.error("buildUrl returned undefined");
          return;
        }

        const res = await fetch(url);
        const json = await res.json();

        const newData = json?.data;

        setData((prev) => {
          if (!append || !prev) return newData;

          return {
            ...newData,
            products: [...(prev.products || []), ...(newData.products || [])],
          };
        });
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);

        setTimeout(() => {
          isFetchingRef.current = false;
        }, 300);
      }
    },
    [productIds, searchValue, isSmallScreen, query],
  );

  const loadMore = useCallback(() => {
    if (!isAutoFetchEnabled) return;
    if (isFetchingRef.current) return;

    fetchPage(page + 1, true);
    setPage((p) => p + 1);
  }, [page, fetchPage, isAutoFetchEnabled]);

  useEffect(() => {
    setPage(1);
    setData(null);
    setIsManualPagination(false);

    fetchPage(1, false);
  }, [productIds, searchValue]);

  return {
    data,
    totalItems,
    page,
    isLoading,
    isFetchingMore,
    isAutoFetchEnabled,
    loadMore,
    searchValue,
    setSearchValue,
  };
}
