"use client";

import { useSearchParams } from "next/navigation";

import styles from "./authHeader.module.css";

export default function AuthHeader({ isCodeSent, onClick }) {
  const searchParams = useSearchParams();
  const backUrl = searchParams.get("backUrl");

  return (
    <header className={styles.form_header}>
      <h1 id="dk-page-title" className={styles.page_title}>
        <div id="reset-login" className={styles.reset_login} onClick={onClick}>
          {!!backUrl ||
            (isCodeSent && (
              <svg className={styles.arrow_icon} aria-hidden="true">
                <use href="#arrow-right"></use>
              </svg>
            ))}
        </div>
        <div
          id="dk-header"
          className={`${styles.header_without_client_logo} ${styles.header_default}`}
        >
          <div id="dk-header-wrapper" className={styles.header_wrapper}>
            <img
              src="https://www.digikala.com/brand/full-horizontal.svg"
              alt="Digikala Logo"
              className={styles.logo}
            />
          </div>
        </div>
      </h1>
    </header>
  );
}
