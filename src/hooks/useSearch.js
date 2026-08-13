import { useState, useEffect, useCallback, useRef } from "react";

import useScreenStatus from "@/hooks/useScreenStatus";

export function useSearch({
  params = {},
  incredibleCategoryId = null,
  categoryCode = null,
  sellerCode = null,
  tagCategory = null,
  facetCategoryCode = null,
  facetCode = null,
  brandCode = null,
  categoryId = null,
  brand = null,
  promotionId = null,
  searchTerm = "",
}) {
  const { isSmallScreen } = useScreenStatus();
  const isFetchingRef = useRef(false);

  const MAX_AUTO_PAGE = 10;

  const [data, setData] = useState(null);
  const [banners, setBanners] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isManualPagination, setIsManualPagination] = useState(false);

  const category = data?.category;
  const totalItems = data?.pager?.total_items || 0;
  const isAutoFetchEnabled = !isManualPagination && page < MAX_AUTO_PAGE;

  // const isReady = categoryCode !== undefined && categoryId !== undefined;

  // ----------------------------
  // Build query string
  // ----------------------------
  const buildQueryString = (pageNumber = 1, searchTerm) => {
    const query = new URLSearchParams();

    if (searchTerm) {
      query?.set("q", searchTerm);
    }

    if (categoryId) {
      query.set("categoryId", categoryId);
    }

    if (incredibleCategoryId) {
      query.set("category_id", incredibleCategoryId);
    }

    Object.entries(params || {}).forEach(([key, value]) => {
      if (key === "q" || key === "categoryId") return;

      if (Array.isArray(value)) {
        value.forEach((v, i) => query.append(`${key}[${i}]`, v));
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue], index) => {
          if (subValue !== undefined && subValue !== null) {
            key === "attributes"
              ? subValue.length
                ? query.append(`${key}[${subKey}][${index}]`, subValue)
                : ""
              : query.append(`${key}[${subKey}]`, subValue);
          }
        });
      } else if (value !== undefined && value !== null) {
        query.append(key, value);
      }
    });

    query.set("page", pageNumber);
    return query;
  };

  // ----------------------------
  // Build url
  // ----------------------------
  const buildUrl = (pageNumber, searchTerm) => {
    console.log("facetCode =>", facetCode);
    console.log("brandCode =>", brandCode);
    console.log("facetCategoryCode =>", facetCategoryCode);
    console.log("categoryId->", categoryId);
    console.log("categoryCode->", categoryCode);
    console.log("sellerCode->", sellerCode);
    console.log("tagCategory->", tagCategory);
    console.log("searchTerm->", searchTerm);
    console.log("promotionId->", promotionId);
    console.log("incredibleCategoryId->", incredibleCategoryId);

    const query = buildQueryString(pageNumber, searchTerm);
    const queryString = query.toString();

    if (tagCategory) {
      return `/api/tags/${tagCategory}/?${queryString}`;
    }

    if (facetCategoryCode && facetCode) {
      return isSmallScreen
        ? `/api/discovery/faceted-pages/products/${facetCategoryCode}/${facetCode}/?${queryString}`
        : `/api/facet/search/${facetCategoryCode}/${facetCode}/?${queryString}`;
    }

    if (brandCode) {
      const isBrandLanding =
        window.location.pathname.includes("/brand-landing");

      if (isBrandLanding)
        return `/api/brands/${brandCode}/premium/?${queryString}`;

      return `/api/discovery/brands/${brandCode}/products/?${queryString}`;
    }

    if (categoryCode && brand)
      return `/api/categories/${categoryCode}/brands/${brand}/search?${queryString}`;

    if (categoryCode && categoryId) {
      const mobileQuery = new URLSearchParams(query);
      mobileQuery.delete("categoryId");

      return isSmallScreen
        ? `/api/category/${categoryId}/?${mobileQuery.toString()}`
        : `/api/discovery/categories/${categoryId}/products/?${queryString}`;
    }

    if (sellerCode) {
      return `/api/discovery/sellers/${sellerCode}?${queryString}`;
    }

    if (categoryCode) {
      const hasTypes = Object.keys(params || {}).some((key) => key === "types");
      const isProductList = window.location.pathname.includes("/product-list");

      if (hasTypes) {
        return `/api/discovery/${categoryCode}?${queryString}`;
      }

      if (isProductList) {
        return `/api/search/${categoryCode}?productList=true&${queryString}`;
      }

      return `/api/search/${categoryCode}?${queryString}`;
    }

    if (categoryCode && queryString) {
      return `/api/discovery/api/v1/categories/digikala-gift-card?_rch=9fd46e644c8e&page=1&types%5B0%5D=21910&types%5B1%5D=19442`;
    }

    if (window.location.pathname.includes(`/landing-page`)) {
      return `/api/promotion-search/?${queryString}`;
    }

    if (window.location.pathname.includes("/incredible-offers-teasing")) {
      return `/api/teasing-incredible/products/?${queryString}`;
    }

    if (window.location.pathname.includes("/incredible-offers")) {
      return `/api/incredible-offers/products/?${queryString}`;
    }
    if (promotionId) return `/api/promotions/${promotionId}/?${queryString}`;

    return `/api/search?${queryString}`;
  };

  // ----------------------------
  // Fetch Page
  // ----------------------------
  const fetchPage = useCallback(
    async (pageNumber = 1, append = false) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;

      append ? setIsFetchingMore(true) : setIsLoading(true);

      try {
        const url = buildUrl(pageNumber, searchTerm);
        console.log("URL =>", url);

        if (!url) {
          console.error("buildUrl returned undefined");
          return;
        }

        const res = await fetch(url);
        const json = await res.json();

        const newData = json?.data?.widgets
          ? json?.data?.widgets?.find(
              (w) => w.type === "vertical_product_listing",
            )?.data ||
            json.data ||
            null
          : json?.data?.incredible_products_list
            ? json?.data?.incredible_products_list || null
            : json?.data || null;

        setData((prev) => {
          if (!append || !prev) return newData;

          return {
            ...prev,
            ...newData,
            products: [...(prev?.products || []), ...(newData?.products || [])],
            widgets: [...(prev?.widgets || []), ...(newData?.widgets || [])],
          };
        });

        setBanners(
          json?.data?.widgets?.find((w) => w.type === "simple_banner")?.data
            ?.items || [],
        );
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);

        setTimeout(() => {
          isFetchingRef.current = false;
        }, 300);
      }
    },
    [
      params,
      incredibleCategoryId,
      categoryId,
      categoryCode,
      sellerCode,
      brand,
      promotionId,
      searchTerm,
      isSmallScreen,
      facetCategoryCode,
      facetCode,
      brandCode,
    ],
  );

  // ----------------------------
  // Infinite Scroll
  // ----------------------------
  const loadMore = useCallback(() => {
    if (!isAutoFetchEnabled) return;
    if (isFetchingRef.current) return;

    const nextPage = page + 1;

    setPage(nextPage);

    fetchPage(nextPage, true);
  }, [page, isAutoFetchEnabled, fetchPage]);

  // ----------------------------
  // Manual Pagination
  // ----------------------------
  const goToPage = (pageNumber) => {
    if (isFetchingRef.current) return;

    setIsManualPagination(true);
    setPage(pageNumber);
    fetchPage(pageNumber, false);
  };

  // ----------------------------
  // Reset on filter change
  // ----------------------------
  useEffect(() => {
    setIsManualPagination(false);
    setPage(1);
    fetchPage(1, false);
  }, [
    incredibleCategoryId,
    params,
    categoryCode,
    sellerCode,
    categoryId,
    brand,
    searchTerm,
    facetCategoryCode,
    facetCode,
    brandCode,
  ]);

  return {
    data,
    isLoading,
    banners,
    totalItems,
    category,
    page,
    isLoading,
    isFetchingMore,
    isAutoFetchEnabled,
    loadMore,
    goToPage,
  };
}
