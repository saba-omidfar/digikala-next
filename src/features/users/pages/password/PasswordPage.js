"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

import UsernameForm from "@/features/users/sections/usernameForm/UsernameForm";
import AuthHeader from "@/features/users/sections/authHeader/AuthHeader";

import styles from "@/styles/login.module.css";

// ✅ تعریف قوانین اعتبارسنجی
const schema = yup.object({
  username: yup
    .string()
    .required("لطفا این قسمت را خالی نگذارید")
    .test("is-valid", "شماره موبایل یا ایمیل نادرست است", (value) => {
      const phoneRegex = /^(\+98|0)?9\d{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return phoneRegex.test(value) || emailRegex.test(value);
    }),
});

export default function PasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const backUrl = searchParams.get("backUrl");

  const [userInput, setUserInput] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const [passwordVisibile, setPasswordVisible] = useState(false);

  // ✅ راه‌اندازی فرم با react-hook-form
  const {
    register, // برای اتصال input
    handleSubmit, // هندل‌کننده سابمیت فرم
    formState: { errors }, // لیست خطاها
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // یعنی ولیدیشن بعد از خروج از input انجام بشه
  });

  // ✅ هندل سابمیت موفق
  const onSubmit = (data) => {
    console.log("ورودی معتبر:", data.username);
    setUserInput(data.username);
    setStep("CODE");
    // router.push(backUrl || "/");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("کد تایید ارسال شد!");
    router.push(backUrl || "/");
  };

  return (
    <main className={styles.account_wrapper}>
      <div className={styles.account_wrapper__main_box}>
        <AuthHeader onClick={() => router.back()} />
        {/* <div className={styles.logo_title} onClick={() => router.back()}>
          <div className={styles.logo_icon_container}>
            <svg className={styles.logo_icon}>
              <use href="#arrowRight"></use>
            </svg>
          </div>
          <Link href="/">
            <div className={styles.logo_container}>
              <Image
                className={styles.logo}
                fill
                src="/images/brands/full-vertical.svg"
                alt="لوگوی دیجیکالا"
              />
            </div>
          </Link>
        </div> */}

        <div className="w-100">
          {verificationCode ? (
            <h1
              className={
                verificationCode
                  ? styles.password_title
                  : styles.verification_code_title
              }
            >
              کد تایید را وارد کنید
            </h1>
          ) : (
            <div className={styles.account_wrapper__title}>تغییر رمز عبور</div>
          )}

          <p
            className={styles.account_wrapper__header_text}
            style={{ marginBottom: "16px" }}
          >
            {verificationCode
              ? `کد تایید برای شماره ${userInput.toLocaleString(
                  "fa-IR",
                )} ارسال شد`
              : "برای تغییر رمز عبور، شماره موبایل یا ایمیل خود را وارد کنید"}
          </p>
          <UsernameForm loading={sendCodeIsLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </main>
  );
}
