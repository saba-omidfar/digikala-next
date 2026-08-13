import { useProductContext } from "@/contexts/ProductContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./sellerWarranty.module.css";

function SellerWarranty() {
  const { activeVariant } = useProductContext();

  return (
    <div className={styles.warranty_container}>
      <div className={styles.warranty_icon_container}>
        <div className={styles.warranty_icon_bg} aria-hidden="false">
          <div
            className={`${styles.warranty_icon} cube-font-icon`}
            data-icon-name="cube-shop-guarantee"
            data-icon=""
          ></div>
        </div>
      </div>
      <div className={styles.warranty_title_container}>
        <div className="d-flex justify-content-start align-items-center">
          <span className={styles.warranty_title}>
            {toPersianDigits(activeVariant?.warranty?.title_fa)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default SellerWarranty;
