import { useState, useCallback, useRef } from "react";

import { useModal } from "@/contexts/modalContext";

import MapComponent from "@/components/modules/map/MapComponent";
import AddNewAddressModal from "@/features/profile/modals/addNewAddressModal/AddNewAddressModal";
import ConfirmAddressModal from "@/features/profile/modals/confirmAddressModal/ConfirmAddressModal";

import styles from "./locationPickerModal.module.css";

export default function LocationPickerModal({
  location,
  data,
  isEdit,
  address,
}) {
  const { openModal, closeModal, closeAll } = useModal();

  const mapRef = useRef(null);
  const [currentCoords, setCurrentCoords] = useState({
    lng: location.longitude,
    lat: location.latitude,
  });

  const handleMapMove = useCallback((coords) => {
    setCurrentCoords(coords);
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className={styles.header_title}>تایید موقعیت مکانی</div>

                  <div
                    className="d-flex"
                    aria-hidden="false"
                    onClick={() => closeAll()}
                  >
                    <div
                      className={`${styles.close_icon} cube-font-icon`}
                      data-icon-name="cube-nav-close"
                      data-icon=""
                    />
                  </div>
                </div>

                <div className={styles.header_subtitle}>
                  موقعیت مکانی شما براساس آدرس، مشخص شده است.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <div className="h-100 d-flex flex-column">
            <div className="h-100 flex-grow-1 position-relative hide-scrollbar">
              <div className={styles.location_address_container}>
                <div className="d-flex flex-shrink-0" aria-hidden="false">
                  <svg className={styles.location_icon}>
                    <use href="#pin"></use>
                  </svg>
                </div>
                <span className={styles.location_address}>
                  {location?.address}
                </span>
                <div
                  className={styles.edit_icon_container}
                  aria-hidden="false"
                  onClick={() =>
                    openModal(
                      <AddNewAddressModal address={address} isEdit={isEdit} />,
                      {
                        name: "add-new-address",
                        className: "modal__add_new_address rounded-medium",
                      },
                    )
                  }
                >
                  <svg className={styles.edit_icon}>
                    <use href="#edit"></use>
                  </svg>
                </div>
              </div>
              <MapComponent
                data={data}
                mapRef={mapRef}
                initialCenter={{
                  ...currentCoords,
                  zoom: 18,
                }}
                onMove={handleMapMove}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <div className={styles.footer_btn_container}>
            <button
              className={styles.footer_btn}
              onClick={() => {
                closeModal("location-picker");
                openModal(
                  <ConfirmAddressModal
                    data={data}
                    location={location}
                    address={address}
                    isEdit={isEdit}
                  />,
                  {
                    name: "confirm-address",
                    className: "modal__confirm_address rounded-medium",
                  },
                );
              }}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <span className={styles.footer_btn_text}> تایید و ادامه</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
