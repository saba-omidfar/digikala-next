"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { useQueryClient } from "react-query";

import { useSendCode, useVerifyCode } from "@/features/users/hooks/useCode";

import { useUserContext } from "@/contexts/UserContext";
import { useLoginWithPassword, useCheckUsername } from "@/hooks/useAuth";
import { useSnackbar } from "@/contexts/SnackbarContext";

import AuthHeader from "@/features/users/sections/authHeader/AuthHeader";
import LoginIntro from "@/features/users/sections/loginIntro/LoginIntro";
import LoginFooter from "@/features/users/sections/loginFooter/LoginFooter";
import UsernameForm from "@/features/users/sections/usernameForm/UsernameForm";
import ForgotPassword from "@/features/users/sections/forgotPassword/ForgotPassword";
import VerificationForm from "@/features/users/sections/verificationForm/VerificationForm";

import toPersianDigits from "@/utils/toPersianDigits";
import formatTime from "@/utils/formatTime";

import styles from "./login.module.css";
import ChangePassword from "../../sections/changePassword/ChangePassword";

export default function LoginPage() {
  const isVerifyingRef = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { guestCartId } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const isEmailUsername = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");

  const callbackUrl = searchParams.get("callbackUrl");

  const redirectUrl =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";

  const [step, setStep] = useState("username");
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [isNewPhone, setIsNewPhone] = useState(false);

  const { mutate: sendCode, isLoading: sendLoading } = useSendCode();
  const { mutate: verifyCode, isLoading: verifyLoading } = useVerifyCode();
  const { mutate: checkUsername, isLoading: checkUsernameLoading } =
    useCheckUsername();

  const { mutate: loginWithPasswordHandler, isLoading: loginLoading } =
    useLoginWithPassword();

  useEffect(() => {
    if (step !== "otp" || !expiresAt) {
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000),
      );

      setTimeLeft(remaining);
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [step, expiresAt]);

  const setOtpExpiration = useCallback((expiration) => {
    if (!expiration) {
      setExpiresAt(null);
      setTimeLeft(0);
      return;
    }

    setExpiresAt(expiration);
  }, []);

  const submitUsername = (value) => {
    const usernameValue = value.username;

    setUsername(usernameValue);
    setIsResetPassword(false);

    checkUsername(
      {
        username: usernameValue,
      },
      {
        onSuccess: (res) => {
          if (res.isEmail) {
            if (res.exists) {
              setLoginWithPassword(true);
              setStep("otp");

              return;
            }

            showSnackbar("شماره موبایل یا ایمیل نادرست است");
            return;
          }

          setIsNewPhone(!res.exists);
          setLoginWithPassword(false);

          sendCode(
            {
              username: usernameValue,
              guestCartId,
            },
            {
              onSuccess: (res) => {
                setStep("otp");
                setCode("");
                setOtpExpiration(res.expiresAt);

                showSnackbar(`کد تایید: ${res.demoOtp}`);
              },

              onError: (error) => {
                showSnackbar(error?.message || "خطا در ارسال کد تایید");
              },
            },
          );
        },

        onError: (error) => {
          showSnackbar(
            error?.response?.data?.message || "خطا در بررسی اطلاعات کاربر",
          );
        },
      },
    );
  };

  const resendCode = useCallback(() => {
    if (timeLeft > 0 || !username || sendLoading) {
      return;
    }

    sendCode(
      {
        username,
        guestCartId,
        purpose: isResetPassword ? "reset_password" : "login",
      },
      {
        onSuccess: (res) => {
          setCode("");
          setOtpExpiration(res.expiresAt);

          if (!isEmailUsername(username)) {
            showSnackbar(`کد تایید: ${res.demoOtp}`);
          }
        },

        onError: (error) => {
          showSnackbar(error?.message || "خطا در ارسال کد تایید");
        },
      },
    );
  }, [
    timeLeft,
    username,
    guestCartId,
    sendCode,
    sendLoading,
    showSnackbar,
    setOtpExpiration,
    isResetPassword,
  ]);

  const handleBackToOtp = useCallback(() => {
    setLoginWithPassword(false);

    if (!username || sendLoading) {
      return;
    }

    sendCode(
      {
        username,
        guestCartId,
        purpose: isResetPassword ? "reset_password" : "login",
      },
      {
        onSuccess: (res) => {
          setCode("");
          setOtpExpiration(res.expiresAt);

          if (!isEmailUsername(username)) {
            showSnackbar(`کد تایید: ${res.demoOtp}`);
          }
        },

        onError: (error) => {
          showSnackbar(error?.message || "خطا در ارسال کد تایید");
        },
      },
    );
  }, [
    timeLeft,
    username,
    guestCartId,
    sendCode,
    sendLoading,
    showSnackbar,
    setOtpExpiration,
    isResetPassword,
  ]);

  const resendSection = useMemo(() => {
    if (timeLeft <= 0) {
      return (
        <p
          id="countdown-timer"
          className={styles.countdown_timer}
          onClick={resendCode}
        >
          <span className={styles.timeout}>
            دریافت مجدد کد از طریق{" "}
            <span onClick={resendCode} className={styles.timeout_text}>
              پیامک{" "}
              <svg className={styles.chevron_icon} aria-hidden="true">
                <use href="#chevron-left"></use>
              </svg>
            </span>
          </span>
        </p>
      );
    }

    return (
      <p className={styles.verification_code_timer}>
        {toPersianDigits(formatTime(timeLeft))} مانده تا دریافت مجدد کد
      </p>
    );
  }, [timeLeft, resendCode]);

  const handleVerifyCode = useCallback(
    (value) => {
      if (
        !username ||
        value.length !== 5 ||
        timeLeft <= 0 ||
        verifyLoading ||
        isVerifyingRef.current
      ) {
        return;
      }

      isVerifyingRef.current = true;

      verifyCode(
        {
          username,
          code: value,
          guestCartId,
        },
        {
          onSuccess: async (res) => {
            if (isResetPassword) {
              isVerifyingRef.current = false;

              setResetToken(res.resetToken);
              setCode("");
              setExpiresAt(null);
              setTimeLeft(0);
              setLoginWithPassword(false);

              setStep("changePassword");

              return;
            }

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
            isVerifyingRef.current = false;

            const errorData = error?.response?.data;

            showSnackbar(errorData?.message || "کد وارد شده صحیح نیست");

            setCode("");

            if (errorData?.expired) {
              setTimeLeft(0);
              setExpiresAt(null);
            }
          },
        },
      );
    },
    [
      username,
      guestCartId,
      timeLeft,
      verifyLoading,
      verifyCode,
      isResetPassword,
      queryClient,
      router,
      showSnackbar,
      redirectUrl,
    ],
  );

  const handleForgotPassword = useCallback(
    (value) => {
      const forgotUsername = value.username;

      setUsername(forgotUsername);
      setIsResetPassword(true);

      sendCode(
        {
          username: forgotUsername,
          guestCartId,
          purpose: "reset_password",
        },
        {
          onSuccess: (res) => {
            setCode("");
            setOtpExpiration(res.expiresAt);
            setStep("otp");
            setLoginWithPassword(false);

            if (!isEmailUsername(forgotUsername)) {
              showSnackbar(`کد تایید: ${res.demoOtp}`);
            }
          },

          onError: (error) => {
            showSnackbar(error?.message || "خطا در ارسال کد تایید");
          },
        },
      );
    },
    [guestCartId, sendCode, setOtpExpiration, showSnackbar],
  );

  const handlePasswordLogin = useCallback(
    (data) => {
      if (!username || !data.password) return;

      loginWithPasswordHandler(
        {
          username,
          password: data.password,
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
                "شماره موبایل یا رمز عبور اشتباه است.",
            );
          },
        },
      );
    },
    [
      username,
      guestCartId,
      loginWithPassword,
      queryClient,
      router,
      redirectUrl,
      showSnackbar,
    ],
  );

  return (
    <div className={styles.login}>
      <div className={styles.form_card}>
        <AuthHeader
          step={step}
          onClick={() => {
            if (step === "otp" || step === "forgotPassword") {
              setStep("username");
              setCode("");
              setExpiresAt(null);
              setTimeLeft(0);
            } else {
              router.back();
            }
          }}
        />

        <div
          className={`${step === "forgotPassword" ? styles.password_content : styles.content}`}
        >
          {step === "username" && (
            <>
              <LoginIntro />
              <UsernameForm
                onSubmit={submitUsername}
                loading={checkUsernameLoading || sendLoading}
              />
              <LoginFooter />
            </>
          )}

          {step === "otp" && (
            <VerificationForm
              code={code}
              setCode={setCode}
              username={username}
              onSubmit={handleVerifyCode}
              onPasswordSubmit={handlePasswordLogin}
              loginWithPassword={loginWithPassword}
              setLoginWithPassword={setLoginWithPassword}
              setStep={setStep}
              onBackToOtp={handleBackToOtp}
              resendSection={resendSection}
              verifyLoading={verifyLoading}
              setIsResetPassword={setIsResetPassword}
              isNewPhone={isNewPhone}
            />
          )}

          {step === "forgotPassword" && (
            <ForgotPassword
              username={username}
              onSubmit={handleForgotPassword}
              loading={sendLoading}
            />
          )}

          {step === "changePassword" && (
            <ChangePassword username={username} resetToken={resetToken} />
          )}
        </div>
      </div>
    </div>
  );
}
