"use client";

import ShippingMobile from "@/features/cart/mobile/shippingMobile/ShippingMobile";
import ShippingDesktop from "@/features/cart/desktop/shippingDesktop/ShippingDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ShippingPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <ShippingMobile /> : <ShippingDesktop />;
}
