import { useCallback } from "react";

import CompareModal from "@/features/compare/modals/compareModal/CompareModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./selectProductCard.module.css";

export default function SelectProductCard({ productIds }) {
  const { openModal } = useModal();

  const handleOpenModal = useCallback(() => {
    openModal(<CompareModal productIds={productIds} />, {
      name: "compare",
      className: "modal__compare rounded-medium",
    });
  }, [openModal, productIds]);

  return (
    <div className={styles.select_product} onClick={handleOpenModal}>
      <button className={styles.select_product_btn}>
        <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
          انتخاب کالا
        </div>
      </button>
    </div>
  );
}
