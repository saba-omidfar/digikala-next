import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./verticalProductCardBG.module.css";
import toPersianDigits from "@/utils/toPersianDigits";

function VerticalProductCardBG({ product }) {
  const time = product?.default_variant?.price?.timer;
  const price = product?.default_variant?.price?.rrp_price;
  const sellingPrice = product?.default_variant?.price?.selling_price;
  const percent = product?.default_variant?.price?.discount_percent;

  return (
    <Link
      href={product ? product?.url?.uri : "#"}
      className={styles.product_link}
    >
      <div className={styles.product_img_bg}>
        <div className={styles.product_img_container}>
          <picture>
            <source
              type="image/webp"
              srcSet={product?.images?.main?.webp_url?.[0]}
            />
            <source
              type="image/jpeg"
              srcSet={product?.images?.main?.url?.[0]}
            />
            <img
              className={styles.product_img}
              src={product?.images?.main?.url?.[0]}
              width="138"
              height="138"
              alt={product.title_fa}
              title=""
            />
          </picture>
        </div>
      </div>
      <div className={styles.product_info}>
        <p className={styles.product_title}>{product?.title_fa}</p>

        {product?.properties?.is_fake ? (
          <div className={styles.product_badges_container}>
            <div className={styles.product_badges}>
              <div
                className={`${styles.product_badge} ${product?.properties?.is_fake ? styles.fake_badge : ""}`}
              >
                <span>{product?.properties?.is_fake ? " غیراصل" : ""}</span>
              </div>
              <br />
              <br />
            </div>
          </div>
        ) : (
          <div className={styles.product_shipping_container}>
            <div className={styles.product_shipping}>
              <div className={styles.poduct_badges_item}>
                <span></span>
              </div>
              <br />
              <br />
            </div>
          </div>
        )}
        <div>
          <div
            className={
              percent === 0
                ? styles.price_container_without_discount
                : styles.price_container_with_discount
            }
          >
            {percent !== 0 ? (
              <div className={styles.product_discount_container}>
                <div className={styles.product_discount_badge}>
                  <span
                    className={styles.product_discount}
                    data-testid="price-discount-percent"
                  >
                    {toPersianDigits(percent)}٪
                  </span>
                </div>
                <span className={styles.product_price}>
                  {(price / 10).toLocaleString("fa-IR")}
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className={styles.product_final_price}>
                  {(sellingPrice / 10).toLocaleString("fa-IR")}
                </span>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.product_icon}>
                    <use href="#toman"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VerticalProductCardBG;
