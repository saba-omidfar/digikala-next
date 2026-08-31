"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";

import qs from "qs";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { useSearch } from "@/hooks/useSearch";
import debounce from "@/utils/debounce";

const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const router = useRouter();

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

  // INITIAL PARAMS
  const getInitialParams = () => {
    const initial = {};

    searchParams.forEach((value, key) => {
      const nestedMatch = key.match(/^(.+)\[(.+)\]\[(\d+)\]$/);
      const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
      const objectMatch = key.match(/^(.+)\[(.+)\]$/);

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

      if (arrayMatch) {
        const mainKey = arrayMatch[1];

        if (!initial[mainKey]) {
          initial[mainKey] = [];
        }

        initial[mainKey].push(value);

        return;
      }

      if (objectMatch) {
        const mainKey = objectMatch[1];
        const subKey = objectMatch[2];

        if (!initial[mainKey]) {
          initial[mainKey] = {};
        }

        initial[mainKey][subKey] = value;

        return;
      }

      initial[key] = value;
    });

    return initial;
  };

  const [params, setParams] = useState(getInitialParams);

  const paramsRef = useRef(params);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

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

  // UPDATE URL
  const updateUrl = useCallback(
    (newParams) => {
      const cleanedParams = { ...newParams };

      Object.keys(cleanedParams).forEach((key) => {
        const value = cleanedParams[key];

        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "object" &&
            !Array.isArray(value) &&
            Object.keys(value).length === 0)
        ) {
          delete cleanedParams[key];
        }
      });

      const queryString = qs.stringify(cleanedParams, {
        encode: true,
        arrayFormat: "bracket",
        indices: true,
      });

      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      const currentUrl = `${window.location.pathname}${window.location.search}`;

      if (newUrl === currentUrl) {
        return;
      }

      router.push(newUrl, undefined, {
        scroll: false,
      });
    },
    [router],
  );

  // SEARCH
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

  // SEARCH TERM
  useEffect(() => {
    setParams((prev) => {
      const next = {
        ...prev,
        ...(searchTerm ? { q: searchTerm } : {}),
      };

      if (!searchTerm) {
        delete next.q;
      }

      return next;
    });
  }, [searchTerm]);

  // FILTERS
  useEffect(() => {
    const filtersWidget = Array.isArray(data)
      ? data.find((widget) => widget.type === "filters")?.data
      : data?.filters;

    const allFilters =
      filtersWidget &&
      Object.entries(filtersWidget).map(([key, value]) => ({
        key,
        ...value,
      }));

    setFilters(allFilters);
  }, [data]);

  // SORT LABEL
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

  // FILTER EXTRA
  const clearFilterExtra = () => {
    setFilterExtra({
      filterItem: undefined,
      filterKey: null,
      filterTitle: null,
      filterOptions: null,
      isOpen: false,
    });
  };

  // UPDATE PARAM
  const updateParams = useCallback(
    (key, value) => {
      const currentParams = paramsRef.current;

      const newParams = {
        ...currentParams,
      };

      if (value === undefined || value === null || value === "") {
        delete newParams[key];
      } else {
        newParams[key] = value;
      }

      paramsRef.current = newParams;

      setParams(newParams);

      updateUrl(newParams);
    },
    [updateUrl],
  );

  // SWITCH FILTER
  const switchFiltersChangeHandler = (switchFilter) => {
    const isActive = !!paramsRef.current[switchFilter];

    updateParams(switchFilter, isActive ? undefined : "1");
  };

  const handleSwitchChange = (event) => {
    const { name } = event.target;

    const isActive = !!paramsRef.current[name];

    updateParams(name, isActive ? undefined : "1");
  };

  // REMOVE ALL FILTERS
  const removeAllFilters = () => {
    const current = paramsRef.current;

    const newParams = {};

    if (current.q) {
      newParams.q = current.q;
    }

    if (current.categoryId) {
      newParams.categoryId = current.categoryId;
    }

    if (current.category_id) {
      newParams.category_id = current.category_id;
    }

    if (current.catgeory_id) {
      newParams.catgeory_id = current.catgeory_id;
    }

    if (current.categoryCode) {
      newParams.categoryCode = current.categoryCode;
    }

    paramsRef.current = newParams;

    setParams(newParams);

    updateUrl(newParams);
  };

  // SORT
  const sortDefaultChangeHandler = (sortOption) => {
    setSortDefault(sortOption);

    updateParams("sort", sortOption.id);
  };

  // PRICE
  const normalizeRange = (values) => {
    const sorted = values.map(Number).sort((a, b) => a - b);

    return [sorted[0], sorted[1]];
  };

  const updatePrice = useMemo(
    () =>
      debounce(({ min, max }) => {
        const currentParams = paramsRef.current;

        const newParams = {
          ...currentParams,
          price: {
            ...(currentParams.price || {}),
            ...(min == null ? {} : { min: String(min) }),
            ...(max == null ? {} : { max: String(max) }),
          },
        };

        if (!newParams.price.min && !newParams.price.max) {
          delete newParams.price;
        }

        paramsRef.current = newParams;

        setParams(newParams);

        updateUrl(newParams);
      }, 700),
    [updateUrl],
  );

  const priceInputChangeHandler = ({ min, max }) => {
    updatePrice({
      min,
      max,
    });
  };

  const priceSliderChangeHandler = (values) => {
    const [min, max] = normalizeRange(values);

    updatePrice({
      min,
      max,
    });
  };

  // PRICE INPUT FOCUS
  const focusInputHandler = (event) => {
    const { name, value } = event.target;

    if (value === "0") {
      const currentParams = paramsRef.current;

      const updatedPrice = {
        ...(currentParams.price || {}),
      };

      delete updatedPrice[name];

      const newParams = {
        ...currentParams,
      };

      if (Object.keys(updatedPrice).length > 0) {
        newParams.price = updatedPrice;
      } else {
        delete newParams.price;
      }

      paramsRef.current = newParams;

      setParams(newParams);

      updateUrl(newParams);
    }
  };

  // COLORS
  const colorsPalleteSellectHandler = (color) => {
    const currentParams = paramsRef.current;

    const currentColorPalettes = currentParams.color_palettes || [];

    const colorId = String(color.id);

    const isSelected = currentColorPalettes.includes(colorId);

    const updatedColorPalettes = isSelected
      ? currentColorPalettes.filter((c) => c !== colorId)
      : [...currentColorPalettes, colorId];

    const newParams = {
      ...currentParams,
    };

    if (updatedColorPalettes.length) {
      newParams.color_palettes = updatedColorPalettes;
    } else {
      delete newParams.color_palettes;
    }

    paramsRef.current = newParams;

    setParams(newParams);

    updateUrl(newParams);
  };

  // CHECKBOX FILTER
  const filterCheckboxChangeHandler = ({ key, id, title, checked }) => {
    const currentParams = paramsRef.current;

    const value = String(id ?? title);

    const currentValues = currentParams[key] || [];

    const updatedValues = checked
      ? [...new Set([...currentValues, value])]
      : currentValues.filter((item) => String(item) !== value);

    const newParams = {
      ...currentParams,
    };

    if (!updatedValues.length) {
      delete newParams[key];
    } else {
      newParams[key] = updatedValues;
    }

    paramsRef.current = newParams;

    setParams(newParams);

    updateUrl(newParams);
  };

  // COMPUTED VALUES
  const hasNonSortFilters = Object.keys(params).some(
    (key) =>
      key !== "sort" &&
      key !== "q" &&
      key !== "catgeory_id" &&
      key !== "categoryId" &&
      key !== "category_id",
  );

  const filtersCount = useMemo(() => {
    return Object.keys(params).filter(
      (key) =>
        key !== "q" &&
        key !== "sort" &&
        key !== "categoryId" &&
        key !== "category_id" &&
        key !== "catgeory_id",
    ).length;
  }, [params]);

  const contextValue = useMemo(
    () => ({
      categoryId,
      promotionId,

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
      sortDefault,

      params,

      updateParams,
      switchFiltersChangeHandler,
      handleSwitchChange,
      removeAllFilters,
      sortDefaultChangeHandler,

      activeCategory,

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
