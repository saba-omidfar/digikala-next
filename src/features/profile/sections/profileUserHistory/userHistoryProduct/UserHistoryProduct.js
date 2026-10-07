import Link from "next/link";

import Timer from "@/components/modules/timer/Timer";
import RemoveUserHistoryProductModal from "@/features/profile/modals/removeUserHistoryProductModal/RemoveUserHistoryProductModal";

import useScreenStatus from "@/hooks/useScreenStatus";

import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./userHistoryProduct.module.css";

export default function UserHistoryProduct({ product, refetch }) {
  const { openModal } = useModal();
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
  const soldPercentage = product?.default_variant.price?.sold_percentage;

  return (
    <div
      className={`${styles.product_container} border-complete-b border-complete-l`}
    >
      <Link href={product?.url?.uri || "#"} className={styles.product_link}>
        <div data-testid="product-card" className="h-100">
          <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
            <div className={styles.product_promotion_section}>
              {productPriceIsPromotion ? (
                <div className={styles.product_promotion_logo_container}>
                  <img
                    src="/images/svg/productcard/topBadge/SpecialSell.svg"
                    alt=""
                    className={styles.product_promotion_logo}
                  />
                </div>
              ) : (
                ""
              )}

              <div className={styles.product_promotion_logo_text}>
                <br />
              </div>
            </div>

            <div className={styles.product_infos}>
              <div className={styles.product_img_section}>
                <div className="d-flex align-items-start mx-auto">
                  <div>
                    <div
                      role="img"
                      aria-hidden="false"
                      aria-label={product.title}
                      className={styles.product_img_container}
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
                          decoding="async"
                          alt={product?.title_fa}
                          title=""
                          src={product?.images?.main?.url?.[0]}
                          className={styles.product_img}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                <div className="d-flex align-items-center justify-content-start gap-1 flex-wrap mb-1"></div>

                <div>
                  <h3 className={styles.product_title}>
                    {product?.test_title_fa || product.title_fa}
                  </h3>
                </div>

                <div className={styles.product_shipment_section}>
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
                              ?.fast_shipping_text}
                      </p>
                      <br />
                    </div>
                  )}
                </div>

                <div className={styles.product_price_section}>
                  <div className="d-flex align-items-center justify-content-between">
                    {product?.default_variant &&
                    !Array.isArray(product.default_variant) &&
                    percent !== 0 ? (
                      <div className={styles.product_price_discount_badge}>
                        <span className={styles.product_price_discount}>
                          {percent?.toLocaleString("fa-IR")}٪
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.product_price_container}>
                      {product?.default_variant &&
                      !Array.isArray(product.default_variant) ? (
                        <>
                          <span className={styles.product_price}>
                            {(sellingPrice / 10).toLocaleString("fa-IR")}
                          </span>
                          <div className="d-flex" aria-hidden="false">
                            <svg className={styles.product_price_icon}>
                              <use href="#toman"></use>
                            </svg>
                          </div>
                        </>
                      ) : (
                        <span className={styles.out_of_stock_color}>
                          ناموجود
                        </span>
                      )}
                    </div>
                  </div>
                  {product?.default_variant &&
                  !Array.isArray(product.default_variant) ? (
                    <div className={styles.product_discount_container}>
                      <div className={styles.product_discount}>
                        {percent !== 0 && (price / 10)?.toLocaleString("fa-IR")}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {time ? (
                    <div className="mt-auto">
                      <div>
                        <div className={styles.timer_wrapper}>
                          <div
                            className={
                              soldPercentage ? styles.visible : styles.invisible
                            }
                          >
                            <span className={styles.product_sold_out_percent}>
                              {soldPercentage?.toLocaleString("fa-IR")}%
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
            </div>
            <div className={styles.btns_container}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  openModal(
                    <RemoveUserHistoryProductModal
                      product={product}
                      refetch={refetch}
                    />,
                    {
                      name: "remove-user-history",
                      className: "modal__remove_user_history rounded-medium",
                    },
                  );
                }}
                className={styles.delete_btn}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <div
                    className={styles.delete_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.btn_icon}>
                      <use href="#delete" />
                    </svg>
                  </div>
                </div>
              </button>

              <Link
                href={product?.url?.uri || "#"}
                className={styles.add_to_cart_link}
                target="_self"
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <div
                    className={styles.delete_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.add_btn_icon}>
                      <use href="#cartOff"></use>
                    </svg>
                  </div>
                  اضافه به سبد
                </div>
              </Link>
            </div>
          </article>
        </div>
      </Link>
    </div>
  );
}
