import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./promotionalItem.module.css";

function PromotionalItem({ product }) {
  const percent = product?.default_variant?.price?.discount_percent;
  const price = product?.default_variant?.price?.rrp_price / 10;

  return (
    <Link className={styles.product_card__link} href={product?.url?.uri}>
      <div className={styles.product_card} id="product-card">
        <article className="d-flex flex-column align-items-stretch justify-content-start h-100 overflow-hidden ">
          <div className="d-flex flex-grow-1 position-relative flex-column">
            <div>
              <div
                className="d-flex flex-column align-items-strech position-relative"
                style={{ marginBottom: "1px" }}
              >
                <div className="d-flex align-items-start mx-auto">
                  <div>
                    <div className={styles.product_img__mini_badge}>
                      <br />
                    </div>
                    <div className={styles.product_img_container}>
                      <div className={styles.product_img}>
                        <Image
                          width={150}
                          height={150}
                          src={product?.images?.main?.url?.[0]}
                          alt={product?.title_fa}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-stretch justify-content-start">
              <div
                className="d-flex flex-column align-items-stretch justify-content-between"
                style={{ paddingTop: "4px" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  {percent ? (
                    <div className={styles.product_price}>
                      <span
                        className={styles.product_price_percent}
                        id="price-discount-percent"
                      >
                        {percent.toLocaleString("fa-IR")}٪
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.product_final_price}>
                    <span id="price-final">
                      {(price - (price * percent) / 100).toLocaleString(
                        "fa-IR",
                      )}
                    </span>
                    <div className="d-flex justify-content-center align-items-center">
                      <div
                        data-icon-name="cube-value-toman"
                        data-icon="&#xE953;"
                        className={`${styles.product_icon} cube-font-icon`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              {percent ? (
                <div className={styles.product_price_no_discount_container}>
                  <div
                    id="price-no-discount"
                    className={styles.product_price_no_discount}
                  >
                    {price.toLocaleString("fa-IR")}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}

export default PromotionalItem;
