import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./cartActionModal.module.css";

function CartActionModal({ type }) {
  const { closeMobileModal, closeModal } = useModal();
  const { redirectToLogin } = useLoginRedirect();

  const { user, guestCartId } = useUserContext();
  const { addProductToCart, removeFromNextCart } = useCartContext();

  const moveAllProuctsToBasket = () => {
    if (!user && !guestCartId) {
      redirectToLogin();
      return;
    }

    addProductToCart(
      {
        guestCartId,
        fromNextCart: true,
        moveAll: true,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            setActiveTab("favorites");
            closeModal();
          }
        },
      },
    );
  };

  const removeAllProductFromBasket = () => {
    if (!user && !guestCartId) {
      redirectToLogin();
      return;
    }

    removeFromNextCart(
      {
        guestCartId,
        removeAll: true,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            setActiveTab("favorites");
            closeModal();
          }
        },
      },
    );
  };

  return (
    <BottomSheet
      open
      onDismiss={closeMobileModal}
      blocking
      expandOnContentDrag
      skipInitialTransition={false}
      defaultSnap={({ minHeight }) => minHeight}
      snapPoints={({ minHeight }) => [minHeight]}
      className={styles.sheet}
    >
      <div className={styles.content}>
        <div className="d-flex flex-column">
          <div className={styles.list_item} onClick={moveAllProuctsToBasket}>
            <div className={styles.item}>
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.item_icon} cube-font-icon`}
                  data-icon-name="cube-action-favorite-list"
                  data-icon=""
                ></div>
              </div>
              <span className={styles.item_title}>
                {type === "next-cart"
                  ? "انتقال همه به سبد خرید"
                  : "انتقال همه به لیست خرید بعدی"}
              </span>
            </div>
          </div>
          <div className={styles.line_container}>
            <div className={styles.line}>
              <div className={styles.line_bg}></div>
            </div>
          </div>
          <div
            className={styles.list_item}
            onClick={removeAllProductFromBasket}
          >
            <div className={styles.item}>
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.item_icon} cube-font-icon`}
                  data-icon-name="cube-action-favorite-list"
                  data-icon=""
                ></div>
              </div>
              <span className={styles.item_title}>حذف همه</span>
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}

export default CartActionModal;
