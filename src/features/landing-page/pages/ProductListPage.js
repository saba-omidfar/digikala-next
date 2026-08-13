"use client";

import ProductListMobileContent from "@/features/landing-page/mobile/ProductListMobileContent";
import ProductListDesktopContent from "@/features/landing-page/desktop/ProductListDesktopContent";

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
