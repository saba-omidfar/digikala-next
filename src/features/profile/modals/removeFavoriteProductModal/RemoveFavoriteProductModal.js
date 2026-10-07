import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useRemoveFavoriteProduct } from "@/features/profile/hooks/useLists";

import styles from "./removeFavoriteProductModal.module.css";
import { useUserContext } from "@/contexts/UserContext";

export default function RemoveFavoriteProductModal({ product, refetch }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { user } = useUserContext();

  const isFavorite = user?.favorite_products?.includes(String(product?.id));

  const { mutate: removeFavorite, isLoading } = useRemoveFavoriteProduct();

  const removeFavoriteProductHandler = () => {
    if (isLoading || !product?.id) return;

    if (isFavorite) {
      removeFavorite(product.id, {
        onSuccess: () => {
          showSnackbar("کالا با موفقیت از لیست علاقه‌مندی‌ها حذف شد.");
          closeModal("remove-notification");
          refetch();
        },
      });
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>حذف از لیست</div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("remove-notification")}
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
              آیا از حذف این کالا از لیست علاقه‌مندی‌ها اطمینان دارید؟
            </p>

            <div className={styles.content_btns_container}>
              <button
                className={styles.cancle_btn}
                onClick={() => closeModal("remove-notification")}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  انصراف
                </div>
              </button>

              <button
                className={styles.remove_btn}
                onClick={removeFavoriteProductHandler}
                disabled={isLoading}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  حذف کالا
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
