import { useState, useEffect, useCallback } from "react";

export function useMainCategories(categoryCode) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    if (!categoryCode) return;

    setLoading(true);
    let path = "";

    if (categoryCode === "dk-ds-gift-card") {
      path = `/api/dynamic-category-page/giftcard/`;
    } else {
      path = `/api/categories/${categoryCode}`;
    }

    fetch(path)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}

export function useWidgetData(widgets = []) {
  const [widgetData, setWidgetData] = useState([]);

  useEffect(() => {
    if (!widgets.length) return;

    const fetchWidgets = async () => {
      const results = await Promise.all(
        widgets.map(async (widget) => {
          if (!widget.url) return widget;

          const res = await fetch(
            `/api/home/widget-factory/widget/${widget.id}/`,
          );
          const json = await res.json();

          return {
            id: widget.id,
            type: widget.type,
            utm: widget.utm,
            data: json?.data?.data,
          };
        }),
      );

      setWidgetData(results);
    };

    fetchWidgets();
  }, [widgets]);

  return widgetData;
}
