import React from "react";

import { useModal } from "@/contexts/modalContext";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./removeAllProductsFromBasketModal.module.css";

export default function RemoveAllProductsFromBasketModal() {
  const { closeModal, closeAllModal } = useModal();
  const { guestCartId } = useUserContext();
  const { removeCart } = useCartContext();

  const removeAllProuctsToNextPurchaseBasket = () => {
    removeCart(guestCartId);
    closeAllModal();
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div className={styles.modal_title_container}>
          <div className={styles.modal_title}>حذف همه کالاها از سبد</div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.modal_content}>
          <div>
            <p className={styles.modal_content_description}>
              همه کالاها را از سبد حذف می‌کنید؟
            </p>
            <div className={styles.modal_content_btns_container}>
              <button
                onClick={() => closeAllModal()}
                className={`${styles.modal_content_btn} ${styles.modal_content_reject_btn}`}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  بازگشت
                </div>
              </button>
              <button
                onClick={removeAllProuctsToNextPurchaseBasket}
                className={`${styles.modal_content_btn} ${styles.modal_content_submit_btn}`}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  حذف همه
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
