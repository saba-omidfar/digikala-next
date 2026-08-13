import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export function useBestSellingPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/best-selling/?${searchParams?.toString()}`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}
