import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useRemoveWishlistProduct } from "@/features/profile/hooks/useLists";

import styles from "./removeWishlistProductModal.module.css";

export default function RemoveWishlistProductModal({ list, product, refetch }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { removeWishlistProduct, isRemoving } = useRemoveWishlistProduct();

  const removeWishlistProductHandler = () => {
    if (isRemoving || !product?.id || !list?.id) return;

    removeWishlistProduct(
      {
        wishlistId: list.id,
        productId: product.id,
      },
      {
        onSuccess: () => {
          closeModal("remove-wishlist");
          showSnackbar("کالا با موفقیت از لیست حذف شد.");
          refetch();
        },
      },
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>حذف از لیست</div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("remove-wishlist")}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.close_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <div>
            <p className={styles.content_description}>
              آیا از حذف این محصول از لیست اطمینان دارید؟
            </p>

            <div className={styles.content_btns_container}>
              <button
                className={styles.cancle_btn}
                onClick={() => closeModal("remove-wishlist")}
                disabled={isRemoving}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  انصراف
                </div>
              </button>

              <button
                className={styles.remove_btn}
                onClick={removeWishlistProductHandler}
                disabled={isRemoving}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  حذف از لیست
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
