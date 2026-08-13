"use client";

import { useState, useCallback } from "react";

export function useWidget(widgetId) {
  const [widgetData, setWidgetData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWidget = useCallback(async () => {
    if (!widgetId) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/home/${widgetId}/`);

      const json = await res.json();

      setWidgetData(json?.data ?? null);
    } catch (error) {
      console.error("Widget fetch error:", error);
      setWidgetData(null);
    } finally {
      setLoading(false);
    }
  }, [widgetId]);

  return {
    widgetData,
    loading,
    fetchWidget,
  };
}
