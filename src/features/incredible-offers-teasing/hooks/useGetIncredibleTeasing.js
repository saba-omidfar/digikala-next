import { useState, useEffect, useCallback } from "react";

export default function useGetIncredibleTeasing() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);

    fetch(`/api/teasing-incredible/`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}
