"use client";

import BrandMobile from "@/features/brand/mobile/BrandMobile";
import BrandDesktop from "@/features/brand/desktop/BrandDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function BrandPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <BrandMobile /> : <BrandDesktop />;
}
