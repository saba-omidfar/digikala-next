"use client";

import { useState, useEffect, useMemo } from "react";

import { ScrollTrigger } from "@/lib/gsap";

import VerticalSlider from "../productDetails/VerticalSlider";
import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import { useModal } from "@/contexts/modalContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./stickyMobileFooter.module.css";

export default function StickyMobileFooter() {
  const { guestCartId } = useUserContext();

  const [productQuantity, setProductQuantity] = useState(0);
  const [showVerticalSlider, setShowVeticalSlider] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  const { openMobileModal } = useModal();

  const { productDetails, activeVariant, lowestPrice, uniqueVariants } =
    useProductContext();
  const { user } = useUserContext();
  const {
    userCart,
    addProductToCart,
    removeProductFromCart,
    selectedInsurance,
    loadingVariantId,
    setLoadingVariantId,
  } = useCartContext();

  const rrp_price = activeVariant?.price?.rrp_price;
  const selling_price = activeVariant?.price?.selling_price;
  const discount_percent = activeVariant?.price?.discount_percent;
  const maxLimit = activeVariant?.price?.min_order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  const addProductToCartHandler = () => {
    setLoadingVariantId(activeVariant?.id);

    addProductToCart(
      {
        guestCartId,
        productId: productDetails?.id,
        variantId: activeVariant?.id,
        quantity: 1,
        hasInsurance: selectedInsurance,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (productQuantity === 0) {
            handleAddToCartSuccess();
          }
        },
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const removeProductFromCartHandler = () => {
    setLoadingVariantId(activeVariant?.id);

    removeProductFromCart(
      {
        guestCartId,
        variantId: activeVariant?.id,
        quantity: 1,
      },
      {
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const handleAddToCartSuccess = () => {
    setShowAddToCartSuccess(true);
  };

  useEffect(() => {
    setShowVeticalSlider(false);

    const trigger = ScrollTrigger.create({
      trigger: "#SPEC",
      start: "top 30%",
      onEnter: () => setShowVeticalSlider(true),
      onLeaveBack: () => setShowVeticalSlider(false),
    });

    return () => trigger.kill();
  }, []);

  const cart = useMemo(() => {
    return userCart?.cart?.packages
      ?.flatMap((pkg) => pkg.cart_items || [])
      ?.find(
        (item) =>
          item.product.id === productDetails?.id &&
          item.variant.id === activeVariant?.id,
      );
  }, [userCart, productDetails?.id, activeVariant?.id]);

  useEffect(() => {
    setProductQuantity(cart?.quantity || 0);
  }, [cart]);

  if (productDetails?.is_inactive) return;

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess
          product={productDetails}
          setShowAddToCartSuccess={setShowAddToCartSuccess}
        />
      )}
      <div className={styles.mobile_footer_container}>
        {activeVariant?.price?.selling_price > lowestPrice ? (
          <div
            className={styles.lowest_price_container}
            onClick={(e) => openMobileModal("sellers", { uniqueVariants })}
          >
            <div className={styles.lowest_price}>
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.alert_icon} cube-font-icon`}
                  data-icon-name="cube-alert-info-outline"
                  data-icon=""
                ></div>
              </div>
              این کالا را «
              {(
                (activeVariant?.price?.selling_price - lowestPrice) /
                10
              ).toLocaleString("fa-IR")}{" "}
              تومان» ارزان‌تر بخرید
            </div>
            <div className="d-flex" aria-hidden="false">
              <div
                className={`${styles.chevron_ion} cube-font-icon`}
                data-icon-name="cube-nav-chevron-left"
                data-icon=""
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div style={{ padding: "12px 16px" }}>
          {productDetails?.product_badges?.length ? (
            <span
              className={styles.mobile_content_verticalSlider_animation}
              style={{ maxHeight: showVerticalSlider ? "36px" : "0" }}
            >
              <VerticalSlider
                transform={36}
                isStickyFooter
                badges={productDetails?.product_badges}
              />
            </span>
          ) : (
            ""
          )}

          <div className={styles.add_to_cart_btn_container}>
            <CartActionBox
              isStickyFooter
              quantityBoxClassName={styles.quantity_box}
              productQuantity={productQuantity}
              isMaxReached={isMaxReached}
              addProductToCartHandler={addProductToCartHandler}
              removeProductFromCartHandler={removeProductFromCartHandler}
              isLoading={loadingVariantId === activeVariant?.id}
            />
            <div className={styles.mobile_footer_price_container}>
              <div className={styles.discount_container}>
                {discount_percent !== 0 && (
                  <span className={styles.discount_percent}>
                    {toPersianDigits(discount_percent)}٪
                  </span>
                )}
                <div className={styles.rrp_price}>
                  {(rrp_price / 10).toLocaleString("fa-IR")}
                </div>
              </div>
              <div className={styles.price_container}>
                {(cart?.has_insurance || selectedInsurance) && (
                  <div className={styles.insurance_container}>
                    <div>
                      <div
                        className={styles.insurance_tooltip}
                        data-popper-reference-hidden="false"
                        data-popper-escaped="false"
                        data-popper-placement="top"
                        data-tooltip-id="favorite"
                        data-tooltip-content={`افزایش ۶,۱۶۳,۳۰۰ تومان برای بیمه`}
                        data-tooltip-place="left"
                      >
                        <div
                          className="d-flex justify-content-center align-items-center"
                          aria-hidden="false"
                        >
                          <div
                            className={`${styles.insurance_icon} cube-font-icon`}
                            data-icon-name="cube-shop-insurance"
                            data-icon=""
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="position-relative">
                  <div
                    className={styles.price}
                    data-theme-animation="price-container"
                  >
                    {(selling_price / 10).toLocaleString("fa-IR")}
                    <div
                      className="d-flex justify-content-center align-items-center"
                      aria-hidden="false"
                    >
                      <div
                        className={`${styles.price_icon} cube-font-icon`}
                        data-icon-name="cube-value-toman"
                        data-icon="&#xE953;"
                      ></div>
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
