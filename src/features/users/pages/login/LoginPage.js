"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useQueryClient } from "react-query";

import { useSendCode, useVerifyCode } from "@/features/users/hooks/useCode";

import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import AuthHeader from "@/features/users/sections/authHeader/AuthHeader";
import LoginIntro from "@/features/users/sections/loginIntro/LoginIntro";
import LoginFooter from "@/features/users/sections/loginFooter/LoginFooter";
import UsernameForm from "@/features/users/sections/usernameForm/UsernameForm";
import VerificationForm from "@/features/users/sections/verificationForm/VerificationForm";

import toPersianDigits from "@/utils/toPersianDigits";
import formatTime from "@/utils/formatTime";

import styles from "./login.module.css";

export default function LoginPage() {
  const isVerifyingRef = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { guestCartId } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const callbackUrl = searchParams.get("callbackUrl");

  const redirectUrl =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";

  const [step, setStep] = useState("username");
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [loginWithPassword, setLoginWithPassword] = useState(false);

  const { mutate: sendCode, isLoading: sendLoading } = useSendCode();

  const { mutate: verifyCode, isLoading: verifyLoading } = useVerifyCode();

  // COUNTDOWN
  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // SEND CODE
  const submitUsername = (value) => {
    setUsername(value.username);

    sendCode(
      {
        username: value.username,
        guestCartId,
      },
      {
        onSuccess: (res) => {
          setStep("otp");
          setTimeLeft(180);

          showSnackbar(`کد تایید: ${res.demoOtp}`);
        },
      },
    );
  };

  // RESEND CODE
  const resendCode = useCallback(() => {
    if (timeLeft > 0 || !username) return;

    sendCode(
      {
        username,
        guestCartId,
      },
      {
        onSuccess: (res) => {
          setTimeLeft(180);

          showSnackbar(`کد تست: ${res.demoOtp}`);
        },

        onError: () => {
          showSnackbar("خطا در شبکه");
        },
      },
    );
  }, [timeLeft, username, guestCartId, sendCode, showSnackbar]);

  const resendSection = useMemo(() => {
    if (timeLeft === 0) {
      return (
        <p
          id="countdown-timer"
          data-sms-ttl="179"
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

  // VERIFY CODE
  const handleVerifyCode = useCallback(
    (value) => {
      if (
        !username ||
        value.length !== 5 ||
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
            if (res.clearGuestCartId) {
              localStorage.removeItem("guestCartId");
            }

            await Promise.all([
              queryClient.invalidateQueries(["me"]),
              queryClient.invalidateQueries(["UserCart"]),
            ]);

            // =========================
            // REDIRECT TO CALLBACK URL
            // =========================

            router.push(redirectUrl);
          },

          onError: (error) => {
            isVerifyingRef.current = false;

            showSnackbar(error?.message || "کد وارد شده صحیح نیست");

            setCode("");
          },
        },
      );
    },
    [
      username,
      guestCartId,
      verifyLoading,
      verifyCode,
      queryClient,
      router,
      showSnackbar,
      redirectUrl,
    ],
  );

  return (
    <div className={styles.login}>
      <div className={styles.form_card}>
        <AuthHeader
          isCodeSent={step === "otp"}
          onClick={() => {
            if (step === "otp") {
              setStep("username");
              setCode("");
            } else {
              router.back();
            }
          }}
        />

        <div className={styles.content}>
          {step === "username" && (
            <>
              <LoginIntro />
              <UsernameForm onSubmit={submitUsername} loading={sendLoading} />
              <LoginFooter />
            </>
          )}

          {step === "otp" && (
            <VerificationForm
              code={code}
              setCode={setCode}
              username={username}
              loginWithPassword={loginWithPassword}
              setLoginWithPassword={setLoginWithPassword}
              verifyLoading={verifyLoading}
              resendSection={resendSection}
              onVerify={handleVerifyCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
