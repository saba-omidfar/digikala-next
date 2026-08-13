import { useState, useEffect, useCallback } from "react";

export function useGetRelatedProducts(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}/similar`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}
