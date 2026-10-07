"use client";
import { useRouter } from "nextjs-toploader/app";

import ProfileMobile from "@/features/profile/mobile/ProfileMobile";
import ProfileDesktop from "@/features/profile/desktop/ProfileDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "../mobile/profileMobile.module.css";

export default function OrderDetailsPage({ children }) {
  const router = useRouter();

  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <ProfileMobile>
      <main className={styles.mobile_content}>
        <div className={styles.profile_container} id="profileLayoutContainer">
          <div className={styles.order_details}>
            <div className={styles.order_details_header_container}>
              <div
                className={styles.order_details_icon_container}
                aria-hidden="false"
                onClick={() => router.push("/profile")}
              >
                <svg className={styles.page_header_icon}>
                  <use href="#arrowRight"></use>
                </svg>
              </div>
              <div className={styles.order_details_header_title}>
                جزئیات سفارش
              </div>
            </div>
            {children}
          </div>
        </div>
      </main>
    </ProfileMobile>
  ) : (
    <ProfileDesktop>{children}</ProfileDesktop>
  );
}
