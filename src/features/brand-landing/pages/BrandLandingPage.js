"use client";

import BrandLandingMobile from "@/features/brand-landing/mobile/BrandLandingMobile";
import BrandLandingDesktop from "@/features/brand-landing/desktop/BrandLandingDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function BrandLandingPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <BrandLandingMobile /> : <BrandLandingDesktop />;
}
