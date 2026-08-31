"use client";

import MainMobileContent from "@/features/main/mobile/MainMobileContent";
import MainDesktopContent from "@/features/main/desktop/MainDesktopContent";

import { useMainCategories } from "@/features/main/hooks/useMainCategories";
import useScreenStatus from "@/hooks/useScreenStatus";

export default function MainPage({ categoryCode }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();
  const { data, loading } = useMainCategories(categoryCode);

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <MainMobileContent
      data={data}
      loading={loading}
      title={data?.category?.title_fa}
      categoryCode={categoryCode}
    />
  ) : (
    <MainDesktopContent
      data={data}
      loading={loading}
      title={data?.category?.title_fa}
      categoryCode={categoryCode}
    />
  );
}
