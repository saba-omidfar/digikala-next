import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import ProductCard from "./productCard/ProductCard";
import Loading from "@/components/modules/loading/Loading";

import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import useScreenStatus from "@/hooks/useScreenStatus";
import useLoginRedirect from "@/hooks/useLoginRedirect";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./addToCartSuccess.module.css";

function AddToCartSuccess({ product, setShowAddToCartSuccess, width }) {
  const router = useRouter();
  const { redirectToLogin } = useLoginRedirect();

  const { isSmallScreen } = useScreenStatus();
  const { showSnackbar } = useSnackbar();
  const { user, guestCartId } = useUserContext();
  const { activeVariant, supplementRecommendation, lowestPrice } =
    useProductContext();
  const {
    userCart,
    toggleInsurance,
    isLoadingToggleInsurance,
    selectedInsurance,
    setSelectedInsurance,
  } = useCartContext();

  const toggleInsuranceHandler = (checked) => {
    if (!user && !guestCartId) {
      redirectToLogin();
      return;
    }

    setSelectedInsurance(checked);

    toggleInsurance(
      {
        guestCartId,
        productId: product?.id,
        variantId: activeVariant?.id,
        hasInsurance: checked,
      },
      {
        onSuccess: () => {
          if (checked) {
            // فقط وقتی ایتم تو سبد هست و بیمه تازه اضافه شده
            if (cart) {
              // اگر قبلاً بیمه نداشت
              if (!cart.has_insurance) {
                showSnackbar("بیمه به کالا اضافه شد");
              }
            }
          }
        },
      },
    );
  };

  const cart = useMemo(() => {
    return userCart?.cart?.packages
      ?.flatMap((pkg) => pkg.cart_items || [])
      ?.find(
        (item) =>
          item.product.id === product?.id &&
          item.variant.id === activeVariant?.id,
      );
  }, [userCart, product?.id, activeVariant?.id]);

  const insuranceInCart = !!cart?.has_insurance;
  const insuranceOptimistic = selectedInsurance;
  const isInsuranceActive = insuranceInCart || insuranceOptimistic;

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  const hasLowestPrice = activeVariant?.price?.selling_price > lowestPrice;

  return (
    <>
      <div
        className={styles.add_to_cart_container}
        style={{ bottom: isSmallScreen ? (hasLowestPrice ? 142 : 70) : 0 }}
      >
        <div
          id="success-add-to-cart-content"
          className={styles.add_to_cart_content}
          style={{
            paddingTop: supplementRecommendation?.products ? 4 : 0,
            paddingBottom: supplementRecommendation?.products ? 12 : 0,
            width: width,
          }}
        >
          {/* Indicator */}
          <div className={styles.drag_indicator}>
            <div className={styles.drag_indicator_pill}></div>
          </div>

          {/* Header */}
          <div className={styles.header_container}>
            <div className={styles.header}>
              {/* Close */}
              <div
                className={styles.close_icon_container}
                aria-hidden="false"
                onClick={() => setShowAddToCartSuccess(false)}
              >
                <div
                  data-icon-name="cube-nav-close"
                  data-icon="&#xE907;"
                  className={`${styles.close_icon} cube-font-icon`}
                ></div>
              </div>

              {/* Animation */}
              <div className={styles.success_animation__btn_container}>
                <div className={styles.success_animation__btn}>
                  <div>
                    <dotlottie-player
                      autoplay={false}
                      loop={false}
                      mode="normal"
                      src="/statics/lottie/success.lottie"
                      background="transparent"
                    ></dotlottie-player>
                  </div>
                </div>
                <span className={styles.success__title}>کالا اضافه شد!</span>
              </div>

              {/* Basket Link */}
              <Link
                className={styles.cart_link_container}
                href="/checkout/cart"
              >
                <div className="d-flex align-items-center">
                  <span className={styles.cart_link_text}>برو به سبد خرید</span>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.chevron_icon}>
                      <use href="#chevronLeft"></use>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.container}>
            {/* Insurance */}
            {activeVariant?.insurance ? (
              <div className={styles.services_container}>
                <div className={styles.services_header}>
                  <div className={styles.services_title}>خدمات محصول</div>
                  <div className={styles.insurance_container}>
                    <div className={styles.insurance_input_container}>
                      {isLoadingToggleInsurance ? (
                        <Loading tooSmall />
                      ) : (
                        <label className={styles.insurance_label}>
                          <input
                            className={styles.insurance_input}
                            type="checkbox"
                            checked={isInsuranceActive}
                            onChange={(e) =>
                              toggleInsuranceHandler(e.target.checked)
                            }
                            data-cro-id="click_on_checkbox"
                          />
                          <span
                            className={`${styles.input_checkbox} ${
                              isInsuranceActive
                                ? styles.active_checkbox
                                : styles.disabled_checkbox
                            }`}
                          >
                            <div
                              className={`${
                                isInsuranceActive
                                  ? styles.checkbox_active_icon_container
                                  : styles.checkbox_hide_icon_container
                              }`}
                              aria-hidden="false"
                            >
                              <svg className={styles.checkbox_icon}>
                                <use href="#check"></use>
                              </svg>
                            </div>
                          </span>
                        </label>
                      )}
                      <p className={styles.insurance_title}>
                        {activeVariant?.insurance?.title}
                      </p>
                      <div className={styles.insurance_infos_container}>
                        <span className={styles.insurance_discount_container}>
                          <span className={styles.insurance_discount}>
                            {toPersianDigits(
                              activeVariant?.insurance?.discount_percent,
                            )}
                            ٪
                          </span>
                        </span>
                        <span className={styles.insurance_price_container}>
                          <span className={styles.insurance_price}>
                            {(
                              activeVariant?.insurance?.total_premium / 10
                            )?.toLocaleString("fa-IR")}
                          </span>
                          <div className="d-flex" aria-hidden={false}>
                            <div
                              data-icon-name="cube-toman"
                              data-icon="&#xE953;"
                              className={`${styles.price_icon} cube-font-icon`}
                            ></div>
                          </div>
                        </span>
                      </div>
                      <button className={styles.info_btn}>
                        <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                          <div className="d-flex" aria-hidden={false}>
                            <div
                              data-icon-name="cube-info-outline"
                              data-icon=""
                              className={`${styles.info_icon} cube-font-icon`}
                            ></div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Suppliment Recommendations */}
            {supplementRecommendation?.products?.length ? (
              <div className={styles.suppliment_recommendations}>
                <div className="d-flex flex-column">
                  <div className={styles.suppliment_recommendations_title}>
                    خریدت رو کامل‌تر کن
                  </div>
                  {/* Products */}
                  {supplementRecommendation?.products?.map((product, index) => (
                    <ProductCard
                      index={index}
                      key={product?.id}
                      product={product}
                      isLastIndex={supplementRecommendation?.products?.length}
                    />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AddToCartSuccess;
