"use client";

import TermsDesktopContent from "@/features/page/pages/terms/desktop/TermDesktopContent";
import TermsMobileContent from "@/features/page/pages/terms/mobile/TermsMobileContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function TermsPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <TermsMobileContent /> : <TermsDesktopContent />;
}
