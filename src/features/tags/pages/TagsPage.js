"use client";

import TagsMobile from "@/features/tags/mobile/TagsMobile";
import TagsDesktop from "@/features/tags/desktop/TagsDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function TagsPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <TagsMobile /> : <TagsDesktop />;
}
