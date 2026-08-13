import Link from "next/link";
import Image from "next/image";

import toPersianDigits from "@/utils/toPersianDigits";
import Timer from "@/components/modules/timer/Timer";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./productCard.module.css";

function ProductCard({
  product,
  indexSlider,
  SellerRecommendations,
  isViewedProducts,
  isLandingPage,
  isComparePage,
  isIncredibleOffer,
  isSimilarProductsSlider,
  isFirstSlide,
  isLastSlide,
  isRecommendationProducts,
  isAdvertisement,
}) {
  const { isSmallScreen } = useScreenStatus();

  const digikalaJetShipment =
    product?.default_variant?.digiplus?.is_jet_eligible;
  const sellerShipment =
    product?.default_variant?.properties?.is_ship_by_seller;
  const time = product?.default_variant?.price?.timer;
  const price = product?.default_variant?.price?.rrp_price;
  const sellingPrice = product?.default_variant?.price?.selling_price;
  const percent = product?.default_variant?.price?.discount_percent;
  const productPriceIsPromotion = product?.default_variant?.price?.is_promotion;

  return (
    <Link
      className={`${
        indexSlider ? styles.index_incredibleOffer_box_container : ""
      } ${isComparePage ? styles.compare_box_container : ""} ${isIncredibleOffer ? styles.incredibleOffer_box_container : ""} ${
        SellerRecommendations ? styles.similarProducts_box_container : ""
      } ${isLandingPage ? styles.landing_box_container : ""} ${isAdvertisement ? styles.advertisement_box_container : ""} ${isRecommendationProducts ? styles.recommendation_product : ""} ${isViewedProducts ? styles.viewed_products_box_container : ""} ${
        indexSlider && isFirstSlide ? styles.index_first_item : ""
      } ${
        !indexSlider &&
        (isViewedProducts ||
          SellerRecommendations ||
          isRecommendationProducts) &&
        !isLastSlide &&
        styles.borderLeft
      }
`}
      target="_blank"
      href={product?.url?.uri || "#"}
    >
      <div id="product-card" className="h-100">
        <article className={styles.incredibleOffer_box}>
          <div className={styles.incredible_offer_logo_container}>
            <div className={styles.incredible_offer_logo_img}>
              {productPriceIsPromotion ? (
                <Image
                  width={64}
                  height={14}
                  src="/images/svg/productcard/topBadge/SpecialSell.svg"
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <>
                  <br />
                  <br />
                </>
              )}
            </div>
            <div className={styles.incredible_offer_logo_text}>
              <br />
            </div>
            {SellerRecommendations && (
              <div className={styles.ad_logo_container}>
                <span className={styles.ad_text}>سفارشی</span>
                <div className={styles.ads_icon_container}>
                  <div
                    data-icon-name="cube-ads"
                    data-icon="&#xE9DA;"
                    className={`${styles.ads_icon} cube-font-icon`}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`${
              indexSlider ? "gap-2" : ""
            } d-flex flex-grow-1 position-relative flex-column`}
          >
            <div>
              {indexSlider ? (
                <div className="d-flex align-items-stretch flex-column position-relative">
                  <div className="d-flex align-items-start mx-auto">
                    <div>
                      <div className={styles.index_product_img_container}>
                        <div className="d-flex align-items-start mx-auto">
                          <div>
                            <div className={styles.product_img__mini_badges}>
                              <br />
                              <br />
                            </div>
                            <div
                              className={styles.index_product_img__container}
                            >
                              <Image
                                width={132}
                                height={132}
                                src={product?.images?.main?.url?.[0]}
                                alt={product?.title_fa}
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.product_img_container}>
                  <div className="d-flex align-items-start mx-auto">
                    <div>
                      <div className={styles.product_img__mini_badges}>
                        <br />
                        <br />
                      </div>
                      <div className={`${styles.product_img__container}`}>
                        {isSimilarProductsSlider ? (
                          <img
                            src={product?.images?.main?.url?.[0]}
                            alt={product?.title_fa}
                            style={{ objectFit: "contain" }}
                          />
                        ) : (
                          <Image
                            width={isSmallScreen ? 128 : 150}
                            height={isSmallScreen ? 128 : 150}
                            src={product?.images?.main?.url?.[0]}
                            alt={product?.title_fa}
                            style={{ objectFit: "contain" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.product_details}>
              <div>
                <p
                  className={`${
                    indexSlider
                      ? styles.index_product_name
                      : styles.product_name
                  } `}
                >
                  {product?.test_title_fa || product?.title_fa}
                </p>
              </div>
              {!indexSlider && (
                <div className={styles.product_shipment_methods_container}>
                  {product?.default_variant?.variant_badges?.[0]?.payload
                    .text ? (
                    <div className="d-flex align-items-center">
                      <p className={`${styles.product_payload_text}`}>
                        {toPersianDigits(
                          product?.default_variant?.variant_badges?.[0]?.payload
                            .text,
                        )}
                      </p>
                      <br />
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      {sellerShipment || digikalaJetShipment ? (
                        <div
                          className={styles.product_icon_container}
                          aria-hidden="false"
                        >
                          <svg
                            className={`${styles.product_icon} ${
                              digikalaJetShipment
                                ? styles.product_digikala_jet_icon
                                : sellerShipment
                                  ? styles.product_seller_shipment_icon
                                  : styles.product_digikala_shipment_icon
                            }`}
                          >
                            <use
                              href={`#${
                                digikalaJetShipment
                                  ? "deliveryToday"
                                  : sellerShipment
                                    ? "deliveryShipBySeller"
                                    : "deliveryExpress"
                              }`}
                            ></use>
                          </svg>
                        </div>
                      ) : (
                        ""
                      )}
                      <p className={styles.product_shipment_text}>
                        {product?.default_variant?.properties?.is_ship_by_seller
                          ? "ارسال فروشنده"
                          : product?.default_variant?.digiplus
                              .fast_shipping_text}
                      </p>
                      <br />
                    </div>
                  )}
                </div>
              )}
              <div
                className={`${
                  indexSlider
                    ? styles.index_product_price_content
                    : styles.product_price_content
                }`}
              >
                <div className="d-flex align-items-center justify-content-between">
                  {percent !== 0 ? (
                    <div className={styles.product_price__discount_wrapper}>
                      <span className={styles.product_price__discount}>
                        {percent?.toLocaleString("fa-IR")}٪
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={`${
                      indexSlider
                        ? styles.index_product_price_wrapper
                        : styles.product_price_wrapper
                    } `}
                  >
                    <span className={styles.product_price}>
                      {(sellingPrice / 10).toLocaleString("fa-IR")}
                    </span>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.product_price_icon}>
                        <use href="#toman"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.product_discount_container}>
                  <div
                    className={`${
                      indexSlider
                        ? styles.index_product_discount
                        : styles.product_discount
                    }`}
                  >
                    {percent !== 0 && (price / 10)?.toLocaleString("fa-IR")}
                  </div>
                </div>
              </div>
              {time && !indexSlider ? (
                <div className="mt-auto">
                  <div>
                    {product?.default_variant.price?.sold_percentage ? (
                      <div className={styles.progress_bar}>
                        <div
                          className={styles.product_promotion_timeline__active}
                          style={{
                            width: `${product?.default_variant.price?.sold_percentage}%`,
                          }}
                        ></div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.timer_wrapper}>
                      <div
                        className={
                          product?.default_variant.price?.sold_percentage
                            ? styles.visible
                            : styles.invisible
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
                      <div className={styles.time_container}>
                        <Timer seconds={time} />
                      </div>
                    </div>
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

export default ProductCard;
