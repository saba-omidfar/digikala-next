"use client";

import { useEffect } from "react";

import ProductMobileContent from "@/features/product/mobile/ProductMobileContent";
import ProductDesktopContent from "@/features/product/desktop/ProductDesktopContent";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ProductPage({ productId }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  const { isLoadingProductDetails, addToRecentViewed } = useProductContext();
  const { user } = useUserContext();

  useEffect(() => {
    if (user && productId) {
      addToRecentViewed({ productId });
    }
  }, [user, productId]);

  if (isLoadingProductDetails) {
    return (
      <div className="cart_overlay">
        <div className="page_loading_container">
          <LoadingModal />
        </div>
      </div>
    );
  }

  if (!isClientReady) return null;

  return isSmallScreen ? <ProductMobileContent /> : <ProductDesktopContent />;
}
