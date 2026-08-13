"use client";

import ProductListMobileContent from "@/features/product-list/mobile/ProductListMobileContent";
import ProductListDesktopContent from "@/features/product-list/desktop/ProductListDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ProductListPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <ProductListMobileContent />
  ) : (
    <ProductListDesktopContent />
  );
}
