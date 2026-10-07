"use client";

import PaymentMobile from "@/features/cart/mobile/paymentMobile/PaymentMobile";
import PaymentDesktop from "@/features/cart/desktop/paymentDesktop/PaymentDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function PaymentPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <PaymentMobile /> : <PaymentDesktop />;
}
