"use client";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useModal } from "@/contexts/modalContext";

import IdentityVerificationModal from "@/features/profile/modals/identityVerificationModal/IdentityVerificationModal";

import styles from "./identityVerificationAlert.module.css";

export default function IdentityVerificationAlert() {
  const { openModal } = useModal();

  return (
    <div className={styles.identity_verification_container}>
      <div className="align-self-start">
        <div className="d-flex">
          <div className={styles.info_icon_container} aria-hidden="false">
            <svg className={styles.info_icon}>
              <use href="#infoFill"></use>
            </svg>
          </div>
          <span className={styles.identity_verification_title}>
            با تایید هویت می‌توانید‌ امنیت حساب کاربری‌تان را افزایش دهید
          </span>
        </div>
      </div>
      <span
        className={styles.identity_verification_btn}
        data-cro-id="profile-identity"
        onClick={() =>
          openModal(<IdentityVerificationModal />, {
            name: "identity-verification",
            className: "modal__identity_verification rounded-medium",
          })
        }
      >
        <span>تایید هویت</span>
        <div className="d-flex" aria-hidden="false">
          <svg className={styles.chevron_icon}>
            <use href="#chevronLeft"></use>
          </svg>
        </div>
      </span>
    </div>
  );
}
