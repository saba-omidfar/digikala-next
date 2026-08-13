import Link from "next/link";

import styles from "./loginFooter.module.css";

export default function LoginFooter() {
  return (
    <p className={styles.title}>
      ورود شما به معنای پذیرش{" "}
      <Link className={styles.title_link} href="/page/terms">
        شرایط دیجی‌کالا
      </Link>{" "}
      و{" "}
      <Link className={styles.title_link} href="/page/privacy">
        قوانین حریم‌خصوصی
      </Link>{" "}
      است
    </p>
  );
}
