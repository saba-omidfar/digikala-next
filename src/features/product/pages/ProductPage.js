"use client";

import { useEffect } from "react";

import ProductMobileContent from "@/features/product/mobile/ProductMobileContent";
import ProductDesktopContent from "@/features/product/desktop/ProductDesktopContent";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useUserContext } from "@/contexts/UserContext";
import {
  useGetProductDetails,
  useAddRecentViewedProduct,
} from "@/hooks/useProduct";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ProductPage({ productId }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  const { mutate: addRecentViewedProduct } = useAddRecentViewedProduct();
  const { isLoading: isLoadingProductDetails } =
    useGetProductDetails(productId);

  const { user } = useUserContext();

  useEffect(() => {
    if (!user?.is_logged_in && !productId) return;

    addRecentViewedProduct(productId);
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
