import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import SellerCard from "./SellerCard";

import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./mobileSellersModal.module.css";

export default function MobileSellersModal({
  uniqueVariants,
  handleAddToCartSuccess,
}) {
  const { closeMobileModal } = useModal();

  function onDismiss() {
    closeMobileModal();
  }

  return (
    <>
      <BottomSheet
        open
        onDismiss={onDismiss}
        blocking={false}
        snapPoints={({ maxHeight }) => [maxHeight, maxHeight]}
        initialsnap={1}
        header={
          <div className={styles.header}>
            <div className="d-flex flex-column justify-content-center align-items-start">
              <p className={styles.header_title}>فروشنده‌های این کالا</p>
              <p className={styles.header_subtitle}>
                {toPersianDigits(uniqueVariants?.length)} فروشنده
              </p>
            </div>
            <div className="d-flex" onClick={onDismiss}>
              <div
                data-icon-name="cube-value-close"
                data-icon="&#xE907;"
                className={`${styles.close_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
        }
      >
        <div className={styles.content}>
          {uniqueVariants?.map((variant) => (
            <SellerCard
              key={variant?.id}
              seller={variant}
              isShowSellersModal
              handleAddToCartSuccess={handleAddToCartSuccess}
            />
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
