"use client";

import NotFoundMobile from "@/features/not-found/mobile/NotFoundMobile";
import NotFoundDesktop from "@/features/not-found/desktop/NotFoundDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function NotFoundPage() {
  const { isSmallScreen } = useScreenStatus();

  return isSmallScreen ? <NotFoundMobile /> : <NotFoundDesktop />;
}
