import { useModal } from "@/contexts/modalContext";
import { useRouter } from "next-nprogress-bar";

import styles from "./digiplusModal.module.css";

function DigiplusModal() {
  const router = useRouter();
  const { closeModal } = useModal();

  const goToPlusPage = () => {
    router.push("/plus/landing/");
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.header}>
        <div className={styles.header_title_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <p className={styles.header_title}>
              <span className="position-relative">
                دسترسی زودتر و تخفیف بیشتر
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column overflow-y-auto flex-grow-1">
        <div className={styles.content}>
          <p className={styles.content_text}>
            ‌پلاسی‌ها هر شب یک ساعت زودتر از کاربرهای عادی (ساعت ۱۱ شب)
            می‌توانند از شگفت‌انگیزها خرید کنند. همچنین روی بعضی از کالاها،
            بیشتر از دیگر کاربرها تخفیف می‌گیرند.
          </p>
          <div className={styles.footer}>
            <button
              className={`${styles.footer_btn} ${styles.footer_close_btn}`}
              id="plus-on-modal-i-understand"
              onClick={() => closeModal()}
            >
              <div className="d-flex alig-items-center justify-content-center position-relative flex-grow-1">
                متوجه شدم
              </div>
            </button>
            <button
              className={`${styles.footer_btn} ${styles.footer_buy_subscription_btn}`}
              id="plus-on-modal-buy-subscription"
              onClick={() => goToPlusPage()}
            >
              <div className="d-flex alig-items-center justify-content-center position-relative flex-grow-1">
                خرید اشتراک پلاس
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DigiplusModal;
