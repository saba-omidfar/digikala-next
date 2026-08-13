import Link from "next/link";
import Timer from "@/components/modules/timer/Timer";

import styles from "./amazingItem.module.css";

export default function AmazingItem({ product }) {
  const isPromotion = product?.default_variant?.price?.is_promotion;
  const isIncredible = product?.default_variant?.price?.is_incredible;

  const sellerShipment =
    product?.second_default_variant?.properties?.is_ship_by_seller;
  const isInDigikalaWarehouse =
    product?.second_default_variant?.properties?.in_digikala_warehouse;
  const digikalaJetShipment = product?.digiplus?.is_jet_eligible;

  const hasShipping =
    digikalaJetShipment || sellerShipment || isInDigikalaWarehouse;

  const getShipmentLabel = () => {
    if (digikalaJetShipment) return "ارسال سریع دیجی‌کالا";
    if (sellerShipment) return "ارسال فروشنده";
    if (isInDigikalaWarehouse) return "موجود در انبار دیجی‌کالا";
    return "";
  };

  return (
    <Link
      className={styles.product_link}
      target="_blank"
      href={`product/dkp-${product?.id}` || "#"}
    >
      <div className="h-100">
        <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
          <div className="d-flex align-items-center justify-content-start mb-2">
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
          </div>
          <div className="d-flex flex-grow-1 position-relative flex-column">
            <div>
              <div className="d-flex align-items-stretch flex-column position-relative mb-2">
                <div className="d-flex align-items-start mx-auto">
                  <div>
                    <div className={styles.product_mini_badges}>
                      <br />
                      <br />
                    </div>
                    <div className={styles.product_img_container}>
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={product?.images?.main?.url[0]}
                        />
                        <source
                          type="image/jpeg"
                          srcSet={product?.images?.main?.url[0]}
                        />
                        <img
                          className={styles.product_img}
                          src={product?.images?.main?.url[0]}
                          alt={product?.title_fa}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
              <div>
                <h3 className={styles.product_title}>{product?.title_fa}</h3>
              </div>

              <div className={styles.product_shipment_methods_container}>
                <div className="d-flex align-items-center">
                  {hasShipping && (
                    <div className={styles.product_icon_container}>
                      <div
                        className={`${styles.product_icon} ${
                          digikalaJetShipment
                            ? styles.product_digikala_jet_icon
                            : sellerShipment
                              ? styles.product_seller_shipment_icon
                              : styles.product_digikala_shipment_icon
                        } cube-font-icon`}
                        data-icon-name="cube-shipment"
                        data-icon={
                          digikalaJetShipment
                            ? "\uEA76"
                            : sellerShipment
                              ? "\uE97c"
                              : "\uE98C"
                        }
                      ></div>
                    </div>
                  )}
                  <p
                    className={`${styles.product_shipment_text} ${hasShipping ? "visible" : "invisible"}`}
                  >
                    {hasShipping ? getShipmentLabel() : "&nbsp;"}
                  </p>
                  <br />
                </div>

                {/* product?.default_variant?.variant_badges?.length &&
                  product?.default_variant?.variant_badges[0]?.payload?.text
                    ?.length && (
                    <div className="d-flex align-items-center">
                      <p className={styles.product_payload_text}>
                        {
                          product?.default_variant?.variant_badges[0]?.payload
                            ?.text
                        }
                      </p>
                      <br />
                    </div> */}
              </div>

              {/* <div className="mb-2 d-flex align-items-center justify-content-between">
                <div
                  className="flex items-center whitespace-nowrap"
                  data-ab-id=""
                >
                  <div className="flex shrink-0 ml-1" aria-hidden="false">
                    <svg>
                      <use href="#productAvailable"></use>
                    </svg>
                  </div>
                  <p class="text-caption text-neutral-600 text-neutral-700">
                    موجود در انبار دیجی کالا
                  </p>
                  <br />
                </div>
              </div> */}
              <div className="pt-2 d-flex flex-column align-items-stretch justify-content-between">
                <div className="d-flex align-items-center justify-content-between">
                  {product?.default_variant?.price?.discount_percent !== 0 && (
                    <div className={styles.discount_wrapper}>
                      <span
                        className={styles.discount_percent}
                        data-testid="price-discount-percent"
                      >
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
              <div className="mt-auto">
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
              </div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
