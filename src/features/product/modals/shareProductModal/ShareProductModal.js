import React, { useState } from "react";

import { useModal } from "@/contexts/modalContext";

import styles from "./shareProductModal.module.css";

export default function ShareProductModal() {
  const { closeModal } = useModal();
  const [copyProductUrl, setCopyProductUrl] = useState(false);

  const handleCopyProductUrl = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopyProductUrl(true);

      setTimeout(() => {
        setCopyProductUrl(false);
      }, 3000);
    });
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div
          className="d-flex align-items-center"
          style={{ borderBottom: "1px solid #e0e0e2" }}
        >
          <div className={styles.modal_header_title}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header__title_text}>
                <span className="position-relative">اشتراک‌ گذاری</span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className="flex-grow-1 d-flex flex-column py-3 px-4">
          <div>
            <div className="pb-3">
              <p className={styles.modal_share_text}>
                این کالا را با دوستان خود به اشتراک بگذارید!
              </p>
              <div
                className={styles.modal_copy_btn_container}
                onClick={() => handleCopyProductUrl()}
              >
                <button className={styles.modal_copy_btn}>
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <div className="d-flex ms-2">
                      <div
                        data-icon-name="cube-value-copy"
                        data-icon="&#xE987;"
                        className={`${styles.modal_copy_icon} cube-font-icon`}
                      ></div>
                    </div>
                    {copyProductUrl ? "کپی شد" : " کپی کردن لینک"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
