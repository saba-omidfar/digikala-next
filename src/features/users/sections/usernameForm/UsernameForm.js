"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Loading from "@/components/modules/loading/Loading";

import styles from "./usernameForm.module.css";

import toPersianDigits from "@/utils/toPersianDigits";
import toEnglishDigits from "@/utils/toEnglishDigits";

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

export default function UsernameForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const usernameRegister = register("username");

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      username: toEnglishDigits(data.username),
    };

    onSubmit(payload);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${styles.form_group} ${styles.form_group_username}`}>
        <div
          className={`${styles.input_wrapper} ${
            errors.username && styles.input_wrapper_error
          }`}
        >
          <input
            id="username"
            type="text"
            {...usernameRegister}
            className={styles.input}
            onChange={(e) => {
              const value = e.target.value;

              e.target.value = toPersianDigits(value);

              usernameRegister.onChange(e);
            }}
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

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? (
          <Loading isSmall={true} bgColor="rgb(255,255,255)" />
        ) : (
          "ورود به دیجی‌کالا"
        )}
      </button>
    </form>
  );
}
