"use client";

import LandingMobileContent from "@/features/landing/mobile/LandingMobileContent";
import LandingDesktopContent from "@/features/landing/desktop/landingDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function LandingPage({ id }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <LandingMobileContent id={id} />
  ) : (
    <LandingDesktopContent id={id} />
  );
}
