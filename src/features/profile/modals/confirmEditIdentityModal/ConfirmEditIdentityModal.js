"use client";

import { Sheet } from "react-modal-sheet";

import styles from "./confirmEditIdentityModal.module.css";

export default function ConfirmEditIdentityModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      detent="content-height"
      className={styles.sheet}
    >
      <Sheet.Container>
        <Sheet.Header />

        <div className={styles.header_container}>
          <div className={styles.header}>
            <div className={styles.header_title}>تغییر اطلاعات شناسایی</div>
          </div>

          <div className={styles.header_space} />
        </div>

        <Sheet.Content>
          <div>
            <div className={styles.content_title}>
              با تغییر این اطلاعات دوباره نیاز به احراز هویت خواهید داشت. آیا
              مطمئن هستید؟
            </div>

            <div className={styles.content_btns}>
              <button
                className={`${styles.content_btn} ${styles.confirm_btn}`}
                type="button"
                onClick={onSubmit}
                disabled={isLoading}
              >
                <div className={styles.content_btn_text}>
                  {isLoading ? "در حال ذخیره..." : "بله، تایید می‌کنم"}
                </div>
              </button>

              <button
                className={`${styles.content_btn} ${styles.cancle_btn}`}
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                <div className={styles.content_btn_text}>انصراف</div>
              </button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={isLoading ? undefined : onClose} />
    </Sheet>
  );
}
