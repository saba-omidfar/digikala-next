"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

import ProfileMobile from "@/features/profile/mobile/ProfileMobile";
import ProfileDesktop from "@/features/profile/desktop/ProfileDesktop";
import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";

import { useGetProfile } from "@/hooks/useUser";
import useScreenStatus from "@/hooks/useScreenStatus";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "../mobile/profileMobile.module.css";

export default function AddressesPage({ children }) {
  const router = useRouter();
  const { openModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { data: profile } = useGetProfile();

  const [manualAddress, setManualAddress] = useState(false);

  const { isSmallScreen, isClientReady } = useScreenStatus();

  const handleAddNewAddress = () => {
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

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <ProfileMobile>
      <main className={styles.mobile_content}>
        <div className={styles.profile_container} id="profileLayoutContainer">
          <div>
            <div className={styles.page_header_container}>
              <div className={styles.page_header}>
                <div className={styles.page_header_title_container}>
                  <div className="d-flex align-items-center flex-grow-1">
                    <div
                      className={styles.page_header_icon_container}
                      aria-hidden="false"
                      onClick={() => router.push("/profile")}
                    >
                      <svg className={styles.page_header_icon}>
                        <use href="#arrowRight"></use>
                      </svg>
                    </div>

                    <p className={styles.page_header_title}>
                      <span className="position-relative">آدرس‌ها</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.page_content_container}>{children}</div>

            <div
              className={styles.add_new_address}
              onClick={handleAddNewAddress}
            >
              <button
                className={styles.add_new_address_btn}
                data-cro-id="profile-address-add"
              >
                <div className="d-flex align-items-center justify-content-center">
                  <div className={styles.add_new_address_btn_text}>
                    ثبت آدرس جدید
                  </div>

                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.add_new_address_icon}>
                      <use href="#newAddress"></use>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </ProfileMobile>
  ) : (
    <ProfileDesktop>{children}</ProfileDesktop>
  );
}
