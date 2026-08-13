"use client";

import AmazingSliderDesktop from "./desktop/AmazingSliderDesktop";
import AmazingSliderMobile from "./mobile/AmazingSliderMobile";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function AmazingSlider({
  incredibbleOffers,
  backgroundColor,
  backgroundBg,
}) {
  const { isSmallScreen } = useScreenStatus();

  return isSmallScreen ? (
    <AmazingSliderMobile
      incredibbleOffers={incredibbleOffers}
      backgroundColor={backgroundColor}
      backgroundBg={backgroundBg}
    />
  ) : (
    <AmazingSliderDesktop
      incredibbleOffers={incredibbleOffers}
      backgroundColor={backgroundColor}
      backgroundBg={backgroundBg}
    />
  );
}
