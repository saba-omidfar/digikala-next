import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { useModal } from "@/contexts/modalContext";

import styles from "./digiclubModal.module.css";

function DigiclubModal() {
  const { closeMobileModal } = useModal();

  const handleDismiss = () => {
    closeMobileModal();
  };

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      header={
        <div className={styles.header}>
          <span className={styles.header_title}>امتیاز دیجی‌کلاب</span>
          <div className="d-flex" aria-hidden="false" onClick={handleDismiss}>
            <div
              data-icon-name="cube-nav-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
    >
      <div className={styles.content_container}>
        <div className={styles.content}>
          <p className={styles.content_text}>
            بعد از پایان مهلت مرجوعی، برای دریافت امتیاز به صفحه ماموریت‌های
            کلابی سر بزنید.
          </p>
        </div>
        <div className={styles.close_btn} onClick={handleDismiss}>
          متوجه شدم
        </div>
      </div>
    </BottomSheet>
  );
}
export default DigiclubModal;
