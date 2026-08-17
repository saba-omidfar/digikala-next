import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import VerticalSlider from "@/features/product/sections/productDetails/VerticalSlider";
import Timer from "@/components/modules/timer/Timer";
import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";
import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import ProductPriceBox from "@/features/cart/sections/productPriceBox/ProductPriceBox";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./miniBuyBoxSticky.module.css";

function MiniBuyBoxSticky() {
  const [topOffset, setTopOffset] = useState(234);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  const { data: topMegaMenuBanners } = useGetUniversal();
  const { user, guestCartId } = useUserContext();
  const { productDetails, activeVariant } = useProductContext();
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

  const addProductToCartHandler = () => {
    setLoadingVariantId(activeVariant?.id);

    addProductToCart(
      {
        guestCartId,
        productId: productDetails?.id,
        variantId: activeVariant?.id,
        quantity: 1,
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
        userId: user?._id,
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

    // setTimeout(() => {
    //   setShowAddToCartSuccess(false);
    // }, 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScrollY) {
        setTopOffset(topMegaMenuBanners ? 234 : 173);
      } else {
        setTopOffset(topMegaMenuBanners ? 195 : 173);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (Array.isArray(productDetails?.default_variant)) return null;

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess setShowAddToCartSuccess={setShowAddToCartSuccess} />
      )}
      <div className={styles.mini_buyBox_container}>
        <div
          className={styles.mini_buyBox_sticky_animation}
          style={{ top: `${topOffset}px` }}
        >
          <div className={styles.mini_buyBox}>
            <div className={styles.incredible_offer_container}>
              {activeVariant?.price?.is_promotion ? (
                <div style={{ color: "rgb(230, 18, 61)" }}>فروش ویژه</div>
              ) : (
                <div className={styles.incredible_offer_img_container}>
                  <Image
                    className={styles.incredible_offer_img}
                    src="/images/svg/productcard/topBadge/IncredibleOffer.svg"
                    width={139}
                    height={16}
                    alt=""
                  />
                </div>
              )}
              {activeVariant?.price?.timer ? (
                <div className={styles.incredible_offer_timer_container}>
                  <span className={styles.incredible_offer_timer}>
                    <Timer seconds={activeVariant?.price?.timer} />
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.product_infos_container}>
              <div className={styles.product_img_container}>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={productDetails?.images?.main?.url?.[0]}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={productDetails?.images?.main?.url?.[0]}
                  />
                  <img
                    className={styles.product_img}
                    src={productDetails?.images?.main?.url?.[0]}
                    alt={productDetails?.title_fa}
                    title={productDetails?.title_fa}
                  />
                </picture>
              </div>
              <div className={styles.product_details_container}>
                <p className={styles.product_title}>
                  {productDetails?.title_fa}
                </p>
                <div className="d-flex align-items-center mt-auto">
                  <div
                    className={styles.product_color_container}
                    style={{ background: activeVariant?.color?.hex_code }}
                  ></div>
                  <p className={styles.product_color}>
                    {activeVariant?.color?.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex mb-2">
              <div className="ms-2 d-flex align-items-center justify-content-center">
                <div className="position-relative">
                  {activeVariant?.seller?.title === "دیجی‌کالا" ? (
                    <div className={styles.digikala_icon_container}>
                      <div className="d-flex">
                        <div
                          data-icon-name="cube-dk"
                          data-icon="&#xE9E3;"
                          className={`${styles.digikala_icon_badge} cube-font-icon`}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="position-relative">
                      <div
                        data-icon-name="cube-seller"
                        data-icon="&#xE920;"
                        className={`${styles.seller_icon} cube-font-icon`}
                      ></div>
                    </div>
                  )}
                  {activeVariant?.seller?.is_trusted && (
                    <>
                      <div className="d-flex">
                        <div
                          className={`${styles.seller_info_store_icon} cube-font-icon`}
                          data-icon-name="cube-seller"
                          data-icon="&#xE920;"
                        ></div>
                      </div>
                      <div className={styles.seller_icon_badge_container}>
                        <div
                          data-icon-name="cube-verified-user"
                          data-icon="&#xE989;"
                          className={`${styles.seller_icon_badge} cube-font-icon`}
                        ></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className={styles.mini_buyBox_seller_name}>
                {activeVariant?.seller?.title}
              </p>
            </div>
            <div className="d-flex mb-2">
              <div className="ms-2 d-flex align-items-center justify-content-center">
                <div className="position-relative">
                  <div className="d-flex">
                    <div
                      className={`${styles.mini_buyBox_guarantee_icon} cube-font-icon`}
                      data-icon-name="cube-value-guarantee"
                      data-icon="&#xE918;"
                    ></div>
                  </div>
                </div>
              </div>
              <p className={styles.mini_buyBox_seller_name}>
                {toPersianDigits(activeVariant?.warranty?.title_en)}
              </p>
            </div>
            <div className="d-flex mb-2">
              <div className="ms-2 d-flex align-items-center justify-content-center">
                <div className="position-relative">
                  <div className="d-flex">
                    <div
                      className={`${styles.mini_buyBox_shipment_icon} cube-font-icon`}
                      data-icon-name="cube-product-shipment"
                      data-icon="&#xE98C;"
                    ></div>
                  </div>
                </div>
              </div>
              <p className={styles.mini_buyBox_shipment_text}>
                {activeVariant?.shipment_methods?.description}
              </p>
            </div>
            <div className="position-relative w-100 mt-1">
              <div className={styles.mini_buyBox_footer}>
                <div>
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
                      {/* <div className={styles.insurance_price}>
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
                      </div> */}
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className="d-flex align-items-center"
                    style={{ marginBottom: "4px" }}
                  >
                    <div className={styles.price_container}>
                      <ProductPriceBox price={activeVariant?.price} />
                    </div>
                  </div>
                  {productDetails?.default_variant?.variant_badges?.length ? (
                    <div className={styles.vertical_slider_container}>
                      <VerticalSlider
                        badges={productDetails?.default_variant?.variant_badges}
                        transform={20}
                        isMiniBuyBoxSticky={true}
                      />
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
                      removeProductFromCartHandler={
                        removeProductFromCartHandler
                      }
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
                            <p className={styles.see_cart_link_text}>
                              سبد خرید
                            </p>
                          </Link>
                        </div>
                      </div>
                    )}
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

export default MiniBuyBoxSticky;
