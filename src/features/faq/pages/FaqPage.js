"use client";

import FaqMobileContent from "@/features/faq/mobile/FaqMobileContent";
import FaqDesktopContent from "@/features/faq/desktop/FaqDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function FaqPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column">
        {isSmallScreen ? <FaqMobileContent /> : <FaqDesktopContent />}
      </div>
    </div>
  );
}
