"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import toPersianDigits from "@/utils/toPersianDigits";
import toEnglishDigits from "@/utils/toEnglishDigits";

import styles from "./forgotPassword.module.css";

const schema = yup.object({
  username: yup
    .string()
    .required("لطفا این قسمت را خالی نگذارید")
    .test("is-valid", "شماره موبایل یا ایمیل نادرست است", (value) => {
      const englishValue = toEnglishDigits(value || "");

      return (
        /^(\+98|0)?9\d{9}$/.test(englishValue) ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(englishValue)
      );
    }),
});

export default function ForgotPassword({ username, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: username || "",
    },
  });

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      username: toEnglishDigits(data.username),
    };

    onSubmit(payload);
  };

  useEffect(() => {
    if (username) {
      reset({
        username: toPersianDigits(username),
      });
    }
  }, [username, reset]);

  return (
    <div>
      <h1 className={styles.title}>تغییر رمز عبور</h1>

      <p className={styles.subtitle}>
        برای تغییر رمز عبور، شماره موبایل یا ایمیل خود را وارد کنید
      </p>

      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={styles.form_group}>
          <div
            className={`${styles.input_wrapper} ${
              errors.username && styles.input_wrapper_error
            }`}
          >
            <input
              id="username"
              type="text"
              placeholder=" "
              {...register("username", {
                onChange: (e) => {
                  e.target.value = toPersianDigits(e.target.value);
                },
              })}
              className={styles.input}
            />

            <label
              htmlFor="username"
              className={`${styles.label} ${errors.username ? styles.error_label : ""}`}
            >
              شماره موبایل یا پست الکترونیک
            </label>
          </div>

          {errors.username && (
            <span className={styles.error_message}>
              {errors.username.message}
            </span>
          )}
        </div>

        <div className={styles.form_group}>
          <div id="form-buttons" className={styles.form_buttons}>
            <input
              className={styles.button}
              type="submit"
              value="تایید"
              tabIndex="2"
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
