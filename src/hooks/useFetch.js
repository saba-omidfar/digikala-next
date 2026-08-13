"use client";

import { useState, useEffect, useCallback } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);

    try {
      const res = await fetch(url);
      const json = await res.json();

      setData(json.data);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    refetch: fetchData,
  };
}
