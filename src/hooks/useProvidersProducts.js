"use client";
import { useState, useEffect, useCallback } from "react";

import { useSearchParams } from "next/navigation";

export function useGetProductProviders(categoryCode = null) {
  const searchParams = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (categoryCode?.startsWith("category-")) {
    categoryCode = categoryCode.replace("category-", "");
  }

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(
      `/api/providers-products/?category_code=${categoryCode}&${searchParams?.toString()}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json?.data?.products);
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
