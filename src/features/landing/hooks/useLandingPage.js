"use client";
import { useState, useEffect, useCallback } from "react";

export function useGetLanding(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`/api/dynamic-landing/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
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

export function useGetWidgetIdLanding(widgetId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!widgetId) return;

    setLoading(true);

    fetch(`/api/dynamic-landing/widget/${widgetId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [widgetId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}
