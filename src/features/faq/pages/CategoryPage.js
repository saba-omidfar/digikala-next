"use client";

import { useParams } from "next/navigation";

import FaqMobileContent from "@/features/faq/mobile/FaqMobileContent";
import FaqDesktopContent from "@/features/faq/desktop/FaqDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function CategoryPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();
  const { categoryId } = useParams();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <FaqMobileContent categoryId={categoryId} />
  ) : (
    <FaqDesktopContent categoryId={categoryId} />
  );
}
