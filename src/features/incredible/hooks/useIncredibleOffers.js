"use client";

import { useState, useEffect, useCallback } from "react";

export function useGetIncredibleOffers({ categoryId = null }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const path = categoryId
        ? `/api/incredible-offers/?categoryId=${categoryId}`
        : `/api/incredible-offers/`;

      const res = await fetch(path);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}
