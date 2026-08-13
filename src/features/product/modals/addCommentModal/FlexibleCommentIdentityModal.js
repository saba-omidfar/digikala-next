import React from "react";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./flexibleCommentIdentityModal.module.css";

function FlexibleCommentIdentityModal() {
  const { closeModal } = useModal();
  const { selectedIdentity, setSelectedIdentity } = useProductContext();

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header_container}>
        <div className={styles.modal_header}>
          <div className={styles.modal_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_title}>
                <span className="position-relative">نحوه نمایش دیدگاه‌ها</span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-nav-arrow-right"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-100 flex-grow-1 d-flex flex-column">
        <div className={styles.modal_content_wrapper}>
          <div>
            <label className="d-flex align-items-start py-3">
              <input
                type="radio"
                name="isAnonymous"
                className="hidden"
                value="anonymous"
                checked={selectedIdentity === "anonymous"}
                onChange={() => setSelectedIdentity("anonymous")}
              />
              <span className={styles.modal_content_identitiy_radio}>
                <div className="d-flex">
                  <div
                    data-icon-name="cube-radio"
                    data-icon={
                      selectedIdentity === "anonymous" ? "\uE96C" : "\uE94F"
                    }
                    className={`${
                      selectedIdentity === "anonymous"
                        ? styles.modal_checked_radio_btn
                        : styles.modal_radio_btn
                    } cube-font-icon`}
                  ></div>
                </div>
              </span>
              <div className="me-3 flex-grow-1">
                <p className={styles.modal_content_identitiy_type}>
                  ارسال ناشناس
                </p>
                <div className={styles.modal_content_identitiy_text}>
                  دیدگاه شما در صفحه محصول با عنوان کاربر دیجی‌کالا نمایش داده
                  می‌شود
                </div>
              </div>
            </label>
          </div>
          <div>
            <label className={styles.input_label}>
              <input
                type="radio"
                name="personal_name"
                className="hidden"
                value="known"
                checked={selectedIdentity === "personalName"}
                onChange={() => setSelectedIdentity("personalName")}
              />
              <span className={styles.modal_content_identitiy_radio}>
                <div className="d-flex">
                  <div
                    data-icon-name="cube-radio"
                    data-icon={
                      selectedIdentity === "personalName" ? "\uE96C" : "\uE94F"
                    }
                    className={`${
                      selectedIdentity === "personalName"
                        ? styles.modal_checked_radio_btn
                        : styles.modal_radio_btn
                    } cube-font-icon`}
                  ></div>
                </div>
              </span>
              <div className="me-3 flex-grow-1">
                <p className={styles.modal_content_identitiy_type}>
                  ارسال با نام شما
                </p>
                <div className={styles.modal_content_identitiy_text}>
                  دیدگاه شما در صفحه محصول با نام صبا امیدفر نمایش داده می‌شود
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlexibleCommentIdentityModal;
