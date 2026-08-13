import styles from "./plusHeader.module.css";

export default function PlusHeader() {
  return (
    <div className={styles.content}>
      <div className={styles.plus_icon_container} aria-hidden="false">
        <div
          className={`${styles.plus_icon} cube-font-icon`}
          data-icon-name="cube-badge-plus"
          data-icon=""
        ></div>
      </div>
      <div
        role="img"
        aria-hidden="false"
        aria-label="logo-type"
        className={styles.plus_img_container}
      >
        <img
          src="/statics/img/svg/digiplus/landing/logo-type.svg"
          width="78"
          height="32"
          alt="logo-type"
          title=""
          className={styles.plus_img}
        />
      </div>
    </div>
  );
}
