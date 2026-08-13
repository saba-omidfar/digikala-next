import styles from "./loginIntro.module.css";

export default function LoginIntro() {
  return (
    <>
      <h1 className={styles.title}> ورود یا ثبت‌نام در دیجی‌کالا </h1>
      <p className={styles.title_text}>
        <span>لطفا شماره موبایل یا ایمیل خود را وارد کنید</span>
      </p>
    </>
  );
}
