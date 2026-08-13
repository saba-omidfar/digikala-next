import { useQuery } from "react-query";
import { getMegamenu } from "@/services/axios/Requests/megamenuRequests";

import { useState, useEffect, useCallback } from "react";

export function useGetMegamenu() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/dictionaries`);
      const json = await res.json();

      setData(
        json?.data?.find((data) => data.type === "mega_menu")?.data?.data ??
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

// export function useGetMegamenu() {
//   return useQuery(["Megamenu"], getMegamenu, {
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     staleTime: 1000 * 60 * 60,
//     cacheTime: 1000 * 60 * 60,
//   });
// }
