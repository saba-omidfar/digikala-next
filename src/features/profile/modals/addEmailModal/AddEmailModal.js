"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useModal } from "@/contexts/modalContext";
import { useUpdateEmail } from "@/hooks/useUser";

import Spinner from "@/utils/Spinner";

import VerifyCodeForm from "./verifyCodeForm/VerifyCodeForm";

import styles from "./addEmailModal.module.css";

export default function AddEmailModal({ profile }) {
  const { closeModal } = useModal();

  const updateEmail = useUpdateEmail();

  const isEditMode = !!profile?.is_email_verified;
  const currentEmail = profile?.email || "";

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: currentEmail,
    },
  });

  const emailData = watch("email");

  const onSubmitEmail = async (data) => {
    try {
      const email = data.email.trim();

      const result = await updateEmail.mutateAsync({
        email,
      });

      if (result.already_verified) {
        toast.success("این ایمیل قبلاً تأیید شده است");
        closeModal("add-email");
        return;
      }

      setEmail(email);
      setStep("otp");

      toast.success("کد تأیید به ایمیل شما ارسال شد");
    } catch (error) {
      const message = error?.response?.data?.message || "خطا در ارسال کد تأیید";

      toast.error(message);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.close_btn}
          title="Close"
          onClick={() =>
            step === "email" ? closeModal("add-email") : setStep("email")
          }
        >
          <div
            className={`${styles.icon} cube-font-icon`}
            data-icon-name="nav-close"
            data-icon={`${step === "email" ? "" : ""}`}
          />
        </button>

        <h2 className={styles.header_title}>
          {step === "email"
            ? isEditMode
              ? "ویرایش ایمیل"
              : "ثبت ایمیل"
            : "تأیید ایمیل"}
        </h2>
      </div>

      <div className={styles.content_container}>
        <div className={styles.content_text}>
          {step === "email" ? (
            <form
              className={styles.content}
              onSubmit={handleSubmit(onSubmitEmail)}
            >
              <div className={styles.field}>
                <div className="position-relative">
                  <input
                    className={`${styles.field_input} ${
                      errors.email ? styles.field_input_error : ""
                    }`}
                    placeholder="ایمیل"
                    type="email"
                    {...register("email", {
                      required: "پست الکترونیکی وارد نشده است",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "پست الکترونیکی وارد شده نادرست است",
                      },
                    })}
                  />

                  <label
                    className={`${styles.field_label} ${
                      emailData ? styles.field_label_filled : ""
                    }`}
                  >
                    ایمیل
                  </label>
                </div>

                {errors.email ? (
                  <div className={styles.field_error}>
                    <div className={styles.field_error_text}>
                      {errors.email.message}
                    </div>
                  </div>
                ) : (
                  <div className={styles.field_text_container}>
                    <div className={styles.field_text}>
                      مثال: example@gmail.com
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={styles.submit_btn}
                disabled={!isValid || updateEmail.isLoading}
              >
                <div
                  className={
                    isValid
                      ? styles.submit_btn__enabled
                      : styles.submit_btn__disabled
                  }
                />

                <div className={styles.submit_btn__content}>
                  {updateEmail.isLoading ? (
                    <div className={styles.loading}>
                      <Spinner color="rgb(228, 1, 56)" size={16} />
                    </div>
                  ) : (
                    <div className={styles.submit_btn__text}>
                      {isEditMode ? "ذخیره" : "تایید ایمیل"}
                    </div>
                  )}
                </div>
              </button>
            </form>
          ) : (
            <VerifyCodeForm
              email={email}
              profile={profile}
              onSuccess={() => closeModal("add-email")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
