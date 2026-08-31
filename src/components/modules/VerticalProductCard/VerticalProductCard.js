import React, { memo } from "react";

import Link from "next/link";

import Timer from "../timer/Timer";

import toPersianDigits from "@/utils/toPersianDigits";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetIncredibleNotificationStatus } from "@/hooks/useProduct";
import useLoginRedirect from "@/hooks/useLoginRedirect";

import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./verticalProductCard.module.css";

function VerticalProductCard({
  systemColor,
  width,
  product,
  index,
  isSkeleton,
  linkClassName,
  imgContainerClassName,
  isVertical,
  hasBorderLeft,
  hasProductBadge,
  hasNoTopBadge,
  hasPromotionTimeline,
  hasBuyersCount,
  hasNoColors,
  hasNoRating,
  hasNoShipping,
  hasBadge,
  roundedClass,
  isIncredibleTeasing,
}) {
  const { isMobile } = useScreenStatus();
  const { showSnackbar } = useSnackbar();
  const { redirectToLogin } = useLoginRedirect();

  const priceSoldPercentage = product?.default_variant?.price?.sold_percentage;
  const sellerShipment =
    product?.second_default_variant?.properties?.is_ship_by_seller;
  const isInDigikalaWarehouse =
    product?.second_default_variant?.properties?.in_digikala_warehouse;
  const digikalaJetShipment = product?.digiplus?.is_jet_eligible;
  const discountPercent = product?.default_variant?.price?.discount_percent;

  const isPromotion = product?.default_variant?.price?.is_promotion;
  const isIncredible = product?.default_variant?.price?.is_incredible;

  const getShipmentLabel = () => {
    if (digikalaJetShipment) return "ارسال سریع دیجی‌کالا";
    if (sellerShipment) return "ارسال فروشنده";
    if (isInDigikalaWarehouse) return "موجود در انبار دیجی‌کالا";
    return "";
  };

  const uniqueId = React.useId();
  const clipId = `product-card-clip-${uniqueId}`;
  const gradientId = `product-card-gradient-${uniqueId}`;

  const { user } = useUserContext();
  const { data: incredibleStatus, isLoading: isLoadingIncredibleStatus } =
    useGetIncredibleNotificationStatus({ productId: product?.id });

  const { addIncredibleNotification, removeIncredibleNotification } =
    useProductContext();

  const notifeMeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoadingIncredibleStatus) return;

    if (!user) {
      redirectToLogin();
      return;
    }

    if (incredibleStatus?.is_active) {
      removeNotificationHandler();
    } else {
      addNotificationHandler();
    }
  };

  const addNotificationHandler = () => {
    addIncredibleNotification(
      {
        productId: product?.id,
      },
      {
        onSuccess: () => {
          showSnackbar("اطلاع‌رسانی شگفت‌انگیز ثبت شد.");
        },
      },
    );
  };

  const removeNotificationHandler = () => {
    removeIncredibleNotification(
      {
        productId: product?.id,
      },
      {
        onSuccess: () => {
          showSnackbar("اطلاع‌رسانی شگفت‌انگیز حذف شد.");
        },
      },
    );
  };

  if (isSkeleton)
    return (
      <div
        className="product_list__item h-100"
        style={{
          width: width || "100%",
        }}
      >
        <div className={styles.skeleton_card}>
          <svg
            aria-labelledby="po0zakf-aria"
            role="img"
            viewBox="0 0 320 530"
            className="m-auto w-100 h-100"
          >
            <title id="po0zakf-aria">Loading...</title>
            <rect
              role="presentation"
              x="0"
              y="0"
              width="100%"
              height="100%"
              clipPath={`url(#${clipId})`}
              style={{ fill: `url(#${gradientId})` }}
            ></rect>
            <defs>
              <clipPath id={clipId}>
                <rect
                  x="16"
                  y="16"
                  rx="8"
                  ry="8"
                  width="288"
                  height="272"
                ></rect>
                <rect
                  x="16"
                  y="308"
                  rx="2"
                  ry="2"
                  width="288"
                  height="20"
                ></rect>
                <rect
                  x="164"
                  y="344"
                  rx="2"
                  ry="2"
                  width="140"
                  height="20"
                ></rect>
                <rect
                  x="16"
                  y="400"
                  rx="2"
                  ry="2"
                  width="98"
                  height="20"
                ></rect>
                <rect
                  x="16"
                  y="454"
                  rx="2"
                  ry="2"
                  width="136"
                  height="20"
                ></rect>
              </clipPath>
              <linearGradient id={gradientId}>
                <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
                <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
                <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );

  return (
    <article
      className="product_list__item h-100"
      data-product-index={index + 1}
    >
      <Link
        target="_blank"
        href={product?.url?.uri ? product?.url?.uri : "#"}
        className={`${linkClassName} ${roundedClass} ${hasBorderLeft ? styles.borderLeft : ""}`}
        style={{
          color: systemColor ? "" : "#fff",
        }}
      >
        <div className="h-100" id="product-card">
          <article className={styles.product_content_wrapper}>
            {hasBadge && (
              <div className="d-flex align-items-center justify-content-start mb-2">
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

                {isIncredible && (
                  <div
                    aria-hidden="false"
                    className={styles.product_incredible_top_badge}
                  >
                    <img
                      src="/images/svg/productcard/topBadge/IncredibleOffer.svg"
                      alt={product?.title_fa}
                      className={styles.product_top_badge_img}
                    />
                  </div>
                )}

                <div
                  aria-hidden="false"
                  className={styles.product_top_badge_text}
                >
                  <br />
                </div>
              </div>
            )}
            <div
              className={`${isVertical ? styles.column_direction : styles.row_direction}`}
            >
              {hasProductBadge ? (
                <div className={styles.product_badge}>
                  <span className={styles.product_ranke_badge}>
                    {(index + 1).toLocaleString("fa-IR")}
                  </span>
                </div>
              ) : (
                ""
              )}
              <div className={styles.product_img_content}>
                <div
                  className="d-flex align-items-stretch flex-column position-relative"
                  style={{ marginBottom: isMobile ? "0" : "4px" }}
                >
                  <div
                    className={`${
                      isMobile
                        ? "d-flex flex-column"
                        : "d-flex align-items-start mx-auto"
                    }`}
                  >
                    <div>
                      <div
                        aria-hidden="false"
                        aria-label={product?.title}
                        className={imgContainerClassName}
                      >
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
                            alt={product?.title_fa}
                            title=""
                          />
                        </picture>
                      </div>
                    </div>
                    {product?.colors && !hasNoColors && (
                      <div
                        className={
                          isMobile
                            ? styles.product_colors_container
                            : styles.product_top_left_colors_container
                        }
                      >
                        {product?.colors?.slice(0, 3).map((color) => (
                          <span
                            key={color?.id}
                            className={styles.product_colors_item}
                            style={{ backgroundColor: color?.hex_code }}
                          ></span>
                        ))}
                        {product?.colors?.length > 3 && (
                          <div className="d-flex" aria-hidden="false">
                            <svg className={styles.product_colors_plus_icon}>
                              <use href="#addSimple"></use>
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                {!hasNoTopBadge && (
                  <div
                    className="d-flex align-items-center justify-content-start flex-wrap"
                    style={{ marginBottom: "4px", gap: "4px" }}
                  >
                    <br />
                    <br />
                  </div>
                )}
                <div>
                  <h3 className={styles.product_title}>{product?.title_fa}</h3>
                </div>

                {!hasNoShipping && (
                  <div className={styles.product_shipment_methods_container}>
                    {digikalaJetShipment ||
                    sellerShipment ||
                    isInDigikalaWarehouse ? (
                      <div className="d-flex align-items-center">
                        <div
                          className={styles.product_icon_container}
                          style={{ marginLeft: "4px" }}
                        >
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
                        <p className={styles.product_shipment_text}>
                          {getShipmentLabel()}
                        </p>
                        <br />
                      </div>
                    ) : product?.default_variant?.variant_badges?.length &&
                      product?.default_variant?.variant_badges[0]?.payload?.text
                        ?.length ? (
                      <div className="d-flex align-items-center w-100">
                        <p className={styles.product_payload_text}>
                          {
                            product?.default_variant?.variant_badges[0]?.payload
                              ?.text
                          }
                        </p>
                        <br />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.rating_container}>
                      {hasBuyersCount ? (
                        <p
                          className={styles.product_buyers_count}
                        >{`(${toPersianDigits(product?.rating?.count)})`}</p>
                      ) : (
                        ""
                      )}
                      {!hasNoRating &&
                        product?.rating?.rate &&
                        product?.rating?.rate !== 0 && (
                          <div className="d-flex align-items-center w-100">
                            <p className={styles.product_rate}>
                              {toPersianDigits(
                                Math.round(
                                  (product?.rating?.rate / 100) * 5 * 10,
                                ) / 10,
                              )}
                            </p>
                            <div className={styles.product_icon_container}>
                              <div
                                className={`${styles.product_rate_icon} cube-font-icon`}
                                data-icon-name="cube-star-fill"
                                data-icon="&#xE928;"
                              ></div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}
                <div className="d-flex align-items-strech justify-content-between flex-column pt-1">
                  <div className="d-flex align-items-center justify-content-between">
                    {discountPercent ? (
                      <div className={styles.product_price__discount_wrapper}>
                        <span
                          className={styles.product_price_percent}
                          id="price-discount-percent"
                        >
                          {discountPercent?.toLocaleString("fa-IR")}٪
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.product_final_price}>
                      {product?.default_variant ? (
                        <>
                          <span id="price-final">
                            {(
                              product?.default_variant?.price?.selling_price /
                              10
                            ).toLocaleString("fa-IR")}
                          </span>
                          <div className="d-flex">
                            <div
                              className={`${styles.product_price_icon} cube-font-icon`}
                              data-icon-name="cube-value-toman"
                              data-icon="&#xE953;"
                            ></div>
                          </div>
                        </>
                      ) : (
                        <span className={styles.out_of_stock_color}>
                          ناموجود
                        </span>
                      )}
                    </div>
                  </div>
                  {product?.default_variant && discountPercent !== 0 ? (
                    <div className={styles.product_no_discount_price_container}>
                      <div
                        id="price-no-discount"
                        className={styles.product_no_discount_price_text}
                      >
                        {(
                          product?.default_variant?.price?.rrp_price / 10
                        ).toLocaleString("fa-IR")}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {hasPromotionTimeline ? (
                  <div className="mt-auto">
                    <div>
                      <div
                        className={`${
                          styles.product_promotion_timeline_progress
                        } ${priceSoldPercentage ? "visible" : "invisible"} `}
                      >
                        <div
                          className={
                            styles.product_promotion_timeline_progress_active
                          }
                          style={{
                            width: `${priceSoldPercentage}%`,
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between pt-1">
                        <div
                          className={
                            priceSoldPercentage ? "visible" : "invisible"
                          }
                        >
                          <span className={styles.product_soldout_percent}>
                            {priceSoldPercentage?.toLocaleString("fa-IR")}%
                          </span>
                          <span className={styles.product_soldout_text}>
                            فروش رفته
                          </span>
                        </div>
                        {product?.default_variant?.price?.timer && (
                          <div
                            className={styles.product_promotion_timeline__timer}
                          >
                            <Timer
                              seconds={product?.default_variant?.price?.timer}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {isIncredibleTeasing && (
                  <button
                    className={`${incredibleStatus?.is_active ? styles.dont_notife_me_btn : styles.notife_me_btn}`}
                    onClick={notifeMeHandler}
                  >
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      <div
                        className={styles.notification_icon_container}
                        aria-hidden="false"
                      >
                        <svg
                          className={`${incredibleStatus?.is_active ? styles.dont_notification_icon : styles.notification_icon}`}
                        >
                          <use href="#notificationOffOutline"></use>
                        </svg>
                      </div>
                      {incredibleStatus?.is_active
                        ? "دیگر خبرم نکن"
                        : "خبرم کن"}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </article>
        </div>
      </Link>
    </article>
  );
}

export default memo(VerticalProductCard);
