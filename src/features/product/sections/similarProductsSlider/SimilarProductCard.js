import React from "react";
import Link from "next/link";

import styles from "./similarProductCard.module.css";

const SkeletonCard = () => (
  <div className="block cursor-pointer relative bg-neutral-000 overflow-hidden grow py-3 px-4 lg:px-2 h-full">
    <svg
      aria-labelledby="loading-aria"
      role="img"
      viewBox="0 0 320 530"
      className="m-auto w-full h-full"
    >
      <title id="loading-aria">Loading...</title>
      <rect
        role="presentation"
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip)"
        style={{ fill: "url(#gradient)" }}
      />
      <defs>
        <clipPath id="clip">
          <rect x="16" y="16" rx="8" ry="8" width="288" height="272" />
          <rect x="16" y="308" rx="2" ry="2" width="288" height="20" />
          <rect x="164" y="344" rx="2" ry="2" width="140" height="20" />
          <rect x="16" y="400" rx="2" ry="2" width="98" height="20" />
          <rect x="16" y="454" rx="2" ry="2" width="136" height="20" />
        </clipPath>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#f3f3f3" />
          <stop offset="50%" stopColor="#ecebeb" />
          <stop offset="100%" stopColor="#f3f3f3" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

function similarProductCard({ product, isLoadingTabularRecommendation }) {
  if (isLoadingTabularRecommendation) {
    return <SkeletonCard />;
  }

  const time = product?.default_variant?.price?.timer;
  const price = product?.default_variant?.price?.rrp_price;
  const sellingPrice = product?.default_variant?.price?.selling_price;
  const percent = product?.default_variant?.price?.discount_percent;

  return (
    <Link
      className={styles.product_link}
      target="_blank"
      href={product?.url?.uri}
    >
      <div className={styles.product_bg}>
        <div className={styles.product_img_container}>
          <picture>
            <source
              type="image/webp"
              srcSet={product?.images?.main?.url?.[0]}
            />
            <source
              type="image/jpeg"
              srcSet={product?.images?.main?.url?.[0]}
            />
            <img
              className={styles.product_img}
              src={product?.images?.main?.url?.[0]}
              alt={product?.title_fa}
              title=""
            />
          </picture>
        </div>
      </div>
      <div className={styles.product_details}>
        <p className={styles.product_name}>{product?.title_fa}</p>
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
        <div>
          <div
            className={
              percent
                ? styles.product_price_details_with_percent
                : styles.product_price_details
            }
          >
            <div className="d-flex justify-content-start align-items-center gap-1">
              {percent !== 0 ? (
                <div className={styles.product_price__discount_wrapper}>
                  <span
                    className={styles.product_price__discount}
                    id="price-discount-percent"
                  >
                    {percent?.toLocaleString("fa-IR")}٪
                  </span>
                </div>
              ) : (
                ""
              )}
              {percent !== 0 && (
                <span className={styles.product_price}>
                  {(price / 10)?.toLocaleString("fa-IR")}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className={styles.product_final_price}>
                  {(sellingPrice / 10)?.toLocaleString("fa-IR")}
                </span>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.product_price_icon}>
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

export default similarProductCard;
