import { useRouter } from "next/navigation";
import { useState } from "react";

import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import useScreenStatus from "@/hooks/useScreenStatus";
import { useProductContext } from "@/contexts/ProductContext";

import SaveToListMobileSheet from "./saveToListMobileSheet/SaveToListMobileSheet";
import SaveToListDesktopModal from "./saveToListDesktopModal/SaveToListDesktopModal";

function SaveToListModal({ productId, variantId, colorTitle, variantTitle }) {
  const router = useRouter();

  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const { user, guestCartId } = useUserContext();
  const { addToNextCart, setLoadingVariantId } = useCartContext();
  const {
    addFavorite,
    isLoadingAddFavorite,
    favotiteStatus,
    isLoadingFavoriteStatus,
  } = useProductContext();

  const [isNextCartSelected, setIsNextCartSelected] = useState(true);
  const [isWishlistSelected, setIsWishlistSelected] = useState(false);

  const isDisabled = !isNextCartSelected && !isWishlistSelected;

  const moveProductToNextCart = () => {
    if (!user && !guestCartId) {
      router.push("/users/login");
      return;
    }
    setLoadingVariantId(variantId);
    closeModal();

    addToNextCart({
      guestCartId,
      variantId,
    });

    return;
  };

  const favoriteHandler = () => {
    if (isLoadingFavoriteStatus || isLoadingAddFavorite) return;

    if (!user) {
      router.push("/users/login");
      return;
    }

    if (!favotiteStatus?.is_favorite) {
      addFavorite(
        {
          productId,
        },
        {
          onSuccess: ({ success }) => {
            if (success) {
              closeModal();
            }
          },
        },
      );
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

export default SaveToListModal;
