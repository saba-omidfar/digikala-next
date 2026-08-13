import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { useModal } from "@/contexts/modalContext";

import styles from "./returnReasonMobileSheet.module.css";

export default function ReturnReasonMobileSheet({ description }) {
  const { closeMobileModal } = useModal();

  const handleDismiss = () => {
    closeMobileModal();
  };

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      expandOnContentDrag
      skipInitialTransition={false}
      snapPoints={({ maxHeight }) => [maxHeight] * 0.6}
      defaultSnap={({ maxHeight }) => maxHeight}
      className={styles.sheet}
      header={
        <div className={styles.header}>
          <span className={styles.header_title}>شرایط بازگشت کالا</span>
          <div className="d-flex" aria-hidden="false" onClick={handleDismiss}>
            <div
              className={`${styles.close_icon} cube-font-icon`}
              data-icon-name="cube-nav-close"
              data-icon="&#xE907;"
            />
          </div>
        </div>
      }
    >
      <div className={styles.content_container}>
        <div className={styles.content}>
          <p className={styles.content_title}>{description}</p>
        </div>
        <div className={styles.footer_btn} onClick={handleDismiss}>
          متوجه شدم
        </div>
      </div>
    </BottomSheet>
  );
}
