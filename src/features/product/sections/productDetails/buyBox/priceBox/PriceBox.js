import { useState } from "react";
import Link from "next/link";

import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";
import ProductPriceBox from "@/features/cart/sections/productPriceBox/ProductPriceBox";
import VerticalSlider from "@/features/product/sections/productDetails/VerticalSlider";

import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useCartContext } from "@/contexts/CartContext";
import scrollToSection from "@/utils/scrollToSection";

import { usePopper } from "react-popper";

import styles from "./priceBox.module.css";

export default function PriceFeedbackBox({ setShowAddToCartSuccess }) {
  const [infoReferenceElement, setInfoReferenceElement] = useState(null);
  const [infoPopperElement, setInfoPopperElement] = useState(null);
  const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);

  const { productDetails, activeVariant, lowestPrice } = useProductContext();
  const { user, guestCartId } = useUserContext();

  const {
    userCart,
    addProductToCart,
    removeProductFromCart,
    loadingVariantId,
    setLoadingVariantId,
    selectedInsurance,
  } = useCartContext();

  const cartItem =
    userCart?.cart?.packages
      ?.flatMap((pkg) => pkg.cart_items || [])
      ?.find(
        (item) =>
          item.product.id === productDetails?.id &&
          item.variant.id === activeVariant?.id,
      ) || null;

  const productQuantity = cartItem?.quantity || 0;
  const cartHasInsurance = cartItem?.has_insurance || false;

  const maxLimit = activeVariant?.price?.order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  const insuranceSelected = selectedInsurance;
  const showInsuranceBadge = cartHasInsurance || insuranceSelected;

  const { styles: sellerInfoPopperStyles, attributes: sellerInfoAttributes } =
    usePopper(infoReferenceElement, infoPopperElement, {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
      ],
    });

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

  return (
    <div className="position-relative w-100 px-lg-3 pb-lg-2">
      <div className={styles.footer_actionWrapper_bb}>
        <div className={styles.footer_actionWrapper}>
          <div>
            {activeVariant?.price?.selling_price > lowestPrice ? (
              <div
                className={styles.lowest_price_container}
                onClick={() => scrollToSection("sellerSection", 220)}
              >
                <div className={styles.lowest_price}>
                  <div
                    className={styles.alert_icon_container}
                    aria-hidden="false"
                  >
                    <div
                      className={`${styles.alert_icon} cube-font-icon`}
                      data-icon-name="cube-alert-info"
                      data-icon=""
                    ></div>
                  </div>
                  <span className={styles.lowest_price_text}>
                    این کالا را «
                    <div className={styles.lowest_price_bold}>
                      {(
                        (activeVariant?.price?.selling_price - lowestPrice) /
                        10
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </div>
                    » ارزان‌تر بخرید
                  </span>
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

            {showInsuranceBadge ? (
              <div className={styles.insurance_badge}>
                <div className="d-flex align-items-center">
                  <div
                    className={styles.insurance_icon_container}
                    aria-hidden={false}
                  >
                    <div
                      data-icon-name="cube-insurance"
                      data-icon="&#xEB89;"
                      className={`${styles.insurance_icon} cube-font-icon`}
                    ></div>
                  </div>
                  <span className={styles.insurance_title}>
                    {activeVariant?.insurance?.title}
                  </span>
                </div>
                <div className={styles.insurance_price}>
                  {(
                    activeVariant?.insurance?.total_premium / 10
                  )?.toLocaleString("fa-IR")}
                  <div className="d-flex" aria-hidden={false}>
                    <div
                      data-icon-name="cube-toman"
                      data-icon="&#xE953;"
                      className={`${styles.price_icon} cube-font-icon`}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="d-flex align-items-center mb-1">
              <div
                ref={setInfoReferenceElement}
                className="position-relative d-flex"
                onMouseEnter={() => setIsSellerInfoOpen(true)}
                onMouseLeave={() => setIsSellerInfoOpen(false)}
              >
                <svg className={styles.footer_actionWrapper_icon}>
                  <use href="#infoOutline"></use>
                </svg>

                {isSellerInfoOpen && (
                  <div
                    ref={setInfoPopperElement}
                    style={sellerInfoPopperStyles.popper}
                    {...sellerInfoAttributes.popper}
                    className={`${isSellerInfoOpen ? "tooltip__active" : "tooltip__inactive"} club_tooltip`}
                  >
                    این کالا توسط فروشنده آن،
                    {activeVariant?.seller?.title}
                    ، قیمت‌گذاری شده است.
                    <div
                      style={sellerInfoPopperStyles.arrow}
                      className={styles.custom_popper_arrow}
                    />
                  </div>
                )}
              </div>
              <div className={styles.product_price_container}>
                <ProductPriceBox price={activeVariant?.price} />
              </div>
            </div>
            {activeVariant?.variant_badges?.length ||
            productDetails?.product_badges?.length ? (
              <div>
                <div className={styles.vertical_slider_container}>
                  <VerticalSlider
                    transform={20}
                    isBuyBox={true}
                    badges={productDetails?.product_badges}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="d-flex align-items-center">
              <CartActionBox
                quantityBoxClassName={styles.quantity_box}
                productQuantity={productQuantity}
                isMaxReached={isMaxReached}
                addProductToCartHandler={addProductToCartHandler}
                removeProductFromCartHandler={removeProductFromCartHandler}
                isLoading={loadingVariantId === activeVariant?.id}
              />
              {productQuantity > 0 && (
                <div className={styles.see_cart_main}>
                  <p className={styles.see_cart_title}>در سبد شما</p>
                  <div
                    className="d-flex align-items-center"
                    style={{ fontSize: "12px" }}
                  >
                    مشاهده
                    <Link
                      className={styles.see_cart_link}
                      href="/checkout/cart/"
                    >
                      <p className={styles.see_cart_link_text}>سبد خرید</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
