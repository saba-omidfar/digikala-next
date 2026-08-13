import { useState, useEffect, useCallback } from "react";

export function useGetUniversal() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/dictionaries`);
      const json = await res.json();

      setData(
        json?.data?.find((data) => data.type === "universal")?.data?.data
          ?.top_mega_menu_banners ?? null,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}
