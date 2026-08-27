"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from "react";

import qs from "qs";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { useModal } from "@/contexts/modalContext";
import { useSearch } from "@/hooks/useSearch";
import debounce from "@/utils/debounce";

const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  // const [categoryId, setCategoryId] = useState(null);

  const router = useRouter();
  const { closeModal } = useModal();
  let {
    brandCode,
    facetCode,
    facetCategoryCode,
    tagCategory,
    categoryCode,
    sellerCode,
    brand,
    promotionId,
  } = useParams();

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");
  const categoryId = searchParams.get("categoryId");
  const incredibleCategoryId = searchParams.get("category_id");

  if (categoryCode?.startsWith("category-")) {
    categoryCode = categoryCode.replace("category-", "");
  }

  const getInitialParams = () => {
    const initial = {};

    searchParams.forEach((value, key) => {
      // attributes[12][0]
      const nestedMatch = key.match(/^(.+)\[(.+)\]\[(\d+)\]$/);

      // brands[0]
      const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);

      // price[min]
      const objectMatch = key.match(/^(.+)\[(.+)\]$/);

      // -----------------------------
      // nested object arrays
      // attributes[12][0]
      // -----------------------------
      if (nestedMatch) {
        const mainKey = nestedMatch[1];
        const subKey = nestedMatch[2];
        const index = Number(nestedMatch[3]);

        if (!initial[mainKey]) {
          initial[mainKey] = {};
        }

        if (!initial[mainKey][subKey]) {
          initial[mainKey][subKey] = [];
        }

        initial[mainKey][subKey][index] = value;

        return;
      }

      // -----------------------------
      // arrays
      // brands[0]
      // -----------------------------
      if (arrayMatch) {
        const mainKey = arrayMatch[1];

        if (!initial[mainKey]) {
          initial[mainKey] = [];
        }

        initial[mainKey].push(value);

        return;
      }

      // -----------------------------
      // objects
      // price[min]
      // -----------------------------
      if (objectMatch) {
        const mainKey = objectMatch[1];
        const subKey = objectMatch[2];

        if (!initial[mainKey]) {
          initial[mainKey] = {};
        }

        initial[mainKey][subKey] = value;

        return;
      }

      // -----------------------------
      // primitive
      // -----------------------------
      initial[key] = value;
    });

    return initial;
  };

  // const getInitialParams = () => {
  //   const params = {};
  //   const brands = [];
  //   const seller_types = [];
  //   const color_palettes = [];
  //   const attributes = {};

  //   searchParams.forEach((value, key) => {
  //     const priceMatch = key.match(/^price\[(\w+)\]$/);
  //     const brandMatch = key.match(/^brands\[(\d+)\]$/);
  //     const sellerMatch = key.match(/^seller_types\[(\d+)\]$/);
  //     const attributesMatch = key.match(/^attributes\[(.*)\[\]]$/);
  //     const colorMatch = key.match(/^color_palettes\[(\d+)\]$/);

  //     if (priceMatch) {
  //       if (!initial.price) initial.price = {};
  //       initial.price[priceMatch[1]] = value;
  //     } else if (brandMatch) brands.push(String(value));
  //     else if (sellerMatch) seller_types.push(String(value));
  //     else if (colorMatch) color_palettes.push(String(value));
  //     else if (attributesMatch) {
  //       const attrId = attributesMatch[1];
  //       const index = attributesMatch[2] ? Number(attributesMatch[2]) : null;

  //       if (!attributes[attrId]) attributes[attrId] = [];
  //       if (index !== null) {
  //         attributes[attrId][index] = String(value);
  //       } else {
  //         attributes[attrId].push(String(value));
  //       }

  //       // if (attributes[attrId].includes(String(value))) {
  //       //   attributes[attrId].pop(String(value));
  //       // } else {
  //       //   attributes[attrId].push(String(value));
  //       // }
  //     } else params[key] = value;
  //   });

  //   if (brands.length) params.brands = brands;
  //   if (seller_types.length) params.seller_types = seller_types;
  //   if (Object.keys(attributes).length) params.attributes = attributes;
  //   if (color_palettes.length) params.color_palettes = color_palettes;

  //   return params;
  // };

  const [params, setParams] = useState(getInitialParams);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortDefault, setSortDefault] = useState(null);
  const [filters, setFilters] = useState([]);
  const [filterExtra, setFilterExtra] = useState({
    filterId: null,
    filterItem: null,
    filterKey: null,
    filterTitle: null,
    filterOptions: null,
    isOpen: false,
  });

  const hasNonSortFilters = Object.keys(params).some(
    (key) => key !== "sort" && key !== "q" && key !== "catgeory_id",
  );

  const filtersCount = useMemo(() => {
    return Object.keys(params).filter(
      (key) =>
        key !== "q" &&
        key !== "sort" &&
        key !== "categoryId" &&
        key !== "catgeory_id",
    )?.length;
  }, [params]);

  const {
    data,
    isLoading,
    banners,
    products,
    totalItems,
    page,
    setPage,
    isFetchingMore,
    isAutoFetchEnabled,
    loadMore,
    goToPage,
  } = useSearch({
    params,
    facetCategoryCode,
    brandCode,
    facetCode,
    tagCategory,
    categoryCode,
    sellerCode,
    categoryId,
    promotionId,
    incredibleCategoryId,
    brand,
    searchTerm,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      q: searchTerm,
    }));
  }, [searchTerm]);

  // Set AllFilters
  useEffect(() => {
    const filtersWidget = Array.isArray(data)
      ? data.find((widget) => widget.type === "filters")?.data
      : data?.filters;

    const allFilters =
      filtersWidget &&
      Object.entries(filtersWidget)?.map(([key, value]) => ({
        key,
        ...value,
      }));

    setFilters(allFilters);
  }, [data]);

  // useEffect(() => {
  //   if (!isSmallScreen) return;
  //   if (!categoryCode) return;

  //   const currentUrl = new URL(window.location.href);

  //   if (!currentUrl.searchParams.get("categoryCode")) {
  //     const newUrl = `/search/${categoryCode}?categoryCode=${encodeURIComponent(
  //       categoryCode,
  //     )}`;
  //     router.replace(newUrl);
  //   }
  // }, [isSmallScreen, categoryCode, router]);

  // ساخت URL

  useEffect(() => {
    const currentUrl = new URL(window.location.href);

    const q = currentUrl.searchParams.get("q");

    const baseParams = {};

    if (q) baseParams.q = q;
    if (categoryId) baseParams.categoryId = categoryId;
    if (incredibleCategoryId) baseParams.category_id = incredibleCategoryId;

    const newQueryParams = { ...baseParams, ...params };

    Object.keys(newQueryParams).forEach((key) => {
      if (newQueryParams[key] === null || newQueryParams[key] === undefined) {
        delete newQueryParams[key];
      }
    });

    const queryString = qs.stringify(newQueryParams, {
      encode: true,
      arrayFormat: "bracket",
      indices: true,
    });

    const newUrl = `${currentUrl.pathname}?${queryString}`;

    if (`?${queryString}` !== currentUrl.search) {
      router.push(newUrl, undefined, { scroll: false });
    }
  }, [router, params, categoryId]);

  // --- بروزرسانی label مرتب سازی ---
  useEffect(() => {
    let selectedSort = null;

    if (params?.sort) {
      selectedSort = data?.sort_options?.find(
        (option) => option.id == params.sort,
      );
    }

    if (!selectedSort) {
      selectedSort = data?.sort_options?.find(
        (option) => option.id == data?.sort?.default,
      );
    }

    setSortDefault(selectedSort);
  }, [params.sort, data]);

  const clearFilterExtra = () => {
    setFilterExtra({
      filterItem: undefined,
      filterKey: null,
      filterTitle: null,
      filterOptions: null,
      isOpen: false,
    });
  };

  // --- Update Parameters ---
  const updateParams = (key, value) => {
    setParams((prev) => {
      const newParams = { ...prev };
      if (value === undefined || value === null || value === "") {
        delete newParams[key];
      } else {
        newParams[key] = value;
      }
      return newParams;
    });
  };

  const switchFiltersChangeHandler = (switchFilter) => {
    const isActive = !!params[switchFilter];
    updateParams(switchFilter, isActive ? undefined : "1");
  };

  const handleSwitchChange = (event) => {
    const { name } = event.target;
    const isActive = !!params[name];
    updateParams(name, isActive ? undefined : "1");
  };

  // Remove All Filters
  const removeAllFilters = () => {
    setParams((prev) => {
      const newParams = {};

      // if (prev.sort) newParams.sort = prev.sort;
      if (prev.categoryCode) newParams.categoryCode = prev.categoryCode;

      return newParams;
    });
  };

  // Change Sort
  const sortDefaultChangeHandler = (sortOption) => {
    setSortDefault(sortOption);
    updateParams("sort", sortOption.id);
  };

  const normalizeRange = (values) => {
    const sorted = values.map(Number).sort((a, b) => a - b);
    return [sorted[0], sorted[1]];
  };

  const updatePrice = useCallback(
    debounce(({ min, max }) => {
      setParams((prev) => ({
        ...prev,
        price: {
          ...(prev.price || {}),
          ...(min == null ? {} : { min: String(min) }),
          ...(max == null ? {} : { max: String(max) }),
        },
      }));
    }, 700),
    [],
  );

  const priceInputChangeHandler = ({ min, max }) => {
    updatePrice({
      min,
      max,
    });
  };

  const priceSliderChangeHandler = (values) => {
    console.log("values", values);

    const [min, max] = normalizeRange(values);

    updatePrice({
      min,
      max,
    });
  };

  // Focus On Input
  const focusInputHandler = (event) => {
    const { name, value } = event.target;
    if (value === "0") {
      setParams((prev) => {
        const updatedPrice = { ...prev.price };
        delete updatedPrice[name];
        const newParams = { ...prev };
        if (Object.keys(updatedPrice).length > 0) {
          newParams.price = updatedPrice;
        } else {
          delete newParams.price;
        }
        return newParams;
      });
    }
  };

  const colorsPalleteSellectHandler = (color) => {
    setParams((prev) => {
      const currentColorPalettes = prev.color_palettes || [];

      const isSelected = currentColorPalettes.includes(String(color.id));

      const updatedColorPalettes = isSelected
        ? currentColorPalettes.filter((c) => c !== String(color.id))
        : [...currentColorPalettes, String(color.id)];
      return { ...prev, color_palettes: updatedColorPalettes };
    });
  };

  const filterCheckboxChangeHandler = ({ key, id, title, checked }) => {
    const value = String(id ?? title);

    setParams((prev) => {
      const currentValues = prev[key] || [];

      const updatedValues = checked
        ? [...new Set([...currentValues, value])]
        : currentValues.filter((item) => String(item) !== value);

      if (!updatedValues.length) {
        const newParams = { ...prev };
        delete newParams[key];
        return newParams;
      }

      return {
        ...prev,
        [key]: updatedValues,
      };
    });
  };

  const contextValue = useMemo(
    () => ({
      categoryId,
      promotionId,
      // setCategoryId,
      data,
      banners,
      filters,
      isLoading,
      products,
      totalItems,
      page,
      setPage,
      goToPage,
      filterExtra,
      setFilterExtra,
      clearFilterExtra,
      sortDefault,
      setSortDefault,
      params,
      setParams,
      updateParams,
      switchFiltersChangeHandler,
      handleSwitchChange,
      removeAllFilters,
      sortDefaultChangeHandler,
      activeCategory,
      setActiveCategory,
      normalizeRange,
      priceInputChangeHandler,
      focusInputHandler,
      priceSliderChangeHandler,
      hasNonSortFilters,
      filtersCount,
      colorsPalleteSellectHandler,
      filterCheckboxChangeHandler,
      loadMore,
      isFetchingMore,
      isAutoFetchEnabled,
      categoryCode,
    }),
    [
      categoryId,
      promotionId,
      // setCategoryId,
      data,
      banners,
      filters,
      isLoading,
      products,
      totalItems,
      page,
      setPage,
      goToPage,
      filterExtra,
      setFilterExtra,
      clearFilterExtra,
      sortDefault,
      setSortDefault,
      params,
      setParams,
      updateParams,
      switchFiltersChangeHandler,
      handleSwitchChange,
      removeAllFilters,
      sortDefaultChangeHandler,
      activeCategory,
      setActiveCategory,
      normalizeRange,
      priceInputChangeHandler,
      focusInputHandler,
      priceSliderChangeHandler,
      hasNonSortFilters,
      filtersCount,
      colorsPalleteSellectHandler,
      filterCheckboxChangeHandler,
      loadMore,
      isFetchingMore,
      isAutoFetchEnabled,
      categoryCode,
    ],
  );

  return (
    <ListingContext.Provider value={contextValue}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => useContext(ListingContext);
