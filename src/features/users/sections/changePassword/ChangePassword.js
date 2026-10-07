"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { useQueryClient } from "react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useResetPassword } from "@/hooks/usePassword";
import { useLoginWithPassword } from "@/hooks/useAuth";

import styles from "./changePassword.module.css";

const passwordSchema = yup.object({
  newPassword: yup
    .string()
    .required("رمز عبور را وارد کنید")
    .min(8, "رمز عبور باید حداقل ۸ حرف باشد")
    .matches(/[0-9]/, "رمز عبور باید شامل عدد باشد")
    .matches(/[!@#$%&*^]/, "رمز عبور باید شامل علامت باشد")
    .matches(/[a-z]/, "رمز عبور باید شامل حرف کوچک باشد")
    .matches(/[A-Z]/, "رمز عبور باید شامل حرف بزرگ باشد"),

  confirmPassword: yup
    .string()
    .required("تکرار رمز عبور را وارد کنید")
    .oneOf([yup.ref("newPassword")], "رمزهای عبور یکسان نیستند"),
});

export default function ChangePassword({ username, resetToken }) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const searchParams = useSearchParams();

  const { showSnackbar } = useSnackbar();

  const callbackUrl = searchParams.get("callbackUrl");
  const redirectUrl =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";

  const { mutate: resetPassword, isLoading: resetLoading } = useResetPassword();
  const { mutate: loginWithPassword, isLoading: loginLoading } =
    useLoginWithPassword();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const passwordChecks = {
    hasNumber: /[0-9]/.test(newPassword),
    hasLength: newPassword.length >= 8,
    hasSymbol: /[!@#$%&*^]/.test(newPassword),
    hasCase: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
  };

  const passedChecks = Object.values(passwordChecks).filter(Boolean).length;

  const passwordStrength = !newPassword
    ? null
    : passedChecks <= 1
      ? "weak"
      : passedChecks <= 3
        ? "medium"
        : "strong";

  const newPasswordRegister = register("newPassword");
  const confirmPasswordRegister = register("confirmPassword");

  const handleChangePassword = (data) => {
    const guestCartId = localStorage.getItem("guestCartId");

    resetPassword(
      {
        username,
        resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          loginWithPassword(
            {
              username,
              password: data.newPassword,
              guestCartId,
            },
            {
              onSuccess: async (res) => {
                if (res.clearGuestCartId) {
                  localStorage.removeItem("guestCartId");
                }

                await Promise.all([
                  queryClient.invalidateQueries(["me"]),
                  queryClient.invalidateQueries(["UserCart"]),
                ]);

                router.push(redirectUrl);
              },

              onError: (error) => {
                showSnackbar(
                  error?.response?.data?.message ||
                    "رمز تغییر کرد، اما ورود خودکار انجام نشد.",
                );
              },
            },
          );
        },

        onError: (error) => {
          showSnackbar(
            error?.response?.data?.message || "تغییر رمز عبور انجام نشد.",
          );
        },
      },
    );
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>تغییر رمز عبور</h1>
      <p className={styles.subtitle}>رمز عبور باید حداقل ۸ حرفی باشد</p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <div className={styles.form_group}>
          <div
            className={`${styles.input_wrapper} ${
              errors.newPassword && styles.input_wrapper_error
            }`}
          >
            <div className={styles.input_group}>
              <input
                id="password-new"
                type={showNewPassword ? "text" : "password"}
                {...newPasswordRegister}
                className={styles.input}
              />

              <label
                htmlFor="password-new"
                className={`${styles.label} ${
                  newPassword ? styles.label_filled : ""
                }`}
              >
                رمز عبور جدید
                <span>*</span>
              </label>

              <button
                className={styles.password_toggle_btn}
                type="button"
                aria-label="نمایش رمز عبور"
                aria-controls="password-new"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setShowNewPassword((prev) => !prev);
                }}
              >
                <div className="d-flex">
                  <svg className={styles.visibility_icon} aria-hidden="true">
                    <use
                      href={`${showNewPassword ? "#visibilityOff" : "#visibilityOn"}`}
                    ></use>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {passwordStrength && (
          <div
            id="password-strength-indicator"
            className={styles.password_strength_indicator}
          >
            <div
              className={`${styles.strength_label} ${styles[passwordStrength]}`}
              id="strength-label"
            >
              {passwordStrength === "weak"
                ? "ضعیف"
                : passwordStrength === "medium"
                  ? "معمولی"
                  : "عالی شد"}
            </div>

            <div className={styles.strength_lines}>
              {[1, 2, 3].map((line) => (
                <div
                  key={line}
                  className={`${styles.strength_line} ${
                    line <=
                    (passwordStrength === "weak"
                      ? 1
                      : passwordStrength === "medium"
                        ? 2
                        : 3)
                      ? `${styles.active} ${styles[passwordStrength]}`
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <ul id="password-requirements" className={styles.password_requirements}>
          {!passwordChecks.hasNumber && (
            <li className={styles.requirement} id="req-number">
              شامل عدد
            </li>
          )}

          {!passwordChecks.hasLength && (
            <li className={styles.requirement} id="req-length">
              حداقل ۸ حرف
            </li>
          )}

          {!passwordChecks.hasSymbol && (
            <li className={styles.requirement} id="req-symbol">
              شامل علامت (!@#$%&amp;*^)
            </li>
          )}

          {!passwordChecks.hasCase && (
            <li className={styles.requirement} id="req-case">
              شامل یک حرف بزرگ و کوچک
            </li>
          )}
        </ul>

        <div className={styles.form_group}>
          <div
            className={`${styles.input_wrapper} ${
              errors.passwordConfirm && styles.input_wrapper_error
            }`}
          >
            <div className={styles.input_group}>
              <input
                id="password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                {...confirmPasswordRegister}
                className={styles.input}
                autoComplete="new-password"
              />
              <label
                htmlFor="password-confirm"
                className={`${styles.label} ${
                  confirmPassword ? styles.label_filled : ""
                }`}
              >
                تکرار رمز عبور جدید
                <span>*</span>
              </label>

              <button
                className={styles.password_toggle_btn}
                type="button"
                aria-label="نمایش رمز عبور"
                aria-controls="password-confirm"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                }}
              >
                <div className="d-flex">
                  <svg className={styles.visibility_icon} aria-hidden="true">
                    <use
                      href={`${showConfirmPassword ? "#visibilityOff" : "#visibilityOn"}`}
                    ></use>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.form_group}>
          <div id="form-buttons" className={styles.form_buttons}>
            <input
              className={styles.button}
              type="submit"
              value="تغییر رمز"
              disabled={!isValid || resetLoading || loginLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
