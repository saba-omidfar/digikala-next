import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import SelectLocationModal from "../selectLocationModal/SelectLocationModal";

import { useLocation } from "@/contexts/locationContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./mobileLocationsModal.module.css";

export default function MobileLocationsModal() {
  const { openModal, closeMobileModal } = useModal();
  const { selectedLocation } = useLocation();

  function onDismiss() {
    closeMobileModal();
  }

  return (
    <>
      <BottomSheet
        open
        onDismiss={onDismiss}
        blocking
        snapPoints={({ maxHeight }) => [maxHeight, maxHeight * 0.7]}
        initialsnap={1}
        header={
          <div className={styles.header}>
            <span className={styles.title}>انتخاب آدرس</span>
            <div className="d-flex" aria-hidden="false" onClick={onDismiss}>
              <div
                className={`${styles.close_icon} cube-font-icon`}
                data-icon-name="cube-nav-close"
                data-icon=""
              ></div>
            </div>
          </div>
        }
      >
        <div className={styles.content}>
          <button type="button" className={styles.location_btn}>
            <div className="d-flex" aria-hidden="false">
              <div
                className={`${styles.location_icon} cube-font-icon`}
                data-icon-name="cube-location-auto-detect-on"
                data-icon=""
              ></div>
            </div>
            <div className="d-flex flex-column gap-1 w-100">
              <p className={styles.location_title}>موقعیت انتخابی</p>
              <p className={styles.location_address}>
                {selectedLocation?.address}
              </p>
            </div>
            <div
              className={styles.edit_icon_container}
              aria-hidden="false"
              onClick={() =>
                openModal(<SelectLocationModal isEdit />, {
                  className: "modal__select_location rounded-large",
                })
              }
            >
              <div
                className={`${styles.edit_icon} cube-font-icon`}
                data-icon-name="cube-content-edit"
                data-icon=""
              ></div>
            </div>
          </button>
          <h2 className={styles.locations_title}>آدرس‌ها</h2>
          <ul className={styles.locations_list}></ul>
        </div>
      </BottomSheet>
    </>
  );
}
