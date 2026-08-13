import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./plusTitle.module.css";

export default function PlusTitle() {
  const { isSmallScreen } = useScreenStatus();

  return (
    <div className="d-flex flex-column align-items-center">
      <video
        playsInline=""
        autoPlay=""
        loop=""
        className={styles.video}
        width={isSmallScreen ? 220 : 300}
        height={isSmallScreen ? 220 : 300}
      >
        <source
          src="https://digikala.arvanvod.ir/kGp7mgrY8V/OGoXgrlxVA/origin_6Uxwxl0zrcx2FCIKVOifdkFZuhMDwKypIKXpYRK3.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div
        role="img"
        aria-hidden="false"
        aria-label="logo-type"
        className={styles.logo_container}
      >
        <img
          src="/statics/img/svg/digiplus/landing/logo-type.svg"
          width="148"
          height="60"
          alt="logo-type"
          title=""
          className={styles.img}
        />
      </div>
      <h1 className={styles.title}>تجربه خرید آنلاین با ارسال رایگان</h1>
    </div>
  );
}
