"use client";

import toPersianDigits from "@/utils/toPersianDigits";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./productPriceBox.module.css";

export default function ProductPriceBox({ price, isShowSellersModal }) {
  const { isSmallScreen } = useScreenStatus();

  if (!price) return null;

  return (
    <div className={styles.product_price__container}>
      {price?.discount_percent !== 0 && (
        <div className={styles.product_prev_price__container}>
          <span
            className={styles.product_prev_price}
            style={{ marginLeft: isSmallScreen ? "20px" : "0px" }}
          >
            {(price?.rrp_price / 10).toLocaleString("fa-IR")}
          </span>
          {!isSmallScreen && price?.discount_percent !== 0 && (
            <div className={styles.product_price__discount_container}>
              <span
                className={styles.product_price__discount}
                id="price-discount-percent"
              >
                {toPersianDigits(price?.discount_percent)}٪
              </span>
            </div>
          )}
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between w-100">
        <div
          className="d-flex align-items-center justify-content-end w-100 gap-1"
          data-theme-animation="price-container"
        >
          <span
            className={`${isShowSellersModal ? styles.modal_product_price : styles.product_price}`}
            data-testid="price-no-discount"
          >
            {(price?.selling_price / 10).toLocaleString("fa-IR")}
          </span>
        </div>

        <div className="d-flex flex-row align-items-center">
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.product_price_icon}>
              <use href="#toman"></use>
            </svg>
          </div>
        </div>

        {isSmallScreen && price?.discount_percent !== 0 && (
          <div className={styles.product_price__discount_container}>
            <span
              className={styles.product_price__discount}
              id="price-discount-percent"
            >
              {toPersianDigits(price?.discount_percent)}٪
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
