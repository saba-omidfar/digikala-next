"use client";

import { useEffect, useState } from "react";
import { OTPInput } from "input-otp";
import { toast } from "react-toastify";

import { useResendPhoneVerification, useVerifyPhone } from "@/hooks/useUser";

import toPersianDigits from "@/utils/toPersianDigits";
import formatTime from "@/utils/formatTime";
import Spinner from "@/utils/Spinner";

import styles from "./verifyCodeForm.module.css";

export default function VerifyCodeForm({ phone, profile, onSuccess }) {
  const verifyPhone = useVerifyPhone();
  const resendCode = useResendPhoneVerification();

  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isCodeError, setIsCodeError] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (code.length !== 5 || verifyPhone.isLoading) {
      return;
    }

    handleVerify();
  }, [code, verifyPhone.isLoading]);

  const handleVerify = async () => {
    if (code.length !== 5 || verifyPhone.isLoading) {
      return;
    }

    try {
      await verifyPhone.mutateAsync({
        code,
      });

      toast.success(
        `شماره موبایل با موفقیت ${profile ? "ویرایش" : "تایید"} شد`,
        {
          autoClose: 2000,
          icon: (
            <i
              className={`${styles.toast_icon} cube-font-icon`}
              data-icon-name="content-check-fill"
              data-icon=""
            />
          ),
        },
      );

      onSuccess();
    } catch (error) {
      setIsCodeError(true);

      const message = error?.response?.data?.message || "کد تأیید اشتباه است";

      toast.error(message);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || resendCode.isLoading) {
      return;
    }

    try {
      const result = await resendCode.mutateAsync({
        phone,
      });

      setCode("");
      setIsCodeError(false);
      setTimeLeft(180);

      if (result.demoOtp) {
        toast.success(`کد تأیید: ${result.demoOtp}`, {
          autoClose: 5000,
        });
      }
    } catch (error) {
      const message = error?.response?.data?.message || "خطا در ارسال مجدد کد";

      toast.error(message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.title}>
          کد تایید ۵ رقمی که به شماره موبایل‌تان ({phone}) ارسال شده است را وارد
          کنید
        </div>
      </div>

      <div className={styles.content}>
        <OTPInput
          maxLength={5}
          value={code}
          onChange={(value) => {
            setCode(value);
            setIsCodeError(false);
          }}
          containerClassName={styles.otp_container}
          render={({ slots }) => (
            <div className={styles.otp_slots}>
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`${styles.otp_slot} ${
                    slot.isActive ? styles.otp_slot_active : ""
                  } ${isCodeError ? styles.otp_slot_error : ""}`}
                >
                  {toPersianDigits(slot.char)}
                </div>
              ))}
            </div>
          )}
        />

        <div className={styles.resend_container}>
          <div
            className={styles.resend_button}
            onClick={handleResend}
            style={{ cursor: resendCode.isLoading ? "default" : "not-allowed" }}
          >
            <div className={styles.resend_button_text}>
              {resendCode.isLoading
                ? "در حال ارسال..."
                : timeLeft > 0
                  ? `ارسال دوباره کد (${toPersianDigits(formatTime(timeLeft))})`
                  : "ارسال دوباره کد"}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button type="button" className={styles.confirm_btn} disabled>
          <div
            className={
              code.length === 5
                ? styles.confirm_btn__enabled
                : styles.confirm_btn__disabled
            }
          />

          <div className={styles.confirm_btn__content}>
            {verifyPhone.isLoading ? (
              <div className={styles.loading}>
                <Spinner color="rgb(228, 1, 56)" size={16} />
              </div>
            ) : (
              <div className={styles.confirm_btn__text}>تایید</div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
