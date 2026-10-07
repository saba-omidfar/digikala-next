import { useState, useEffect, useCallback } from "react";
import { useRouter } from "nextjs-toploader/app";

import { fromLonLat } from "ol/proj";

import { useModal } from "@/contexts/modalContext";
import { useLocation } from "@/contexts/locationContext";

import Map from "@/components/modules/map/MapComponent";
import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";
import LocationModal from "@/components/layout/header/modals/locationModal/LocationModal";

import styles from "./completeAddressModal.module.css";

export default function CompleteAddressModal() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { DEFAULT_LOCATION, mapRef, selectedLocation, setMapCenter } =
    useLocation();

  const [manualAddress, setManualAddress] = useState(false);

  useEffect(() => {
    if (!selectedLocation) return;

    mapRef.current?.getView().animate({
      center: fromLonLat([
        selectedLocation.longitude,
        selectedLocation.latitude,
      ]),
      zoom: 15,
      duration: 1200,
    });
  }, [selectedLocation, mapRef]);

  const handleMapMove = useCallback((coords) => {
    setMapCenter(coords);
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.header_title}>
                <span className="position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>تکمیل آدرس </span>
                    <div
                      className="d-flex"
                      aria-hidden="false"
                      onClick={() => {
                        closeModal("complete-address");
                        router.push("/checkout/cart");
                      }}
                    >
                      <div
                        className={`${styles.close_icon} cube-font-icon`}
                        data-icon-name="cube-nav-close"
                        data-icon=""
                      ></div>
                    </div>
                  </div>
                </span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1"></div>
        </div>
      </div>
      <div className="flex-gro-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <span className={styles.content_title}>
            برای ثبت سفارش آدرس خود را تکمیل کنید و یا از «آدرس‌های من» انتخاب
            کنید.
          </span>
          <div className={styles.map_container}>
            <Map
              mapRef={mapRef}
              initialCenter={DEFAULT_LOCATION}
              onMove={handleMapMove}
            >
              <div
                className={styles.choose_location__pin}
                role="img"
                aria-hidden="false"
                aria-label="Pin"
              >
                <img
                  className={styles.choose_location__pin_img}
                  alt="Pin"
                  title=""
                  src="https://www.digikala.com/statics/img/svg/pin-nearby.svg"
                />
              </div>
            </Map>
          </div>

          <div className={styles.footer}>
            <button
              className={`${styles.footer_btn} ${styles.addresses_btn}`}
              onClick={() =>
                openModal(<LocationModal isConformAddress />, {
                  name: "location",
                  className: "modal__location rounded-large",
                  size: "md",
                })
              }
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                آدرس‌های من
              </div>
            </button>
            <button
              className={`${styles.footer_btn} ${styles.complete_address_btn}`}
              onClick={() => {
                setManualAddress(true);

                openModal(
                  <SelectLocationModal
                    isProfilePage={true}
                    manualAddress={true}
                    setManualAddress={setManualAddress}
                  />,
                  {
                    name: "select-location",
                    className: "modal__select_location rounded-large",
                  },
                );
              }}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                تکمیل آدرس
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
