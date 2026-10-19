"use client";

import { useEffect } from "react";

import ProductMobileContent from "@/features/product/mobile/ProductMobileContent";
import ProductDesktopContent from "@/features/product/desktop/ProductDesktopContent";

import { useUserContext } from "@/contexts/UserContext";
import { useAddRecentViewedProduct } from "@/hooks/useProduct";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ProductPage({ productId }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  const { mutate: addRecentViewedProduct } = useAddRecentViewedProduct();

  const { user } = useUserContext();

  useEffect(() => {
    if (!user?.is_logged_in && !productId) return;

    addRecentViewedProduct(productId);
  }, [user, productId]);

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <ProductMobileContent productId={productId} />
  ) : (
    <ProductDesktopContent productId={productId} />
  );
}
