"use client";

import PlusMobile from "@/features/plus/mobile/plusMobile/PlusMobile";
import PlusDesktop from "@/features/plus/desktop/plusDesktop/PlusDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function PlusPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <PlusMobile /> : <PlusDesktop />;
}
