"use client";

import IncredibleMobileContent from "@/features/incredible/mobile/IncredibleMobileContent";
import IncredibleDesktopContent from "@/features/incredible/desktop/IncredibleDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function IncrediblePage({ categoryId }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <IncredibleMobileContent categoryId={categoryId} />
  ) : (
    <IncredibleDesktopContent categoryId={categoryId} />
  );
}
