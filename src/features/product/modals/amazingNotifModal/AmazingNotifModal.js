"use client";

import React, { useCallback, useMemo, useState } from "react";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";
import { useAddObservedProduct } from "@/features/profile/hooks/useLists";

import toPersianDigits from "@/utils/toPersianDigits";

import useScreenStatus from "@/hooks/useScreenStatus";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import Loading from "@/components/modules/loading/Loading";

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

  const { mutate: addObservedProduct, isLoading: isLoadingAddObservedProduct } =
    useAddObservedProduct();

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
    if (isLoadingAddObservedProduct || isButtonDisabled) return;

    addObservedProduct(
      {
        productId,
        send_sms: checkedItems.sms,
        send_email: checkedItems.email,
        send_notification: checkedItems.notification,
      },
      {
        onSuccess: ({ success }) => {
          if (!success) return;

          title === "موجود"
            ? showSnackbar("در صورت موجود شدن به شما اطلاع می‌دهیم")
            : showSnackbar("اطلاع‌رسانی شگفت‌انگیز ثبت شد");
          closeHandler();
        },
      },
    );
  }, [
    addObservedProduct,
    checkedItems,
    closeHandler,
    isButtonDisabled,
    isLoadingAddObservedProduct,
    productId,
    showSnackbar,
  ]);

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
        <div className={styles.content}>
          <p className={styles.modal_content_title}>
            اگر کالا {title} شد، چطور به شما اطلاع دهیم؟
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <CustomCheckBox
              id="sendSms"
              checked={checkedItems.sms}
              label={`ارسال پیامک به ${toPersianDigits(userData?.phone || "")}`}
              customStyle={CHECKBOX_STYLE}
              marginTop="12px"
              titleClassName={styles.modal_checkbox_text}
              color="#0d4485"
              changeHandler={(checked) => checkboxChangeHandler("sms", checked)}
            />

            {!!user?.is_logged_inData?.email && (
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
                disabled={isButtonDisabled || isLoadingAddObservedProduct}
                className={`${
                  isSmallScreen ? "w-100" : ""
                } ${styles.modal_content_submit_btn} ${
                  !isButtonDisabled && !isLoadingAddObservedProduct
                    ? styles.modal_content_submit_btn__active
                    : ""
                }`}
              >
                {isLoadingAddObservedProduct ? (
                  <div className={styles.loading_active}>
                    <Loading isSmall />
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={`${
                    isLoadingAddObservedProduct
                      ? styles.btn_content_loading
                      : ""
                  } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
                >
                  ثبت
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AmazingNotifModal);
