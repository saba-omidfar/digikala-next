import { useState, useEffect, useCallback } from "react";

export function useGetStates() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/dictionaries/states`);
      const json = await res.json();

      setData(
        json?.data?.find((data) => data.type === "states")?.data?.data ?? null,
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
