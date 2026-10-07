"use client";

import { useState, useRef } from "react";
import { useRouter } from "nextjs-toploader/app";

import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";
import AddressSettingModal from "@/features/profile/modals/addressSettingModal/AddressSettingModal";

import { useGetProfile } from "@/hooks/useUser";
import {
  useGetAddresses,
  useSetDefaultAddress,
} from "@/features/profile/hooks/useAddress";
import AddressPopover from "./addressPopover/AddressPopover";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import toPersianDigits from "@/utils/toPersianDigits";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./profileAddresses.module.css";

export default function ProfileAddresses() {
  const anchorRef = useRef(null);
  const router = useRouter();

  const { openModal } = useModal();
  const { data: profile } = useGetProfile();
  const { data, isLoading } = useGetAddresses();
  const { showSnackbar } = useSnackbar();
  const { isSmallScreen } = useScreenStatus();

  const [manualAddress, setManualAddress] = useState(false);
  const [anchorOpen, setAnchorOpen] = useState(false);

  const { mutateAsync: setDefaultAddress } = useSetDefaultAddress();

  const handleSelectLocation = () => {
    if (!profile?.is_verified) {
      showSnackbar("لطفا مشخصات کاربری خود را تکمیل کنید.");
      router.push("/profile/personal");
      return;
    }

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
  };

  const handleSelectAddress = async (address) => {
    if (address.is_default) return;

    try {
      await setDefaultAddress(address.id);
    } catch (error) {
      console.error("SET DEFAULT ADDRESS ERROR:", error);
    }
  };

  const addresses = data?.addresses?.filter(
    (address) => address.name !== "موقعیت انتخابی",
  );

  const selectedLocation = data?.addresses?.find(
    (address) => address.name === "موقعیت انتخابی",
  );

  if (isLoading) return null;

  return (
    <div>
      <div className={styles.profile_content}>
        <div className={styles.profile_header_container}>
          <div className={styles.profile_header}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.profile_title}>
                <span className="position-relative">آدرس‌ها</span>
              </p>
            </div>

            <div className={styles.profile_title__line_red}></div>
          </div>

          {data?.addresses?.length ? (
            <div
              className={styles.add_address_btn}
              onClick={handleSelectLocation}
            >
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.add_address_icon}>
                  <use href="#addSimple"></use>
                </svg>
              </div>

              <div className={styles.add_address_text}>افزودن آدرس جدید</div>
            </div>
          ) : (
            ""
          )}
        </div>

        {data?.addresses?.length ? (
          <div className={styles.addresses_container}>
            {selectedLocation ? (
              <div
                className={styles.selected_location_container}
                style={{
                  border: selectedLocation?.is_default
                    ? "1px solid #0d4485"
                    : "1px dashed #c0c2c5",
                }}
                onClick={handleSelectLocation}
              >
                <button type="button" className={styles.selected_location_btn}>
                  <div className="d-flex" aria-hidden="false">
                    <div
                      className={`${styles.selected_location_icon} cube-font-icon`}
                      data-icon-name="cube-location-auto-detect-on"
                      data-icon=""
                      style={{
                        color: selectedLocation?.is_default
                          ? "#0d4485"
                          : "#81858b",
                      }}
                    ></div>
                  </div>

                  <div className={styles.selected_location_title}>
                    <p
                      className={styles.selected_location_text}
                      style={{
                        color: selectedLocation?.is_default
                          ? "#0d4485"
                          : "#62666d",
                      }}
                    >
                      {selectedLocation?.name}
                    </p>

                    <p className={styles.selected_location_address}>
                      {selectedLocation?.address}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  className={styles.selected_location_edit_btn}
                  aria-label={selectedLocation?.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLocation();
                  }}
                >
                  <div
                    className={styles.selected_location_edit_icon_container}
                    aria-hidden="false"
                  >
                    <div
                      className={`${styles.selected_location_edit_icon} cube-font-icon`}
                      data-icon-name="cube-content-edit"
                      data-icon=""
                    ></div>
                  </div>
                </button>
              </div>
            ) : (
              <div className={styles.location_picker_container}>
                <button
                  type="button"
                  className={styles.location_picker_btn}
                  onClick={handleSelectLocation}
                >
                  <div className="d-flex" aria-hidden="false">
                    <div
                      className={`${styles.location_icon} cube-font-icon`}
                      data-icon-name="cube-location-auto-detect-on"
                      data-icon=""
                    ></div>
                  </div>

                  <div className={styles.location_picker_title}>
                    <p className={styles.location_picker_text}>
                      انتخاب موقعیت از نقشه
                    </p>
                  </div>
                </button>
              </div>
            )}

            <div className={styles.addresses}>
              <span className={styles.addresses_title}>آدرس‌های من</span>

              {[...addresses].reverse().map((address) => (
                <div
                  key={address.id}
                  className={`${styles.address_container} ${
                    address.is_default ? styles.address_container__active : ""
                  }`}
                  onClick={() => handleSelectAddress(address)}
                >
                  <div className="d-flex align-items-start w-100">
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.address_location_icon}>
                        <use href="#pin"></use>
                      </svg>
                    </div>

                    <div className={styles.address_details}>
                      <p className={styles.address_name}>{address.name}</p>

                      <p className={styles.address_text}>
                        <div>
                          <div>{address.address}</div>

                          <div>
                            کد پستی: {toPersianDigits(address.postal_code)}
                          </div>

                          <div className="d-flex">
                            <div>گیرنده: {address.full_name}</div>

                            <div className={styles.user_phone}>
                              <span> | {toPersianDigits(address.mobile)}</span>
                            </div>
                          </div>
                        </div>
                      </p>
                    </div>

                    <div>
                      <button
                        className="d-flex"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (!profile?.is_verified) {
                            showSnackbar(
                              "لطفا مشخصات کاربری خود را تکمیل کنید.",
                            );
                            router.push("/profile/personal");
                            return;
                          }

                          if (isSmallScreen) {
                            openModal(
                              <AddressSettingModal
                                address={address}
                                manualAddress={true}
                                setManualAddress={setManualAddress}
                              />,
                              {
                                name: "address-setting",
                                className: "modal__address_setting",
                              },
                            );
                          } else {
                            setAnchorOpen(true);
                          }
                        }}
                      >
                        <div
                          ref={anchorRef}
                          className={styles.address_btn_container}
                          aria-hidden="false"
                        >
                          <svg className={styles.address_btn}>
                            <use href="#moreVert"></use>
                          </svg>
                        </div>
                      </button>
                    </div>

                    <AddressPopover
                      open={anchorOpen}
                      anchorRef={anchorRef}
                      address={address}
                      onClose={() => setAnchorOpen(false)}
                      manualAddress={true}
                      setManualAddress={setManualAddress}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.addresses_empty_container}>
            <div
              role="img"
              aria-hidden="false"
              aria-label="Address Empty State"
              className={styles.addresses_empty_img_container}
            >
              <img
                className={styles.addresses_empty_img}
                alt="Address Empty State"
                title=""
                src="https://www.digikala.com/statics/img/svg/address.svg"
              />
            </div>

            <div className={styles.addresses_empty_title}>
              هنوز آدرس ثبت نکرده‌اید.
            </div>

            <button
              className={styles.add_new_address_btn}
              onClick={handleSelectLocation}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <div
                  className={styles.new_address_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.new_address_icon}>
                    <use href="#newAddress"></use>
                  </svg>
                </div>
                ثبت آدرس
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
