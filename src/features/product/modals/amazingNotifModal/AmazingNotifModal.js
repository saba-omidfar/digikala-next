"use client";

import React, { useCallback, useMemo, useState } from "react";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";

import toPersianDigits from "@/utils/toPersianDigits";

import useScreenStatus from "@/hooks/useScreenStatus";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import styles from "./amazingNotifModal.module.css";

const CHECKBOX_STYLE = {
  borderBottom: "none",
  padding: "0",
};

const INITIAL_STATE = {
  sms: false,
  email: false,
  notification: false,
};

function AmazingNotifModal({ productId, title = "شگفت‌انگیز" }) {
  const { showSnackbar } = useSnackbar();
  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const { addIncredibleNotification, isLoadingAddIncredibleNotification } =
    useProductContext();
  const { user } = useUserContext();
  const userData = user?.user;

  const [checkedItems, setCheckedItems] = useState(INITIAL_STATE);

  const isButtonDisabled = useMemo(
    () => !Object.values(checkedItems).some(Boolean),
    [checkedItems],
  );

  const checkboxChangeHandler = useCallback((key, checked) => {
    setCheckedItems((prev) => {
      if (prev[key] === checked) return prev;

      return {
        ...prev,
        [key]: checked,
      };
    });
  }, []);

  const closeHandler = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const onSubmit = useCallback(() => {
    addIncredibleNotification(
      {
        productId,
        send_sms: checkedItems.sms,
        send_email: checkedItems.email,
        send_notification: checkedItems.notification,
      },
      {
        onSuccess: () => {
          showSnackbar("اطلاع‌رسانی شگفت‌انگیز ثبت شد");

          closeHandler();
        },
      },
    );
  }, [checkedItems, productId, closeHandler]);

  return (
    <div
      className={
        isSmallScreen ? styles.mobile_modal_layout : styles.modal_layout
      }
    >
      <div className={styles.modal_header}>
        <div className={styles.modal_header_title_container}>
          <div className={styles.modal_header_title}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header__title_text}>
                <span className="position-relative">اطلاع‌ رسانی</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeHandler}
            className={styles.modal_close_btn}
          >
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className="cube-font-icon"
            />
          </button>
        </div>
      </div>

      <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content_container}>
          <div className={styles.content}>
            <p className={styles.modal_content_title}>
              اگر کالا {title} شد، چطور به شما اطلاع دهیم؟
            </p>

            {isLoadingAddIncredibleNotification ? (
              <div className={styles.loading_container}>
                <div className="d-flex align-items-center justify-content-center">
                  <LoadingModal />
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()}>
                <CustomCheckBox
                  id="sendSms"
                  checked={checkedItems.sms}
                  label={`ارسال پیامک به ${toPersianDigits(
                    userData?.phone || "",
                  )}`}
                  customStyle={CHECKBOX_STYLE}
                  marginTop="12px"
                  titleClassName={styles.modal_checkbox_text}
                  color="#0d4485"
                  changeHandler={(checked) =>
                    checkboxChangeHandler("sms", checked)
                  }
                />

                {!!userData?.email && (
                  <CustomCheckBox
                    id="sendEmail"
                    checked={checkedItems.email}
                    label={`ارسال ایمیل به ${userData.email}`}
                    customStyle={CHECKBOX_STYLE}
                    marginTop="12px"
                    titleClassName={styles.modal_checkbox_text}
                    color="#0d4485"
                    changeHandler={(checked) =>
                      checkboxChangeHandler("email", checked)
                    }
                  />
                )}

                <CustomCheckBox
                  id="sendNotification"
                  checked={checkedItems.notification}
                  label="سیستم پیام شخصی دیجی‌کالا"
                  customStyle={CHECKBOX_STYLE}
                  marginTop="12px"
                  titleClassName={styles.modal_checkbox_text}
                  color="#0d4485"
                  changeHandler={(checked) =>
                    checkboxChangeHandler("notification", checked)
                  }
                />

                <div className={styles.modal_content_btn_container}>
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={
                      isButtonDisabled || isLoadingAddIncredibleNotification
                    }
                    className={`
                    ${isSmallScreen ? "w-100" : ""}
                    ${
                      isButtonDisabled
                        ? styles.modal_content_submit_disabled_btn
                        : styles.modal_content_submit_btn
                    }
                  `}
                  >
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      ثبت
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AmazingNotifModal);
