"use client";

import { useRouter } from "next/navigation";

import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./nextCartModal.module.css";

function NextCartModal() {
  const router = useRouter();

  const { closeModal } = useModal();
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
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className="d-flex align-items-center">
          <div className={styles.header_icon_container}>
            <div className={styles.close_btn_container_container}>
              <button
                type="button"
                className={styles.close_btn_container}
                aria-label="بستن"
                onClick={() => closeModal()}
              >
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.close_icon} cube-font-icon`}
                    data-icon-name="cube-nav-close"
                    data-icon=""
                  ></div>
                </div>
              </button>
              <span className="css-1x24dzj css-1ujqeks"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content_container}>
          <div className={styles.content}>
            <div
              id="cart-save-all-next-cart"
              className={styles.btn_container}
              onClick={moveAllProuctsToBasket}
            >
              <div className={styles.btn}>
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.btn_icon} cube-font-icon`}
                    data-icon-name="cube-shop-cart-outline"
                    data-icon=""
                  ></div>
                </div>
                <span className={styles.btn_text}>انتقال همه به سبد خرید</span>
              </div>
            </div>
            <div className={styles.line_container}>
              <div className={styles.line}>
                <div className={styles.line_bg}></div>
              </div>
            </div>
            <div
              id="cart-save-all-next-cart"
              className={styles.btn_container}
              onClick={removeAllProductFromBasket}
            >
              <div className={styles.btn}>
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.btn_icon} cube-font-icon`}
                    data-icon-name="cube-action-delete"
                    data-icon=""
                  ></div>
                </div>
                <span className={styles.btn_text}>حذف همه</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextCartModal;
