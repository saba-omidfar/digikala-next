import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useRemoveRecentViewedProduct } from "@/hooks/useProduct";

import styles from "./removeUserHistoryProductModal.module.css";

export default function RemoveUserHistoryProductModal({ product, refetch }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { mutate: removeRecentViewedProduct, isLoading } =
    useRemoveRecentViewedProduct();

  const removeUserHistoryProductHandler = () => {
    removeRecentViewedProduct(product.id, {
      onSuccess: ({ success }) => {
        if (success) {
          closeModal("remove-user-history");
          showSnackbar("محصول از بازدیدهای اخیر حذف شد");
          refetch();
        }
      },
    });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>حذف از بازدیدهای اخیر</div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("remove-user-history")}
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
              {`آیا از حذف ${product.title_fa} از لیست علاقه‌مندی‌ها اطمینان دارید؟`}
            </p>

            <div className={styles.content_btns_container}>
              <button
                className={styles.cancle_btn}
                onClick={() => closeModal("remove-user-history")}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  انصراف
                </div>
              </button>

              <button
                className={styles.remove_btn}
                onClick={removeUserHistoryProductHandler}
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
