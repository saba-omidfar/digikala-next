import React from "react";
import { useRouter } from "nextjs-toploader/app";

import { useModal } from "@/contexts/modalContext";
import useLoginRedirect from "@/hooks/useLoginRedirect";
import { useLogout } from "@/hooks/useUser";

import { useSnackbar } from "@/contexts/SnackbarContext";

import Loading from "@/components/modules/loading/Loading";

import styles from "./logoutModal.module.css";

function LogoutModal() {
  const router = useRouter();

  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { redirectToLogin } = useLoginRedirect();
  const { mutate: logoutHandler, isLoading } = useLogout();

  const onConfirm = () => {
    logoutHandler(undefined, {
      onSuccess: (data) => {
        if (data.success) {
          closeModal("logout");
          redirectToLogin();
        }
      },
      onError: () => {
        showSnackbar("خطا در شبکه.");
      },
    });
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div className={styles.modal_header_title_container}>
          <div className={styles.modal_header_title}>
            از حساب کاربری خارج می‌شوید؟
          </div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("logout")}
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
      <div className="d-flex flex-column flex-grow-1 w-100 overflow-y-auto">
        <div className={styles.modal_content}>
          <div className="w-100">
            <p className={styles.modal_content_description}>
              با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت.
              هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.
            </p>
            <div className={styles.modal_footer}>
              <button
                className={`${styles.modal_btn} ${styles.modal_reject_btn}`}
                onClick={() => closeModal("logout")}
              >
                <div className="d-flex align-align-items-center justify-content-center position-relative flex-grow-1">
                  انصراف
                </div>
              </button>
              <button className={styles.modal_btn} onClick={onConfirm}>
                <div className="d-flex align-align-items-center justify-content-center position-relative flex-grow-1">
                  {isLoading ? (
                    <Loading isSmall={true} bgColor="rgb(255,255,255)" />
                  ) : (
                    "خروج از حساب"
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
