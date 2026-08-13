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
