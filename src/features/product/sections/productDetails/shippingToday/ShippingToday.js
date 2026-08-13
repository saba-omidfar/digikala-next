import { useProductContext } from "@/contexts/ProductContext";

import styles from "./shippingToday.module.css";

function ShippingToday() {
  const { activeVariant } = useProductContext();

  const isFreeShipping =
    activeVariant?.shipment_methods?.providers?.[0]?.price?.is_free &&
    activeVariant?.shipment_methods?.providers?.[0]?.shipping_mode === "seller";

  const isJetEligible =
    activeVariant?.digiplus?.is_jet_eligible ||
    activeVariant?.shipment_methods?.providers?.[0]?.shipping_mode === "jet";

  if (!isFreeShipping && !isJetEligible) return;

  return (
    <div
      className={`${styles.delivery_container} ${isJetEligible ? styles.jet_delivery_container : ""} ${isFreeShipping ? styles.free_delivery_container : ""}`}
    >
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className={styles.delivery_title_container}>
          <div className="d-flex" aria-hidden="false">
            <div
              className={`${styles.delivery_icon} ${isJetEligible ? styles.jet_icon : styles.seller_icon} cube-font-icon`}
              data-icon-name={`cube-shipping-${isJetEligible ? "today" : "seller"}`}
              data-icon={isJetEligible ? `` : ``}
            ></div>
          </div>
          <span className={styles.delivery_title}>
            {isJetEligible ? "تحویل امروز" : "ارسال رایگان فروشنده"}{" "}
            <span className={styles.delivery_subtitle}>
              {isJetEligible ? "با ارسال سریع دیجی‌کالا" : "برای این کالا"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShippingToday;
