"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function useHorizontalProducts(data) {
  const [products, setProducts] = useState(data?.products || []);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestId = useRef(0);

  useEffect(() => {
    requestId.current += 1;
    setProducts(data?.products || []);
    setActiveTab(null);
    setLoading(false);
  }, [data]);

  const handleTabClick = useCallback(
    async (tab = null) => {
      if (!tab) {
        requestId.current += 1;
        setActiveTab(null);
        setProducts(data?.products || []);
        setLoading(false);
        return;
      }

      const currentRequestId = ++requestId.current;

      setActiveTab(tab.index);
      setLoading(true);

      try {
        const match = tab.url?.match(/\/widget\/(\d+)/);

        if (!match) {
          throw new Error("شناسه ویجت در URL پیدا نشد");
        }

        const widgetId = match[1];

        const response = await fetch(
          `/api/home/widget-factory/widget/${widgetId}/?tab=${tab.index}`,
        );

        if (!response.ok) {
          throw new Error(`خطای دریافت اطلاعات: ${response.status}`);
        }

        const json = await response.json();
        const result = json?.data?.data;

        if (currentRequestId === requestId.current) {
          setProducts(result?.products ?? result?.data?.products ?? []);
        }
      } catch (error) {
        if (currentRequestId === requestId.current) {
          console.error("خطا در دریافت محصولات تب:", error);
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setLoading(false);
        }
      }
    },
    [data],
  );

  return {
    products,
    activeTab,
    loading,
    handleTabClick,
  };
}
