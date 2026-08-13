"use client";

import AmazingSliderDesktop from "./desktop/AmazingSliderDesktop";
import AmazingSliderMobile from "./mobile/AmazingSliderMobile";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function AmazingSlider({ incredibbleOffers }) {
  const { isSmallScreen } = useScreenStatus();

  return isSmallScreen ? (
    <AmazingSliderMobile incredibbleOffers={incredibbleOffers} />
  ) : (
    <AmazingSliderDesktop incredibbleOffers={incredibbleOffers} />
  );
}
