import { useState, useEffect, useCallback } from "react";

export function useUserHistory() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/products/recent-viewed`);

      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    refetch,
  };
}
