import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Loading from "@/components/modules/loading/Loading";
import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";
import Timer from "@/components/modules/timer/Timer";

import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useCartContext } from "@/contexts/CartContext";

import styles from "./productCard.module.css";

function ProductCard({ product, isFreshPage }) {
  const timerRef = useRef(null);
  const { user, guestCartId } = useUserContext();
  const [productQuantity, setProductQuantity] = useState(0);
  const [showCartLink, setShowCartLink] = useState(false);

  const { activeVariant } = useProductContext();

  const {
    userCart,
    addProductToCart,
    addProductToCartIsLoading,
    removeProductFromCart,
    removeProductFromCartIsLoading,
  } = useCartContext();

  const addProductToCartHandler = () => {
    addProductToCart(
      {
        guestCartId,
        productId: product?.id,
        variantId: product?.default_variant_id,
        quantity: 1,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }
        },
      },
    );
  };

  const removeProductFromCartHandler = () => {
    removeProductFromCart({
      userId: user?._id,
      guestCartId,
      variantId: product?.default_variant_id,
      quantity: 1,
    });
  };

  const showCartLinkHandler = () => {
    setShowCartLink(true);

    timerRef.current = setTimeout(() => {
      setShowCartLink(false);
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

  useEffect(() => {
    if (userCart) {
      const cart = userCart?.cart?.packages
        .flatMap((pkg) => pkg.cart_items || [])
        ?.find(
          (item) =>
            item.product.id === product?.id &&
            item.variant.id === activeVariant?.id,
        );

      setProductQuantity(cart?.quantity || 0);
    }
  }, [userCart, product?.id, activeVariant]);

  const maxLimit = product?.default_variant?.price?.order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  const time = product?.default_variant?.price?.timer;
  const price = product?.default_variant?.price?.rrp_price;
  const percent = product?.default_variant?.price?.discount_percent;
  const sellingPrice = product?.default_variant?.price?.selling_price;
  const payloadText =
    product?.default_variant?.variant_badges?.[0]?.payload.text;

  return (
    <Link
      href={product ? product?.url?.uri : "#"}
      className={styles.product_link}
      target="_blank"
    >
      <div id="product-card" className="h-100">
        <article className="d-flex flex-column align-items-stretch justify-content-start h-100 overflow-hidden">
          <div className={styles.top_badge}>
            <div className={styles.top_badge_img_container}>
              <Image
                className={styles.top_badge_img}
                src="/fresh/statics/img/svg/productCard/topBadge/IncredibleOffer.svg"
                width={116}
                height={14}
                alt="IncredibleOffer"
                title=""
              />
            </div>
            <div className={styles.top_badge_text}>
              <br />
            </div>
          </div>
          <div className="d-flex flex-grow-1 position-relative flex-column">
            <div>
              <div className={styles.top_container}>
                <div className="d-flex align-items-start mx-auto">
                  <div>
                    <div className={styles.product_img_mini_badge}>
                      <br />
                      <br />
                    </div>
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
                          alt={product?.title_fa}
                          title=""
                        />
                      </picture>
                    </div>

                    {isFreshPage && (
                      <div className={styles.add_btn_container}>
                        {productQuantity !== 0 ? (
                          <>
                            {showCartLink ? (
                              <div className={styles.cart_action__active}>
                                <CartActionBox
                                  isFreshPage
                                  productQuantity={productQuantity}
                                  isMaxReached={isMaxReached}
                                  addProductToCartHandler={
                                    addProductToCartHandler
                                  }
                                  removeProductFromCartHandler={
                                    removeProductFromCartHandler
                                  }
                                  addProductToCartIsLoading={
                                    addProductToCartIsLoading
                                  }
                                  removeProductFromCartIsLoading={
                                    removeProductFromCartIsLoading
                                  }
                                />
                              </div>
                            ) : (
                              <div
                                className={styles.quantity_count}
                                onMouseEnter={showCartLinkHandler}
                              >
                                {toPersianDigits(productQuantity)}
                              </div>
                            )}
                          </>
                        ) : (
                          <CartActionBox
                            isFreshPage
                            productQuantity={productQuantity}
                            isMaxReached={isMaxReached}
                            addProductToCartHandler={addProductToCartHandler}
                            removeProductFromCartHandler={
                              removeProductFromCartHandler
                            }
                            addProductToCartIsLoading={
                              addProductToCartIsLoading
                            }
                            removeProductFromCartIsLoading={
                              removeProductFromCartIsLoading
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-stretch justify-content-start flex-grow-1">
              <div>
                <h3 className={styles.product_title}>
                  {product?.test_title_fa || product?.title_fa}
                </h3>
              </div>
              <div className={styles.shipment_methods_container}>
                <div className="d-flex align-items-center">
                  <p
                    className={`${styles.payload_text} ${payloadText ? styles.payload_text_visible : ""}`}
                  >
                    {toPersianDigits(payloadText)}
                  </p>
                  <br />
                </div>
              </div>
              <div className={styles.price_details_container}>
                <div className="d-flex align-items-center justify-content-between">
                  {percent !== 0 ? (
                    <div className={styles.discount_container}>
                      <span className={styles.discount_percent}>
                        {percent?.toLocaleString("fa-IR")}٪
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={styles.final_price}>
                    <span data-testid="price-final">
                      {(sellingPrice / 10).toLocaleString("fa-IR")}
                    </span>
                    <div className="d-flex">
                      <div
                        className={`${styles.price_icon} cube-font-icon`}
                        data-icon-name="cube-value-toman"
                        data-icon="&#xE953;"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={styles.price}>
                  <div
                    data-testid="price-no-discount"
                    className={styles.price_no_discount}
                  >
                    {percent !== 0 && (price / 10)?.toLocaleString("fa-IR")}
                  </div>
                </div>
              </div>
              {time && (
                <div className="mt-auto">
                  <div>
                    <div className={styles.promotion_timeline_progress}>
                      <div
                        className={styles.promotion_timeline__active}
                        style={{ width: "58%" }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.timer_wrapper}>
                    <div className={styles.invisible}>
                      <span className={styles.sold_out_percent}>٪</span>
                      <span className={styles.sold_out_text}>فروش رفته</span>
                    </div>
                    <div className={styles.time_container}>
                      <Timer seconds={time} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}

export default ProductCard;
