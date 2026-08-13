import { useState, useEffect } from "react";

import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";

import styles from "./miniCartItem.module.css";

function MiniCartItem({ isLastItem, cartItem }) {
  const { user, guestCartId } = useUserContext();
  const {
    userCart,
    loadingVariantId,
    setLoadingVariantId,
    addProductToCart,
    removeProductFromCart,
  } = useCartContext();

  const [productQuantity, setProductQuantity] = useState(0);

  const maxLimit = cartItem?.variant?.price?.order_limit || Infinity;
  const isMaxReached = cartItem?.quantity === maxLimit;

  const addProductToCartHandler = ({ variantId }) => {
    setLoadingVariantId(variantId);

    addProductToCart(
      {
        guestCartId,
        productId: cartItem?.product?.id,
        variantId,
        quantity: 1,
      },
      {
        onSuccess: (res) => {
          if (!user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (!res?.cart?.items_count) {
            handleAddToCartSuccess();
          }
        },
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const removeProductFromCartHandler = ({ variantId }) => {
    setLoadingVariantId(variantId);

    removeProductFromCart(
      {
        guestCartId,
        variantId,
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
      setProductQuantity(cartItem?.quantity || 0);
    }
  }, [userCart]);

  return (
    <div className={!isLastItem ? styles.border_bottom : ""}>
      <div className={styles.cart_item_container} data-testid="cart-item">
        <div className={styles.cart_item}>
          <div className={styles.product_cart_container}>
            <div className="d-flex flex-column align-items-center">
              <Link
                className={styles.product_link}
                href={
                  `${cartItem?.product?.url?.uri}/?variant_id=${cartItem?.variant?.id}` ||
                  "#"
                }
              >
                <div className={styles.product_img_container}>
                  <picture>
                    <source
                      type="image/webp"
                      src={cartItem?.product?.images?.main?.url?.[0]}
                    />
                    <source
                      type="image/jpeg"
                      src={cartItem?.product?.images?.main?.url?.[0]}
                    />
                    <img
                      title=""
                      src={cartItem?.product?.images?.main?.url?.[0]}
                      alt={cartItem?.product?.title_fa}
                      className={styles.product_img}
                    />
                  </picture>
                </div>
                <div className={styles.product_image_quantity}>
                  {cartItem?.quantity?.toLocaleString("fa-IR")}
                </div>
              </Link>
            </div>
            <div className={styles.product_infos_container}>
              <div className={styles.product_infos}>
                <div className={styles.product_details}>
                  <span className={styles.product_title}>
                    {cartItem?.product?.title_fa}
                  </span>
                  <div className="d-flex justify-content-between align-items-center">
                    <CartActionBox
                      noShadow
                      quantityBoxClassName={styles.quantity_box}
                      isLoading={loadingVariantId === cartItem?.variant?.id}
                      productQuantity={productQuantity}
                      isMaxReached={isMaxReached}
                      addProductToCartHandler={() =>
                        addProductToCartHandler({
                          variantId: cartItem?.variant?.id,
                        })
                      }
                      removeProductFromCartHandler={() =>
                        removeProductFromCartHandler({
                          variantId: cartItem?.variant?.id,
                          removeFromextPurchase: false,
                        })
                      }
                    />
                    <div className="d-flex flex-column gap-2">
                      <div className={styles.product_price_container}>
                        <div
                          className={styles.product_price_discount_container}
                        >
                          <div className={styles.product_discount_container}>
                            {cartItem?.price?.discount_percent !== 0 ? (
                              <div className={styles.product_discount_badge}>
                                <div className="d-flex align-items-center">
                                  <span
                                    className={styles.product_discount_percent}
                                  >
                                    %
                                  </span>
                                  <span className={styles.product_discount}>
                                    {toPersianDigits(
                                      cartItem?.price?.discount_percent,
                                    )}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {cartItem?.price?.discount_percent !== 0 && (
                              <div className={styles.product_old_price}>
                                <span className={styles.product_old_price_text}>
                                  {(
                                    (cartItem?.price?.rrp_price / 10) *
                                    cartItem?.quantity
                                  )?.toLocaleString("fa-IR")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <div className={styles.product_price}>
                            <span className={styles.product_price_text}>
                              {(
                                (cartItem?.price?.selling_price / 10) *
                                cartItem?.quantity
                              )?.toLocaleString("fa-IR")}
                            </span>
                            <div>
                              <span aria-hidden="true">
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
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:justify-between mt-6.5"></div>
        </div>
      </div>
    </div>
  );
}

export default MiniCartItem;
