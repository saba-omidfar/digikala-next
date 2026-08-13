import { useProductContext } from "@/contexts/ProductContext";

import styles from "./shippingBox.module.css";

export default function ShippingBox() {
  const { productDetails } = useProductContext();

  if (!productDetails?.digiplus?.fast_shipping_text) return;

  return (
    <div className="w-100 px-3 d-flex align-items-center">
      <div className={`${styles.club_info} flex-column`}>
        <div
          className="d-flex justify-content-start align-items-center flex-row"
          style={{ marginBottom: "8px" }}
        >
          <div className={styles.club_info_icon_container}>
            <div
              className={`${styles.club_info_icon} cube-font-icon`}
              data-icon-name="cube-badge-plus"
              data-icon="&#xE9B4;"
            ></div>
          </div>
          <p className={styles.club_info_title}>ویژه اعضای پلاس</p>
        </div>
        <ul className="d-flex flex-column">
          <li className="d-flex ms-3 align-items-center">
            <div className={styles.list_item__bullet_container}>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.list_item__plus_bullet}>
                  <use href="#variationColor"></use>
                </svg>
              </div>
              <span className={styles.list_item__bullet_line_top}></span>
              <span className={styles.list_item__bullet_line_bottom}></span>
            </div>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.delivery_express_icon}>
                <use href="#deliveryToday"></use>
              </svg>
            </div>
            <p className={styles.club_info_text}>
              {productDetails?.digiplus?.services_summary}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
