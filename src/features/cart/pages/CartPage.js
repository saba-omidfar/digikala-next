"use client";

import CartMobile from "@/features/cart/mobile/CartMobile";
import CartDesktop from "@/features/cart/desktop/CartDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function CartPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? <CartMobile /> : <CartDesktop />;
}
