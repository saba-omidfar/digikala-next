"use client";

import CompareDesktopContent from "@/features/compare/desktop/CompareDesktopContent";
import CompareMobileContent from "@/features/compare/mobile/CompareMobileContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ComparePage({ productIds }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        {isSmallScreen ? (
          <CompareMobileContent productIds={productIds} />
        ) : (
          <CompareDesktopContent productIds={productIds} />
        )}
      </div>
    </div>
  );
}
