"use client";

import BestSellingMobile from "@/features/best-selling/mobile/BestSellingMobile";
import BestSellingDesktop from "@/features/best-selling/desktop/BestSellingDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function BestSellingPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <BestSellingMobile /> : <BestSellingDesktop />;
}
