import { useModal } from "@/contexts/modalContext";

import styles from "./removeAddressModal.module.css";

export default function RemoveAddressModal({ onRemove }) {
  const { closeModal } = useModal();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title}>حذف آدرس</div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("remove-address")}
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
              آیا از حذف این آدرس از لیست آدرس‌ها اطمینان دارید؟
            </p>
            <div className={styles.footer}>
              <button
                className={`${styles.cancle_btn} ${styles.footer_btn}`}
                onClick={() => closeModal("remove-address")}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  انصراف
                </div>
              </button>
              <button
                className={`${styles.remove_btn} ${styles.footer_btn}`}
                onClick={onRemove}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  ﺣﺬف آدرس
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
