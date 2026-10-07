import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useQuestions() {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("activeTab") || "comments";
  const page = searchParams.get("page") || "1";

  const [sort, setSort] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      params.set("activeTab", activeTab);
      params.set("page", page);
      params.set("sort", String(sort));

      const res = await fetch(`/api/profile/questions/?${params.toString()}`);

      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, page, sort]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    sort,
    setSort,
    refetch,
  };
}
