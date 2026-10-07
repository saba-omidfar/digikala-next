import { useState } from "react";

import { useModal } from "@/contexts/modalContext";

import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";
import {
  useGetAddresses,
  useSetDefaultAddress,
} from "@/features/profile/hooks/useAddress";

import styles from "./locationModal.module.css";

export default function LocationModal({ isConformAddress }) {
  const { openModal, closeModal } = useModal();
  const { data } = useGetAddresses();
  const { mutateAsync: setDefaultAddress } = useSetDefaultAddress();

  const [manualAddress, setManualAddress] = useState(false);

  const addresses = data?.addresses?.filter(
    (address) => address.name !== "موقعیت انتخابی",
  );

  const selectedLocation = data?.addresses?.find(
    (address) => address.name === "موقعیت انتخابی",
  );

  const handleSelectAddress = async (address) => {
    if (address.is_default) return;

    try {
      await setDefaultAddress(address.id);
    } catch (error) {
      console.error("SET DEFAULT ADDRESS ERROR:", error);
    }
  };

  return (
    <div
      className={styles.layout}
      style={{
        paddingBottom: isConformAddress ? 86 : 0,
        height: isConformAddress ? "auto" : 285,
      }}
    >
      <div className={styles.header_container}>
        <div className={styles.header}>
          {isConformAddress ? (
            <span className={styles.confirm_address_title}>انتخاب آدرس</span>
          ) : (
            <span className={styles.title}></span>
          )}
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
            {selectedLocation ? (
              <button
                type="button"
                className={styles.location_btn}
                onClick={() => handleSelectAddress(selectedLocation)}
                style={{
                  border: selectedLocation?.is_default
                    ? "1px solid #0d4485"
                    : "1px dashed #c0c2c5",
                }}
              >
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.location_icon} cube-font-icon`}
                    data-icon-name="cube-location-auto-detect-on"
                    data-icon=""
                    style={{
                      color: selectedLocation?.is_default
                        ? "#0d4485"
                        : "#81858b",
                    }}
                  ></div>
                </div>
                <div className={styles.location_content}>
                  <p
                    className={styles.location_title}
                    style={{
                      color: selectedLocation?.is_default
                        ? "#0d4485"
                        : "#62666d",
                    }}
                  >
                    {selectedLocation?.name}
                  </p>
                  <p className={styles.location_address}>
                    {selectedLocation?.address}
                  </p>
                </div>
                <div
                  className={styles.edit_icon_container}
                  aria-hidden="false"
                  onClick={() =>
                    openModal(<SelectLocationModal isEdit />, {
                      name: "select-location",
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
            ) : (
              ""
            )}

            {addresses?.length ? (
              <>
                <h2 className={styles.locations_title}>
                  آدرس‌ها{isConformAddress ? "ی من" : ""}
                </h2>
                <ul className={styles.locations_list}>
                  {[...addresses].reverse().map((address) => (
                    <li
                      key={address.id}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <button
                        type="button"
                        className={`${styles.address_item} ${address.is_default ? styles.address_item__active : ""}`}
                      >
                        <div className={styles.location_icon_container}>
                          <div className="d-flex" aria-hidden="false">
                            <div
                              className={`${styles.address_location_icon} cube-font-icon`}
                              data-icon-name="cube-location-pin"
                              data-icon=""
                            ></div>
                          </div>
                        </div>
                        <div className={styles.location_content}>
                          <p className={styles.location_title}>
                            {address?.name}
                          </p>
                          <p className={styles.location_address}>
                            {address?.address}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {isConformAddress ? (
        <div className={styles.footer}>
          <div
            className={styles.footer_content}
            data-cro-id="shipping-add-new-address"
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
            <div className="d-flex align-items-center flex-grow-1">
              <div className={styles.add_icon_container} aria-hidden="false">
                <svg className={styles.add_icon}>
                  <use href="#addSimple"></use>
                </svg>
              </div>
              <p className={styles.footer_title}>
                <span className="position-relative">افزودن آدرس جدید</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
