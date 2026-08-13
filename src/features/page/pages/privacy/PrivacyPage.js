"use client";

import PrivacyDesktopContent from "@/features/page/pages/privacy/desktop/PrivacyDesktopContent";
import PrivacyMobileContent from "@/features/page/pages/privacy/mobile/PrivacyMobileContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function PrivacyPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <PrivacyMobileContent /> : <PrivacyDesktopContent />;
}
