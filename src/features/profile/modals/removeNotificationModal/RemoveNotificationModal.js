import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useRemoveObservedProduct } from "@/features/profile/hooks/useLists";

import styles from "./removeNotificationModal.module.css";

export default function RemoveNotificationModal({ product, refetch }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const {
    mutate: removeObservedProduct,
    isLoading: isLoadingRemoveObservedProduct,
  } = useRemoveObservedProduct();

  const removeNotificationHandler = () => {
    if (isLoadingRemoveObservedProduct) return;

    removeObservedProduct(
      {
        productId: product?.id,
      },
      {
        onSuccess: ({ success }) => {
          if (!success) return;

          showSnackbar("حذف اطلاع‌رسانی با موفقیت انجام شد");
          closeModal("remove-notification");
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
              آیا از حذف این کالا از لیست اطلاع‌رسانی‌ها اطمینان دارید؟
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
                onClick={() => removeNotificationHandler()}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  ﺣﺬف ﮐﺎﻟﺎ
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
