import Link from "next/link";

import { useModal } from "@/contexts/modalContext";

import styles from "./profileSetting.module.css";
import LogoutModal from "@/components/layout/header/modals/logoutModal/LogoutModal";

export default function ProfileSetting() {
  const { openModal, closeModal } = useModal();

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className="d-flex align-items-center">
          <div className={styles.header_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.header_title}>
                <span className="position-relative">تنظیمات</span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1 text-h5"></div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("profile-setting")}
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

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content_container}>
          <div className="d-flex flex-column align-items-center justify-content-between">
            <div className={styles.content}>
              <Link className={styles.setting_item_link} href="/faq/">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className={styles.setting_item_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.setting_item_icon}>
                      <use href="#question"></use>
                    </svg>
                  </div>
                  <div className="flex-grow-1 text-right">
                    <span className={styles.setting_item_title}>
                      پرسش‌های متداول
                    </span>
                    <div></div>
                  </div>
                  <div className={styles.see_more_btn}>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.see_more_btn_icon}>
                        <use href="#chevronLeft"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              <span
                className={styles.setting_item_link}
                onClick={() =>
                  openModal(<LogoutModal />, {
                    name: "logout",
                    className: "rounded-medium",
                  })
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className={styles.setting_item_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.logout_icon}>
                      <use href="#registerationSignOut"></use>
                    </svg>
                  </div>
                  <div className="flex-grow-1 text-right">
                    <span className={styles.logout_title}>
                      خروج از حساب کاربری
                    </span>
                    <div></div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
