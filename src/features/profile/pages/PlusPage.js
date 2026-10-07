"use client";
import { useRouter } from "nextjs-toploader/app";

import ProfileMobile from "@/features/profile/mobile/ProfileMobile";
import ProfileDesktop from "@/features/profile/desktop/ProfileDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "../mobile/profileMobile.module.css";

export default function PlusPage({ children }) {
  const router = useRouter();
  const { isSmallScreen, isClientReady } = useScreenStatus();

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
                      <span className="position-relative">پلاس</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.page_content_container}>{children}</div>
          </div>
        </div>
      </main>
    </ProfileMobile>
  ) : (
    <ProfileDesktop>{children}</ProfileDesktop>
  );
}
