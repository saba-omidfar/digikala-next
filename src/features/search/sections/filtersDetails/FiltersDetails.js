import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import FilterMobileContent from "@/features/search/modals/filterModal/FilterMobileContent";
import Loading from "@/components/modules/loading/Loading";

import { useListing } from "@/contexts/ListingContext";
import { useModal } from "@/contexts/modalContext";

import "nouislider/distribute/nouislider.css";
import styles from "./filterDetails.module.css";

function FilterDetails({ activeFilter }) {
  const { closeMobileModal } = useModal();
  const {
    isLoading,
    filterExtra,
    clearFilterExtra,
    totalItems,
    hasNonSortFilters,
    removeAllFilters,
  } = useListing();

  function onDismiss() {
    closeMobileModal();
    clearFilterExtra();
  }

  return (
    <BottomSheet
      open
      onDismiss={onDismiss}
      blocking
      snapPoints={({ maxHeight }) => [0.8 * maxHeight, maxHeight]}
      header={
        <div className={styles.header_container}>
          <div className="d-flex align-items-center justify-content-between">
            <p className={styles.header_title}>{activeFilter}</p>
          </div>
          <div className="d-flex" onClick={onDismiss}>
            <div
              data-icon-name="cube-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
      footer={
        <div
          className={styles.footer_container}
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          <button
            className={`${styles.footer_btn} ${styles.footer_active_btn}`}
            onClick={() => onDismiss()}
          >
            {isLoading && (
              <div className={styles.loading_active}>
                <Loading isSmall bgColor="rgb(255,255,255)" />
              </div>
            )}
            <div
              className={`${
                isLoading ? styles.btn_content_loading : ""
              } ${styles.footer_btn_text}`}
            >
              مشاهده {totalItems?.toLocaleString("fa-IR")} کالا
            </div>
          </button>
          <button
            onClick={() => {
              removeAllFilters();
              onDismiss();
            }}
            className={`${styles.remove_filter_btn} ${
              !hasNonSortFilters ? styles.remove_filter_disabled_btn : ""
            }`}
            disabled={!hasNonSortFilters}
          >
            <div className={styles.footer_btn_text}>حذف فیلتر</div>
          </button>
        </div>
      }
    >
      {filterExtra?.isOpen && (
        <div className={styles.content_container}>
          <div>
            <div className={styles.content}>
              <FilterMobileContent />
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

export default FilterDetails;
