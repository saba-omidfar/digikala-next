import { useState } from "react";
import Link from "next/link";

import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import Spinner from "@/utils/Spinner";

import toPersianDigits from "@/utils/toPersianDigits";

import { useCartContext } from "@/contexts/CartContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./favoriteCartMobileItem.module.css";

function FavoriteCartMobileItem({ product }) {
  const { showSnackbar } = useSnackbar();
  const { setLoadingVariantId } = useCartContext();

  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [loadingState, setLoadingState] = useState(null);

  const toggleFavoritesHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingVariantId(product?.variant?.id);

    toggleFavorites(
      { productId: product?.id },
      {
        onSuccess: ({ success, action }) => {
          if (success && action === "add") {
            showSnackbar(`کالا در لیست علاقه‌مندی‌ها ذخیره شد`);
          }
        },
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const isJetEligible =
    product?.digiplus?.is_jet_eligible ||
    product?.shipment_methods?.providers?.[0]?.shipping_mode === "jet";

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess setShowAddToCartSuccess={setShowAddToCartSuccess} />
      )}
      <div
        className={`${styles.cart_item_container} ${styles.br_list_vertical}`}
        id="cart-item"
      >
        <div className={styles.cart_item_grid}>
          <div className={styles.right_section}>
            <div
              className="d-flex align-items-center flex-column"
              style={{ opacity: product?.default_variant ? 1 : 0.5 }}
            >
              <Link
                href={
                  `${product?.url?.uri}/?variant_id=${product?.default_variant?.id}` ||
                  "#"
                }
                className={styles.product_img_bg}
              >
                {isJetEligible ? (
                  <div className={styles.shipping_today_badge}>
                    <div className={styles.shipping_today_bg}>
                      <div className="d-flex gap-2 align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <div
                            className={`${styles.shipping_today_icon} cube-font-icon`}
                            data-icon-name="cube-shipping-today"
                            data-icon=""
                          ></div>
                        </div>
                        <span className={styles.shipping_today_text}>
                          ارسال سریع
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.product_img_container}>
                  <picture>
                    <source
                      type="image/webp"
                      src={product?.images?.main?.url?.[0]}
                    />
                    <source
                      type="image/jpeg"
                      src={product?.images?.main?.url?.[0]}
                    />
                    <img
                      title=""
                      src={product?.images?.main?.url?.[0]}
                      alt={product?.title_fa}
                      className={styles.product_img}
                    />
                  </picture>
                </div>
              </Link>
            </div>
            <div className={styles.product_infos_container}>
              <div
                className={styles.product_infos}
                style={{ opacity: product?.default_variant ? 1 : 0.5 }}
              >
                <Link
                  href={
                    `${product?.url?.uri}/?variant_id=${product?.default_variant?.id}` ||
                    "#"
                  }
                >
                  <span className={styles.product_title}>
                    {product?.title_fa}
                  </span>
                </Link>
                {product?.default_variant?.color ? (
                  <div className={styles.product_color_bg}>
                    <span
                      className={styles.product_color}
                    >{`رنگ ${product?.default_variant?.color?.title}`}</span>
                  </div>
                ) : (
                  ""
                )}
                {product?.default_variant ? (
                  <div className={styles.mobile_price_container}>
                    <div className={styles.product_price}>
                      {product?.default_variant?.price?.discount_percent !==
                      0 ? (
                        <div className={styles.discount_badge_container}>
                          <div className={styles.old_price_container}>
                            <div className={styles.discount_badge}>
                              <div className="d-flex align-items-center justify-content-center">
                                <span className={styles.discount_percent}>
                                  %
                                </span>
                                <span className={styles.discount}>
                                  {toPersianDigits(
                                    product?.default_variant?.price
                                      ?.discount_percent,
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className={styles.old_price_text_container}>
                              <span className={styles.old_price_text}>
                                {(
                                  product?.default_variant?.price?.rrp_price /
                                  10
                                )?.toLocaleString("fa-IR")}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {product?.default_variant ? (
                        <div className={styles.mobile_price_container}>
                          <div className="d-flex gap-2">
                            <div className={styles.product_price_container}>
                              <span className={styles.price}>
                                {(
                                  product?.default_variant?.price
                                    ?.selling_price / 10
                                ).toLocaleString("fa-IR")}
                              </span>
                              <div>
                                <span
                                  className={styles.price_icon_container}
                                  aria-hidden="true"
                                >
                                  <svg className={styles.price_icon}>
                                    <use href="#toman"></use>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {isJetEligible ? (
                <div className={styles.shipment_methods_container}>
                  <div className={styles.shipment_methods}>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.jet_delivery_icon} cube-font-icon`}
                        data-icon-name="cube-shipping-today"
                        data-icon=""
                      ></div>
                    </div>
                    <span className={styles.variant_text}>ارسال سریع</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.mobile_btns_container}>
            <div className={styles.mobile_btns}>
              <div className="d-flex flex-column gap-2">
                <div className={styles.btns_container}>
                  <div
                    className={styles.delete_btn}
                    data-cro-id="cart-delete-item-central"
                    onClick={(e) => toggleFavoritesHandler(e)}
                  >
                    {loadingState?.variantId === product?.default_variant?.id &&
                    loadingState?.action === "remove" ? (
                      <Spinner size={16} color="000" />
                    ) : (
                      <span className={styles.next_cart_text}>حذف کالا</span>
                    )}
                  </div>
                  <div
                    className={styles.add_btn}
                    onClick={(e) => seeProductHandler(e)}
                  >
                    {loadingState?.variantId === product?.default_variant?.id &&
                    loadingState?.action === "add" ? (
                      <Spinner size={16} color="rgb(237, 25, 68)" />
                    ) : (
                      <span className={styles.add_btn_text}>
                        {product?.default_variant
                          ? "مشاهده کالا"
                          : "کالاهای مشابه"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.left_section}>
            <div className="d-flex flex-column gap-1">
              <div className={styles.product_price}>
                {product?.default_variant?.price?.discount_percent !== 0 ? (
                  <div className={styles.discount_badge_container}>
                    <div className={styles.old_price_container}>
                      <div className={styles.discount_badge}>
                        <div className="d-flex align-items-center justify-content-center">
                          <span className={styles.discount_percent}>%</span>
                          <span className={styles.discount}>
                            {toPersianDigits(
                              product?.default_variant?.price?.discount_percent,
                            )}
                          </span>
                        </div>
                      </div>
                      <div className={styles.old_price_text_container}>
                        <span className={styles.old_price_text}>
                          {(
                            product?.default_variant?.price?.rrp_price / 10
                          )?.toLocaleString("fa-IR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="d-flex gap-2">
                  <div className={styles.product_price_container}>
                    <span className={styles.price}>
                      {(
                        product?.default_variant?.price?.selling_price / 10
                      ).toLocaleString("fa-IR")}
                    </span>
                    <div>
                      <span
                        className={styles.price_icon_container}
                        aria-hidden="true"
                      >
                        <svg className={styles.price_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteCartMobileItem;
