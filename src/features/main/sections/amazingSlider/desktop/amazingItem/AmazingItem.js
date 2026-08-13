import Link from "next/link";
import Image from "next/image";

import Timer from "@/components/modules/timer/Timer";

import styles from "./amazingItem.module.css";

export default function AmazingItem({ product, index }) {
  const isPromotion = product?.default_variant?.price?.is_promotion;
  const isIncredible = product?.default_variant?.price?.is_incredible;

  return (
    <Link
      className={`${styles.product_link} ${index === 0 ? styles.rounded_r_md : ""}`}
      target="_blank"
      href={`product/dkp-${product?.id}` || "#"}
    >
      <div className="h-100">
        <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
          {/* <div className="d-flex align-items-center justify-content-start mb-2">
            {isIncredible ? (
              product?.default_variant?.price?.badge?.title ===
              "شگفت‌انگیز سفارشی" ? (
                <>
                  <div
                    aria-hidden="true"
                    className={styles.product_promotion_top_badge}
                  >
                    <img
                      src="/images/svg/productCard/topBadge/PromotedIncredibleOffer.svg"
                      alt={product?.title_fa}
                      className={styles.product_badge_img}
                    />
                  </div>
                  <div className={styles.product_top_badge_text}>
                    <br />
                  </div>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {isIncredible ? (
              product?.default_variant?.price?.badge?.title ===
              "پیشنهاد شگفت انگیز" ? (
                <>
                  <div
                    aria-hidden="false"
                    className={styles.product_incredible_top_badge}
                  >
                    <img
                      src="/images/svg/productcard/topBadge/IncredibleOffer.svg"
                      alt={product?.title_fa}
                      className={styles.product_badge_img}
                    />
                  </div>
                  <div className={styles.product_top_badge_text}>
                    <br />
                  </div>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {isPromotion && (
              <div
                aria-hidden="false"
                className={styles.product_promotion_top_badge}
              >
                <img
                  src="/images/svg/productcard/topBadge/SpecialSell.svg"
                  alt={product?.title_fa}
                  className={styles.product_top_badge_img}
                />
              </div>
            )}

            {!isPromotion && !isIncredible && (
              <div className="flex-grow-1">
                <br />
              </div>
            )}
          </div> */}
          <div className="d-flex flex-grow-1 position-relative flex-column">
            <div>
              <div className={styles.product_img_container}>
                <div className="d-flex align-items-start mx-auto">
                  <div>
                    <div className={styles.product_img__mini_badges}>
                      <br />
                      <br />
                    </div>
                    <div className={styles.product_img_container}>
                      <img
                        width={150}
                        height={150}
                        className={styles.product_img}
                        src={product?.images?.main?.url[0]}
                        alt={product?.title_fa}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
              <div className={styles.product_price_content}>
                <div className="d-flex align-items-center justify-content-between">
                  {product?.default_variant?.price?.discount_percent !== 0 && (
                    <div className={styles.discount_wrapper}>
                      <span className={styles.discount_percent}>
                        {product?.default_variant?.price?.discount_percent?.toLocaleString(
                          "fa-IR",
                        )}
                        ٪
                      </span>
                    </div>
                  )}
                  <div className={styles.product_price_wrapper}>
                    <span className={styles.product_price}>
                      {Math.ceil(
                        product?.default_variant?.price?.selling_price,
                      ).toLocaleString("fa-IR")}
                    </span>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.price_icon}>
                        <use href="#toman"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.product_discount_container}>
                  <div className={styles.product_discount}>
                    {(product?.default_variant?.price?.rrp_price).toLocaleString(
                      "fa-IR",
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="mt-auto">
                {product?.default_variant?.price?.is_finished ? (
                  <div className={styles.progress_ended_container}>
                    <span className={styles.progress_ended}></span>
                    <span className={styles.progress_ended_text}>
                      پایان تخفیف
                    </span>
                  </div>
                ) : (
                  <div>
                    <div
                      className={`${styles.progress_bar} ${
                        product?.default_variant.price?.sold_percentage
                          ? "visible"
                          : "invisible"
                      } `}
                    >
                      <div
                        className={styles.progress_bar_timeline__active}
                        style={{
                          width: `${product?.default_variant.price?.sold_percentage}%`,
                        }}
                      ></div>
                    </div>
                    <div
                      className="d-flex justify-content-between pt-1"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <div
                        className={
                          product?.default_variant.price?.sold_percentage
                            ? "visible"
                            : "invisible"
                        }
                      >
                        <span className={styles.product_sold_out_percent}>
                          {product?.default_variant.price?.sold_percentage?.toLocaleString(
                            "fa-IR",
                          )}
                          %
                        </span>
                        <span className={styles.product_sold_out_text}>
                          فروش رفته
                        </span>
                      </div>
                      {product?.default_variant?.price?.timer && (
                        <div className={styles.time_container}>
                          <Timer
                            seconds={product?.default_variant?.price?.timer}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
