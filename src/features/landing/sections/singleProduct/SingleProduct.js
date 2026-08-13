"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";

import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import toPersianDigits from "@/utils/toPersianDigits";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./singleProduct.module.css";

function SingleProduct({ data }) {
  const timerRef = useRef(null);

  const product = data?.data?.product_data;

  const [productQuantity, setProductQuantity] = useState(0);
  const [showCartLink, setShowCartLink] = useState(true);

  const {
    userCart,
    addProductToCart,
    removeProductFromCart,
    selectedInsurance,
    loadingVariantId,
    setLoadingVariantId,
  } = useCartContext();
  const { user, guestCartId } = useUserContext();

  const maxLimit = product?.default_variant?.price?.order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  const addProductToCartHandler = () => {
    setLoadingVariantId(product?.default_variant?.id);

    addProductToCart(
      {
        guestCartId,
        productId: product?.id,
        variantId: product?.default_variant?.id,
        quantity: 1,
        hasInsurance: selectedInsurance,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }
        },
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const removeProductFromCartHandler = () => {
    setLoadingVariantId(product?.default_variant?.id);

    removeProductFromCart(
      {
        guestCartId,
        variantId: product?.default_variant?.id,
      },
      {
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  useEffect(() => {
    if (userCart) {
      const cart = userCart?.cart?.packages
        .flatMap((pkg) => pkg.cart_items || [])
        ?.find(
          (item) =>
            item.product.id === product?.id &&
            item.variant.id === product?.default_variant?.id,
        );

      setProductQuantity(cart?.quantity || 0);
    }
  }, [userCart, product]);

  const showCartLinkHandler = () => {
    setShowCartLink(false);

    timerRef.current = setTimeout(() => {
      setShowCartLink(true);
      timerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (Array.isArray(product?.default_variant)) return null;

  return (
    <div className={styles.single_product_container}>
      <div className={styles.content_container}>
        <div id={data?.widget_id} className={styles.single_product}>
          <div className={styles.container}>
            <div
              className={`${!product?.default_variant?.price?.selling_price ? styles.sold_out_information : styles.information}`}
              aria-hidden="true"
            >
              <div className={styles.information__title}>
                {data?.data?.title}
              </div>
              <div className="d-flex justify-content-between mt-1 align-items-center">
                <div className={styles.information__description}>
                  {data?.data?.description}
                </div>
                {product?.rating?.rate !== 0 ? (
                  <div className={styles.rating_container}>
                    <div className="d-flex align-items-center">
                      <p className={styles.rate}>
                        {toPersianDigits(
                          Math.round((product?.rating?.rate / 100) * 5 * 10) /
                            10,
                        )}
                      </p>
                      <div
                        className={styles.rate_icon__container}
                        aria-hidden="false"
                      >
                        <div
                          data-icon-name="cube-star"
                          data-icon="&#xE928;"
                          className={`${styles.rate_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {product?.default_variant?.price?.selling_price ? (
                <div>
                  <div className="mt-1">
                    <div className="d-flex justify-content-between align-items-center">
                      {product?.default_variant?.price?.discount_percent !==
                        0 && (
                        <div className="d-flex align-items-center">
                          <div className={styles.discount_badge}>
                            <div className={styles.discount}>
                              <span
                                className={styles.discount_percent}
                                data-testid="price-discount-percent"
                              >
                                {toPersianDigits(
                                  product?.default_variant?.price
                                    ?.discount_percent,
                                )}
                                ٪
                              </span>
                            </div>
                            <p className={styles.discount_text}>تخفیف</p>
                          </div>
                          <div className={styles.final_price}>
                            {(
                              product?.default_variant?.price?.rrp_price / 10
                            )?.toLocaleString("fa-IR")}
                          </div>
                        </div>
                      )}
                      <div className="d-flex align-items-center">
                        <div className={styles.price}>
                          {(
                            product?.default_variant?.price?.selling_price / 10
                          )?.toLocaleString("fa-IR")}
                        </div>
                        <div className={styles.price_text}>تومان</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.empty_space_2}></div>
                    {showCartLink && productQuantity !== 0 ? (
                      <div className={styles.cart_container}>
                        <div className={styles.empty_space}></div>
                        <div
                          className={styles.cart}
                          onMouseEnter={showCartLinkHandler}
                        >
                          <div className="d-flex align-items-center">
                            <div className={styles.cart_count}>
                              {toPersianDigits(productQuantity)}
                            </div>
                            <div className={styles.cart_text_container}>
                              <p className={styles.cart_text}>عدد در سبد شما</p>
                              <Link
                                className={styles.cart_link}
                                href="/checkout/cart/"
                              >
                                مشاهده سبد خرید
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.cart_container}>
                        <div className={styles.empty_space}></div>
                        <div className={styles.product_price_container}>
                          <CartActionBox
                            quantityBoxClassName={styles.quantity_box}
                            productQuantity={productQuantity}
                            isMaxReached={isMaxReached}
                            addProductToCartHandler={addProductToCartHandler}
                            removeProductFromCartHandler={
                              removeProductFromCartHandler
                            }
                            isLoading={
                              loadingVariantId === product?.default_variant?.id
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={styles.sold_out_img_container}
                  aria-hidden="true"
                  aria-label=""
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/statics/img/png/landings/dynamic-landing/single-product/finish-state.webp"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/statics/img/png/landings/dynamic-landing/single-product/finish-state.png"
                    />
                    <img
                      className={styles.sold_out_img}
                      src="/statics/img/png/landings/dynamic-landing/single-product/finish-state.png"
                      alt="sold-out"
                      title=""
                    />
                  </picture>
                </div>
              )}
            </div>
            <div className={styles.product_link_container}>
              <a
                className={styles.product_link}
                target="_blank"
                aria-label={`${data?.data?.title} قیمت: ${(product?.default_variant?.price?.selling_price / 10).toLocaleString("fa-IR")} تومان`}
                href={product?.url?.uri}
              >
                <div
                  className={styles.product_img_container}
                  aria-hidden="true"
                  aria-label=""
                >
                  <img
                    className={styles.product_img}
                    src={product?.images?.main?.url?.[0]}
                    alt=""
                    title=""
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
