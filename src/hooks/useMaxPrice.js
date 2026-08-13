import { useState, useEffect } from "react";
import { useGetAllCategoryProducts } from "@/hooks/useSearch";

export function useMaxPrice(categoryCode) {
  const [maxPrice, setMaxPrice] = useState(1);

  const { data: allProducts, isLoading } =
    useGetAllCategoryProducts(categoryCode);

  useEffect(() => {
    if (isLoading || !allProducts?.length) return;

    const max = Math.max(
      ...allProducts.map(
        (p) => p.productDefaultVariant?.variantPrice?.priceSellingPrice || 0
      )
    );

    setMaxPrice(max);
  }, [allProducts, isLoading]);

  return maxPrice;
}
