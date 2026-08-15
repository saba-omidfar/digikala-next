"use client";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function NotFoundPage() {
  const { isSmallScreen } = useScreenStatus();

  return isSmallScreen ? <NotFoundMobile /> : <NotFoundDesktop />;
}
