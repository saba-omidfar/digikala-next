"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./usernameForm.module.css";

const schema = yup.object({
  username: yup
    .string()
    .required("لطفا این قسمت را خالی نگذارید")
    .test(
      "is-valid",
      "شماره موبایل یا ایمیل نادرست است",
      (value) =>
        /^(\+98|0)?9\d{9}$/.test(value) ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    ),
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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.form_group} ${styles.form_group_username}`}>
        <div
          className={`${styles.input_wrapper} ${errors.username && styles.input_wrapper_error}`}
        >
          <input
            id="phone"
            type="text"
            {...register("username")}
            className={styles.input}
          />

          <label htmlFor="username" className={styles.label}>
            شماره موبایل یا پست الکترونیک
          </label>
        </div>

        {errors.username && (
          <span className={styles.error_message}>
            {errors.username.message}
          </span>
        )}
      </div>

      <button className={styles.form_buttons} type="submit">
        <input
          className={styles.button}
          type="submit"
          value="ورود به دیجی‌کالا"
        />
      </button>
    </form>
  );
}
