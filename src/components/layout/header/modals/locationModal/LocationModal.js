import { useModal } from "@/contexts/modalContext";
import { useLocation } from "@/contexts/locationContext";

import SelectLocationModal from "../selectLocationModal/SelectLocationModal";

import styles from "./locationModal.module.css";

function LocationModal() {
  const { openModal, closeModal } = useModal();
  const { selectedLocation } = useLocation();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <span className={styles.title}></span>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal()}
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
      <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
        <div className="d-flex flex-column flex-grow-1">
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
                  {selectedLocation.address}
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
        </div>
      </div>
    </div>
    // <div className={styles.layout}>
    //   <div className={styles.header_container}>
    //     <div className={styles.header}>
    //       <div className={styles.title}></div>
    //       <div
    //         className="d-flex"
    //         aria-hidden="false"
    //         onClick={() => closeModal()}
    //       >
    //         <svg
    //           data-test-id="close-modal-icon-button"
    //           className={styles.close_icon}
    //         >
    //           <use href="#close"></use>
    //         </svg>
    //       </div>
    //     </div>
    //     <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
    //       <div className="d-flex flex-column flex-grow-1">
    //         <div className={styles.content} dir="rtl">
    //           <button type="button" className={styles.select_addres_btn}>
    //             <div className="d-flex" aria-hidden="false">
    //               <div
    //                 className={`${styles.select_location_icon} cube-font-icon`}
    //                 data-icon-name="cube-location-auto-detect-on"
    //                 data-icon=""
    //               ></div>
    //             </div>
    //             <div className="d-flex flex-column gap-1">
    //               <p className={styles.select_addres_text}>
    //                 انتخاب موقعیت از نقشه
    //               </p>
    //             </div>
    //           </button>
    //           <h2 className={styles.locations_title}>آدرس‌ها</h2>
    //           <ul className={styles.locations_container}>
    //             <li>
    //               <button type="button" className={styles.location_btn}>
    //                 <div className={styles.location_icon_container}>
    //                   <div className="d-flex" aria-hidden="false">
    //                     <div
    //                       className={`${styles.location_icon} cube-font-icon`}
    //                       data-icon-name="cube-location-pin"
    //                       data-icon=""
    //                     ></div>
    //                   </div>
    //                 </div>
    //                 <div className={styles.location_text_container}>
    //                   <p className={styles.location_text}>
    //                     {selectedLocation.address}
    //                   </p>
    //                 </div>
    //               </button>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LocationModal;
