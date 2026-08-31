"use client";

import React from "react";

import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "@/contexts/UserContext";

import toPersianDigits from "@/utils/toPersianDigits";
import {
  useAddProductToCart,
  useGetUserCart,
} from "@/features/cart/hooks/useCart";
import recalcCartPrices from "@/utils/recalcCartPrices";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./addToNextPurchaseModal.module.css";

export default function AddToNextPurchaseModal() {
  const { redirectToLogin } = useLoginRedirect();

  const { closeModal, closeAllModal } = useModal();
  const { user, guestCartId } = useUserContext();

  const { data: userCart } = useGetUserCart(guestCartId);

  const { basket } = recalcCartPrices(userCart?.cart);

  const { mutate: addProductToCart } = useAddProductToCart();

  const handleMoveAllToNextPurchase = () => {
    if (!user && !guestCartId) {
      redirectToLogin();
      return;
    }

    addProductToCart({
      guestCartId,
      moveAll: true,
    });

    closeAllModal();
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div className={styles.modal_title_container}>
          <div className={styles.modal_title}>ذخیره در لیست خرید بعدی</div>

          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            />
          </div>
        </div>
      </div>

      <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.modal_content}>
          <div>
            <p className={styles.modal_content_description}>
              آیا از انتقال {toPersianDigits(basket?.length || 0)} کالا به لیست
              خرید بعدی اطمینان دارید؟
            </p>

            <div className={styles.modal_content_btns_container}>
              <button
                onClick={() => closeAllModal()}
                className={`${styles.modal_content_btn} ${styles.modal_content_reject_btn}`}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  انصراف
                </div>
              </button>

              <button
                onClick={handleMoveAllToNextPurchase}
                className={`${styles.modal_content_btn} ${styles.modal_content_submit_btn}`}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  بله
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
