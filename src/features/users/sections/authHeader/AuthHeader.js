import styles from "./authHeader.module.css";

export default function AuthHeader({ step, onClick }) {
  return (
    <header className={styles.form_header}>
      <h1 id="dk-page-title" className={styles.page_title}>
        <div id="reset-login" className={styles.reset_login} onClick={onClick}>
          <svg
            className={styles.arrow_icon}
            width={24}
            height={24}
            aria-hidden="true"
          >
            <use href="#arrowRight"></use>
          </svg>
        </div>
        {step !== "forgotPassword" && step !== "changePassword" ? (
          <div id="dk-header">
            <div id="dk-header-wrapper" className={styles.header_wrapper}>
              <img
                src="https://www.digikala.com/brand/full-horizontal.svg"
                alt="Digikala Logo"
                className={styles.logo}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </h1>
    </header>
  );
}
