import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Spinner from "@/utils/Spinner";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./verificationForm.module.css";

const otpSchema = yup.object({
  code: yup
    .string()
    .required("کد را وارد کنید")
    .length(5, "کد باید ۵ رقم باشد"),
});

const passwordSchema = yup.object({
  password: yup.string().required("رمز عبور را وارد کنید"),
});

export default function VerificationForm({
  code,
  setCode,
  username,
  onSubmit,
  loginWithPassword,
  setLoginWithPassword,
  resendSection,
  verifyLoading,
  onVerify,
}) {
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    mode: "onSubmit",
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
  });

  return (
    <>
      <h1 className={styles.title}>
        {loginWithPassword ? "رمز عبور را وارد کنید" : "کد تایید را وارد کنید"}
      </h1>

      {!loginWithPassword && (
        <p className={styles.verification_code_sending}>
          کد تایید برای شماره{" "}
          <span className={styles.verification_code_text_strong}>
            {toPersianDigits(username?.toLocaleString("fa-IR"))}
          </span>{" "}
          پیامک شد
        </p>
      )}

      <form
        className={styles.form}
        onSubmit={
          loginWithPassword
            ? handlePasswordSubmit(onSubmit)
            : handleOtpSubmit(onSubmit)
        }
      >
        {!loginWithPassword ? (
          <>
            <div className={styles.form_group}>
              <div
                className={`${styles.input_wrapper} ${
                  otpErrors.code && styles.input_wrapper_error
                }`}
              >
                <input
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 5);

                    setCode(value);

                    if (value.length === 5) {
                      onVerify(value);
                    }
                  }}
                  type="text"
                  id="code"
                  name="code"
                  autoComplete="one-time-code"
                  className={styles.input}
                  maxLength="5"
                  inputMode="numeric"
                  autoFocus
                  tabIndex="1"
                />

                {otpErrors.code && (
                  <span
                    id="input-error-totp"
                    className={styles.error_message}
                    aria-live="polite"
                    role="alert"
                  >
                    {otpErrors.code.message}
                  </span>
                )}
              </div>
            </div>

            <div id="password-option" className={styles.password_option}>
              <input
                type="hidden"
                id="password-auth-execution"
                value="29dc4b81-5719-4652-89cd-264a83387cf1"
              />

              <button
                tabIndex="5"
                type="button"
                id="password-button"
                className={styles.password_button}
                data-password-submit=""
                onClick={() => setLoginWithPassword(true)}
              >
                ورود با رمز عبور
                <svg className={styles.chevron_icon} aria-hidden="true">
                  <use href="#chevron-left"></use>
                </svg>
              </button>
            </div>

            {resendSection}
          </>
        ) : (
          <div className={styles.form_group}>
            <div className={styles.input_group} dir="ltr">
              <input
                {...registerPassword("password")}
                tabIndex="1"
                id="password"
                className={styles.input}
                name="password"
                type="text"
                autoComplete="off"
                autoFocus
                data-error-message=" "
              />

              <button
                className={`${styles.password_toggle_btn} ${styles.password_visible}`}
                type="button"
                aria-label="Hide password"
                aria-controls="password"
                data-password-toggle=""
                data-label-show="Show password"
                data-label-hide="Hide password"
              >
                <div className="d-flex">
                  <svg
                    className={`${styles.visibility_icon} ${styles.icon_visibility_off}`}
                    aria-hidden="true"
                  >
                    <use href="#visibility-off"></use>
                  </svg>
                </div>

                <div className="d-flex">
                  <svg
                    className={`${styles.visibility_icon} ${styles.icon_visibility_on}`}
                    aria-hidden="true"
                  >
                    <use href="#visibility-on"></use>
                  </svg>
                </div>
              </button>
            </div>

            {passwordErrors.password && (
              <span
                id="input-error-password"
                className={styles.error_message}
                aria-live="polite"
                role="alert"
              >
                {passwordErrors.password.message}
              </span>
            )}

            <div id="login-options" className={styles.login_options}>
              <div id="otp-option" className={styles.otp_option}>
                <input
                  type="hidden"
                  className={styles.otp_auth_execution}
                  id="otp-auth-execution"
                  value="45b60887-01a9-44ab-a13b-9e669dcb744a"
                />

                <button
                  tabIndex="2"
                  type="button"
                  id="otp-button"
                  className={styles.otp_button}
                  data-otp-submit=""
                  onClick={() => setLoginWithPassword(false)}
                >
                  ورود با رمز یک‌بار‌مصرف
                  <div className="d-flex">
                    <svg className={styles.chevron_icon} aria-hidden="true">
                      <use href="#chevron-left"></use>
                    </svg>
                  </div>
                </button>
              </div>

              <div
                id="forgot-password-option"
                className={styles.forgot_password_option}
              >
                <span tabIndex="3" className={styles.forgot_password_text}>
                  فراموشی رمز عبور
                </span>

                <div className="d-flex">
                  <svg className={styles.chevron_icon} aria-hidden="true">
                    <use href="#chevron-left"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      <div className={styles.form_group}>
        <div id="form-buttons" className={styles.form_buttons}>
          {verifyLoading ? (
            <button className={styles.button}>
              <div className={styles.spinner}>
                <Spinner size={16} color="rgb(237, 25, 68)" />
              </div>
            </button>
          ) : (
            <input
              className={styles.button}
              type="submit"
              value="تایید"
              tabIndex="2"
            />
          )}
        </div>
      </div>
    </>
  );
}
