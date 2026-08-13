"use client";

import IncredibleTeasingMobileContent from "@/features/incredible-offers-teasing/mobile/IncredibleTeasingMobileContent";
import IncredibleTeasingDesktopContent from "@/features/incredible-offers-teasing/desktop/IncredibleTeasingDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function IncredibleTeasingPage({ categoryId }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <IncredibleTeasingMobileContent categoryId={categoryId} />
  ) : (
    <IncredibleTeasingDesktopContent categoryId={categoryId} />
  );
}
