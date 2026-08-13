"use client";

import { useEffect } from "react";

import ProductMobileContent from "@/features/product/mobile/ProductMobileContent";
import ProductDesktopContent from "@/features/product/desktop/ProductDesktopContent";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useModal } from "@/contexts/modalContext";

export default function ProductPage({ productId }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  const { isLoadingProductDetails, addToRecentViewed } = useProductContext();
  const { openModal, closeModal } = useModal();
  const { user } = useUserContext();

  useEffect(() => {
    if (user && productId) {
      addToRecentViewed({ productId });
    }
  }, [user, productId]);

  useEffect(() => {
    if (isLoadingProductDetails) {
      openModal(<LoadingModal />, {
        name: "loading",
        className: "modal__loading rounded-medium",
      });
    } else {
      closeModal("loading");
    }
  }, [isLoadingProductDetails]);

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <ProductMobileContent productId={productId} />
  ) : (
    <ProductDesktopContent productId={productId} />
  );
}
