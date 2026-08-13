"use client";

import { useState, useEffect, useCallback } from "react";

export function useGetIncredibleOffers({ categoryId = null }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const path = categoryId
        ? `/api/incredible-offers/?categoryId=${categoryId}`
        : `/api/incredible-offers/`;

      const res = await fetch(path);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

// export function useGetIncredibleOfferProducts({
//   params = {},
//   categoryId = null,
// }) {
//   const { isSmallScreen } = useScreenStatus();
//   const MAX_AUTO_PAGE = 10;
//   const ITEMS_PER_PAGE = 20;

//   const [data, setData] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);

//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const [isManualPagination, setIsManualPagination] = useState(false);

//   const isFetchingRef = useRef(false);

//   const category = data?.category;
//   const totalItems = data?.pager?.total_items || 0;

//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
//   const hasMore = page < totalPages;
//   const isAutoFetchEnabled = !isManualPagination && page < MAX_AUTO_PAGE;

//   // ----------------------------
//   // Build query
//   // ----------------------------
//   const buildQueryString = (pageNumber, categoryId, q) => {
//     const query = new URLSearchParams(params);
//     query.set("category_id", categoryId);
//     query.set("page", pageNumber);
//     query.set("q", q);
//     return query.toString();
//   };

//   // ----------------------------
//   // Build url
//   // ----------------------------
//   const buildUrl = (pageNumber, categoryId, q) => {
//     const queryString = buildQueryString(pageNumber, categoryId, q);

//     if (categoryId) return `/api/incredible-offers/products/?${queryString}`;
//   };

//   // ----------------------------
//   // Fetch Page
//   // ----------------------------
//   const fetchPage = useCallback(
//     async (pageNumber, categoryId, q, append = false) => {
//       if (isFetchingRef.current) return;

//       isFetchingRef.current = true;

//       append ? setIsFetchingMore(true) : setIsLoading(true);

//       try {
//         const res = await fetch(buildUrl(pageNumber, categoryId, q));
//         const json = await res.json();

//         const newProducts = isSmallScreen
//           ? json?.data?.widgets?.[0]?.data?.widgets || []
//           : json?.data?.products || [];

//         setData(
//           isSmallScreen
//             ? json?.data?.widgets?.[0]?.data || null
//             : json?.data || null,
//         );

//         if (append) {
//           // ✅ Infinite Scroll Mode
//           setProducts((prev) => {
//             const seen = new Set(prev.map((p) => p.id));
//             const filtered = newProducts.filter((p) => !seen.has(p.id));
//             return [...prev, ...filtered];
//           });
//         } else {
//           // ✅ Manual Pagination OR Reset
//           setProducts(newProducts);
//         }
//       } catch (err) {
//         console.error("Search error:", err);
//       } finally {
//         setIsLoading(false);
//         setIsFetchingMore(false);
//         isFetchingRef.current = false;
//       }
//     },
//     [params, categoryId],
//   );

//   // ----------------------------
//   // Infinite Scroll
//   // ----------------------------
//   const loadMore = () => {
//     if (!isAutoFetchEnabled) return;
//     if (isFetchingRef.current) return;
//     if (!hasMore) return;

//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchPage(nextPage, true);
//   };

//   // ----------------------------
//   // Manual Pagination
//   // ----------------------------
//   const goToPage = (pageNumber) => {
//     if (isFetchingRef.current) return;

//     setIsManualPagination(true);
//     setPage(pageNumber);
//     fetchPage(pageNumber, false);
//   };

//   // ----------------------------
//   // Reset on filter change
//   // ----------------------------
//   useEffect(() => {
//     setIsManualPagination(false);
//     setPage(1);
//     setProducts([]);
//     fetchPage(1, false);
//   }, [fetchPage]);

//   return {
//     data,
//     products,
//     setProducts,
//     totalItems,
//     category,
//     page,
//     hasMore,
//     isLoading,
//     isFetchingMore,
//     isAutoFetchEnabled,
//     loadMore,
//     goToPage,
//   };
// }
