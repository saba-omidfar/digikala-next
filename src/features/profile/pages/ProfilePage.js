"use client";
import { useState } from "react";

import Link from "next/link";

import ProfileMobile from "@/features/profile/mobile/ProfileMobile";
import ProfileSidebar from "@/features/profile/sections/profileSidebar/ProfileSidebar";
import ProfileDesktop from "@/features/profile/desktop/ProfileDesktop";
import OrdersContent from "@/features/profile/sections/profileOverview/ordersContent/OrdersContent";
import IdentityVerificationAlert from "@/features/profile/sections/identityVerificationAlert/IdentityVerificationAlert";
import IdentityVerificationModal from "@/features/profile/modals/identityVerificationModal/IdentityVerificationModal";
import ProfileSetting from "@/features/profile/modals/profileSetting/ProfileSetting";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetProfile } from "@/hooks/useUser";
import toPersianDigits from "@/utils/toPersianDigits";
import { useModal } from "@/contexts/modalContext";

import styles from "../mobile/profileMobile.module.css";

export default function ProfilePage({ children }) {
  const { openModal } = useModal();
  const { data: profile, isLoading } = useGetProfile();
  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady && isLoading) return null;

  return isSmallScreen ? (
    <ProfileMobile>
      <div
        className={styles.sticky_header_container}
        id="base_layout_mobile_sticky_header"
        onClick={() =>
          openModal(<ProfileSetting />, {
            name: "profile-setting",
            className: "modal_profile_setting",
            size: "full",
          })
        }
      >
        <div>
          <div className={styles.sticky_header}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.header_icon}>
                <use href="#setting"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <main className={styles.mobile_content}>
        <div className={styles.profile_container} id="profileLayoutContainer">
          <div>
            <div className={styles.profile_user}>
              <div className="d-flex flex-column">
                {profile?.is_verified ? (
                  <p className={styles.user_name}>
                    {profile?.first_name} {profile?.last_name}
                  </p>
                ) : (
                  ""
                )}
                <p
                  className={`${profile?.is_verified ? styles.user_verified_phone : styles.user_phone}`}
                >
                  {toPersianDigits(profile?.phone_number)}
                </p>
              </div>
              <Link
                data-cro-id="profile-edit"
                href="/profile/personal"
                className={styles.edit_link}
              >
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.edit_icon}>
                    <use href="#edit"></use>
                  </svg>
                </div>
              </Link>
            </div>

            {!profile?.is_verified ? <IdentityVerificationAlert /> : ""}

            <div className={styles.profile_header_container}>
              <div className={styles.profile_header}>
                <div className="d-flex align-items-center flex-grow-1">
                  <p className={styles.profile_title}>
                    <span className="position-relative">سفارش‌های من</span>
                  </p>
                </div>
                <div className={styles.profile_title__line_red}></div>
              </div>
              <span data-cro-id="profile-all-orders">
                <Link className={styles.profile_link} href="/profile/orders/">
                  <span>مشاهده همه</span>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.chevron_icon}>
                      <use href="#chevronLeft"></use>
                    </svg>
                  </div>
                </Link>
              </span>
            </div>
            <OrdersContent />
            <ProfileSidebar />
          </div>
        </div>
      </main>
    </ProfileMobile>
  ) : (
    <ProfileDesktop>{children}</ProfileDesktop>
  );
}
