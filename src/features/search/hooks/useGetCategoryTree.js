import { useState, useEffect, useCallback } from "react";

export default function useGetCategoryTree() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/dictionaries/category-tree`);
      const json = await res.json();

      setData(
        json?.data?.find((data) => data.type === "category_tree")?.data?.data ??
          null,
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
