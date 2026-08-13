import React from "react";

import { useListing } from "@/contexts/ListingContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./filterFooter.module.css";

function FilterFooter() {
  const { closeModal } = useModal();
  const { totalItems, hasNonSortFilters, removeAllFilters } = useListing();

  return (
    <div className={styles.modal_footer_container}>
      <div className={styles.modal_footer}>
        <button
          className={`${styles.modal_footer_btn} ${styles.modal_footer_active_btn}`}
          onClick={() => closeModal()}
        >
          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
            مشاهده {totalItems?.toLocaleString("fa-IR")} کالا
          </div>
        </button>
        <button
          onClick={removeAllFilters}
          className={`${styles.remove_filter_btn} ${
            !hasNonSortFilters ? styles.remove_filter_disabled_btn : ""
          }`}
          disabled={!hasNonSortFilters}
        >
          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
            حذف فیلتر
          </div>
        </button>
      </div>
    </div>
  );
}

export default FilterFooter;
