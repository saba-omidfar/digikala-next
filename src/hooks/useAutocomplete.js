import { useState, useEffect, useCallback } from "react";

export function useAutocomplete(searchTerm = "", delay = 300) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/autocomplete/?q=${encodeURIComponent(searchTerm)}`,
      );
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  const refetch = useCallback(
    (searchTerm) => {
      fetchData(searchTerm);
    },
    [fetchData],
  );

  useEffect(() => {
    const handler = setTimeout(() => fetchData(searchTerm), delay);
    return () => clearTimeout(handler);
  }, [searchTerm, fetchData, delay]);

  return { data, isLoading, refetch };
}
