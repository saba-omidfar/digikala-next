import toPersianDigits from "@/utils/toPersianDigits";
import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./sellerDigiclub.module.css";

function SellerDigiclub() {
  const { openMobileModal } = useModal();
  const { activeVariant } = useProductContext();

  return (
    <div
      className={styles.digiclub_container}
      onClick={() => openMobileModal("digiclub")}
    >
      <div className={styles.digiclub_icon_container}>
        <div className={styles.digiclub_icon_bg} aria-hidden="false">
          <div
            className={`${styles.digiclub_icon} cube-font-icon`}
            data-icon-name="cube-badge-club-coin"
            data-icon=""
          ></div>
        </div>
      </div>
      <div className={styles.digiclub_text_container}>
        <div className="d-flex justify-content-between align-items-center">
          <span className={styles.digiclub_text}>
            {toPersianDigits(activeVariant?.digiclub?.point)} امتیاز دیجی‌کلاب
            دریافت می‌کنید
          </span>
          <div className="d-flex" aria-hidden="false">
            <div
              className={`${styles.chevron_icon} cube-font-icon`}
              data-icon-name="cube-nav-chevron-left"
              data-icon=""
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDigiclub;
