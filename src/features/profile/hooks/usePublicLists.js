import { useState, useEffect, useCallback } from "react";

import { useSearchParams } from "next/navigation";

export function usePublicList() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      params.set("page", page);

      const res = await fetch(`/api/profile/public-lists?${params.toString()}`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}
