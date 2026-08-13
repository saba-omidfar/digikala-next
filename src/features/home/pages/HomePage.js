"use client";

import HomeMobile from "@/features/home/mobile/HomeMobile";
import HomeDesktop from "@/features/home/desktop/HomeDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

function HomePage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <HomeMobile /> : <HomeDesktop />;
}

export default HomePage;
