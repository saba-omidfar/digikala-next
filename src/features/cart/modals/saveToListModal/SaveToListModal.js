"use client";

import { useState } from "react";

import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import {
  useAddFavoriteProduct,
  useRemoveFavoriteProduct,
} from "@/features/profile/hooks/useLists";

import useScreenStatus from "@/hooks/useScreenStatus";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import SaveToListMobileSheet from "./saveToListMobileSheet/SaveToListMobileSheet";
import SaveToListDesktopModal from "./saveToListDesktopModal/SaveToListDesktopModal";

export default function SaveToListModal({
  productId,
  variantId,
  colorTitle,
  variantTitle,
}) {
  const { redirectToLogin } = useLoginRedirect();

  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const { user, guestCartId } = useUserContext();
  const { addToNextCart, setLoadingVariantId } = useCartContext();

  const { mutate: removeFavorite, isLoading: isLoadingRemoveFavorite } =
    useRemoveFavoriteProduct();
  const { mutate: addFavorite, isLoading: isLoadingAddFavorite } =
    useAddFavoriteProduct();

  const isFavorite = user?.favorite_products?.includes(String(productId));

  const [isNextCartSelected, setIsNextCartSelected] = useState(true);
  const [isWishlistSelected, setIsWishlistSelected] = useState(false);

  const isDisabled = !isNextCartSelected && !isWishlistSelected;

  const moveProductToNextCart = () => {
    if (!user?.is_logged_in && !guestCartId) {
      redirectToLogin();
      return;
    }

    setLoadingVariantId(variantId);
    closeModal();

    addToNextCart({
      guestCartId,
      variantId,
    });
  };

  const favoriteHandler = () => {
    if (isLoadingAddFavorite || isLoadingRemoveFavorite) return;

    if (!user?.is_logged_in) {
      redirectToLogin();
      return;
    }

    if (isFavorite) {
      removeFavorite(productId);
    } else {
      addFavorite(productId, {
        onSuccess: ({ success }) => {
          if (success) {
            showSnackbar("کالا به علاقه‌مندی‌ها اضافه شد");
          }
        },
      });
    }
  };

  const moveToList = () => {
    if (isDisabled) return;

    if (isNextCartSelected) {
      moveProductToNextCart();
    }

    if (isWishlistSelected) {
      favoriteHandler();
    }
  };

  return isSmallScreen ? (
    <SaveToListMobileSheet
      isDisabled={isDisabled}
      colorTitle={colorTitle}
      variantTitle={variantTitle}
      isNextCartSelected={isNextCartSelected}
      isWishlistSelected={isWishlistSelected}
      setIsNextCartSelected={setIsNextCartSelected}
      setIsWishlistSelected={setIsWishlistSelected}
      moveToList={moveToList}
    />
  ) : (
    <SaveToListDesktopModal
      isDisabled={isDisabled}
      colorTitle={colorTitle}
      variantTitle={variantTitle}
      isNextCartSelected={isNextCartSelected}
      isWishlistSelected={isWishlistSelected}
      setIsNextCartSelected={setIsNextCartSelected}
      setIsWishlistSelected={setIsWishlistSelected}
      moveToList={moveToList}
    />
  );
}
