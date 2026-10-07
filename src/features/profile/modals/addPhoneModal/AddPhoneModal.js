"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useModal } from "@/contexts/modalContext";
import { useUpdatePhone } from "@/hooks/useUser";

import Spinner from "@/utils/Spinner";

import VerifyCodeForm from "./verifyCodeForm/VerifyCodeForm";

import toPersianDigits from "@/utils/toPersianDigits";
import toEnglishDigits from "@/utils/toEnglishDigits";

import styles from "./addPhoneModal.module.css";

export default function AddPhoneModal({ profile }) {
  const { closeModal } = useModal();

  const updatePhone = useUpdatePhone();

  const isEditMode = !!profile?.is_phone_verified;
  const currentPhone = profile?.phone_number || "";

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: currentPhone,
    },
  });

  register("phone", {
    required: "شماره موبایل وارد نشده است",
    pattern: {
      value: /^09\d{9}$/,
      message: "شماره موبایل وارد شده نادرست است",
    },
  });

  const phoneData = watch("phone");
  const isPhoneChanged = phoneData !== currentPhone;

  const onSubmitPhone = async (data) => {
    try {
      const phone = data.phone.trim();

      const result = await updatePhone.mutateAsync({
        phone,
      });

      if (result.already_verified) {
        toast.success("این شماره قبلاً تأیید شده است");
        closeModal("add-phone");
        return;
      }

      if (result.demoOtp) {
        toast.success(`کد تأیید: ${result.demoOtp}`, {
          autoClose: 5000,
        });
      }

      setPhone(phone);
      setStep("otp");
    } catch (error) {
      const message = error?.response?.data?.message || "خطا در ارسال کد تأیید";

      toast.error(message);
    }
  };

  const handleBack = () => {
    if (step === "phone") {
      closeModal("add-phone");
    } else {
      setStep("phone");
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.close_btn}
          title="Close"
          onClick={handleBack}
        >
          <div
            className={`${styles.icon} cube-font-icon`}
            data-icon-name="nav-close"
            data-icon={`${step === "phone" ? "" : ""}`}
          />
        </button>

        <h2 className={styles.header_title}>
          {step === "phone"
            ? isEditMode
              ? "ویرایش شماره موبایل"
              : "ثبت شماره موبایل"
            : "تأیید شماره موبایل"}
        </h2>
      </div>

      <div className={styles.content_container}>
        <div className={styles.content_text}>
          {step === "phone" ? (
            <form
              className={styles.content}
              onSubmit={handleSubmit(onSubmitPhone)}
            >
              <div className={styles.field}>
                <div className="position-relative">
                  <input
                    className={`${styles.field_input} ${
                      errors.phone ? styles.field_input_error : ""
                    }`}
                    placeholder="شماره موبایل خود را وارد کنید"
                    type="tel"
                    inputMode="numeric"
                    value={toPersianDigits(phoneData || "")}
                    onChange={(e) => {
                      const value = toEnglishDigits(e.target.value);

                      setValue("phone", value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />

                  <label
                    className={`${styles.field_label} ${
                      phoneData ? styles.field_label_filled : ""
                    }`}
                  >
                    شماره موبایل
                  </label>
                </div>

                {errors.phone ? (
                  <div className={styles.field_error}>
                    <div className={styles.field_error_text}>
                      {errors.phone.message}
                    </div>
                  </div>
                ) : (
                  <div className={styles.field_text_container}>
                    <div className={styles.field_text}>
                      درصورت ویرایش شمارهٔ خود، باید شمارهٔ جدید را مجددا تایید
                      کنید.
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={styles.submit_btn}
                disabled={
                  !isValid ||
                  updatePhone.isLoading ||
                  (isEditMode && !isPhoneChanged)
                }
              >
                <div
                  className={
                    isValid
                      ? styles.submit_btn__enabled
                      : styles.submit_btn__disabled
                  }
                />

                <div className={styles.submit_btn__content}>
                  {updatePhone.isLoading ? (
                    <div className={styles.loading}>
                      <Spinner color="rgb(228, 1, 56)" size={16} />
                    </div>
                  ) : (
                    <div className={styles.submit_btn__text}>
                      دریافت کد تایید
                    </div>
                  )}
                </div>
              </button>
            </form>
          ) : (
            <VerifyCodeForm
              phone={phone}
              profile={profile}
              onSuccess={() => closeModal("add-phone")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
