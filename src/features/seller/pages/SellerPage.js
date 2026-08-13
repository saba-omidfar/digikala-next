"use client";

import SellerMobileContent from "@/features/seller/pages/mobile/SellerMobileContent";
import SellerDesktopContent from "@/features/seller/pages/desktop/SellerDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function SellerPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <SellerMobileContent /> : <SellerDesktopContent />;
}
