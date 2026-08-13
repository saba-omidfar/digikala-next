import { useMemo } from "react";

import { useProductContext } from "@/contexts/ProductContext";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import toPersianDigits from "@/utils/toPersianDigits";

import Loading from "@/components/modules/loading/Loading";

import styles from "./insuranceModal.module.css";

function InsuranceModal({ product, cartItem }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { user, guestCartId } = useUserContext();
  const { activeVariant } = useProductContext();

  const {
    userCart,
    addProductToCart,
    addProductToCartIsLoading,
    toggleInsurance,
  } = useCartContext();

  const variantId = cartItem?.variant?.id ?? activeVariant?.id;

  const isProductInBasket = userCart?.cart?.packages
    .flatMap((pkg) => pkg.cart_items || [])
    .some(
      (item) =>
        item.product?.id === product?.id && item.variant.id === variantId,
    );

  const addProductToCartHandler = () => {
    addProductToCart(
      {
        guestCartId,
        productId: product?.id,
        variantId: variantId,
        quantity: 1,
        hasInsurance: true,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (!isProductInBasket) {
            showSnackbar("کالا همراه با بیمه به سبد اضافه شد");
          }

          closeModal();
        },
      },
    );
  };

  const toggleInsuranceHandler = ({ hasInsurance }) => {
    if (user) {
      toggleInsurance(
        {
          guestCartId,
          productId: product.id,
          variantId: variantId,
          hasInsurance,
        },
        {
          onSuccess: () => {
            showSnackbar("بیمه به کالا اضافه شد");
            closeModal();
          },
        },
      );
    } else {
      router.push("/users/login");
    }
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

  const isLoading = addProductToCartIsLoading;

  return (
    <div
      className={`${styles.modal_layout} ${
        !isProductInBasket ? styles.modal_layout_padd : ""
      }`}
    >
      <div className={styles.modal_header}>
        <div className={styles.modal_header_bb}>
          <div className={styles.modal_header_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header_title}>
                <span className="position-relative">جزئیات بیمه</span>
              </p>
            </div>
            <div className={styles.modal_header_subtitle}>
              در صورت تمایل می‌توانید بیمه کالا را هم به سبد اضافه کنید
            </div>
          </div>
          <div
            className="d-flex"
            aria-hidden={false}
            onClick={() => closeModal()}
          >
            <div
              data-test-id="close-modal-icon-button"
              data-cro-id="closing_modal_1"
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column overflow-y-auto flex-grow-1">
        <div className={styles.modal_content_container}>
          <div className={styles.modal_content}>
            <div className={styles.modal_content_title}>
              {product?.default_variant?.insurance?.title}
            </div>
            <div className="d-flex justify-content-start position-relative flex-column align-items-end">
              <div
                className={styles.price_container}
                data-theme-animation="price-container"
              >
                <span
                  className={styles.price_before_discount}
                  data-testid="price-no-discount"
                >
                  {(
                    product?.default_variant?.insurance?.before_discount / 10
                  )?.toLocaleString("fa-IR")}
                </span>
                <div className={styles.price_discount_container}>
                  <span
                    className={styles.price_discount}
                    data-testid="price-discount-percent"
                  >
                    {toPersianDigits(
                      product?.default_variant?.insurance?.discount_percent,
                    )}
                    ٪
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className={styles.final_price} data-testid="price-final">
                  {(
                    product?.default_variant?.insurance?.total_premium / 10
                  )?.toLocaleString("fa-IR")}
                </span>
                <div className="d-flex" aria-hidden={false}>
                  <div
                    data-icon-name="cube-toman"
                    data-icon="&#xE953;"
                    className={`${styles.price_icon} cube-font-icon`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modal_content_details}>
            <h2>{product?.default_variant?.insurance?.description}</h2>
            <ul>
              {product?.default_variant?.insurance?.covers?.map(
                (cover, index) => (
                  <li key={index} className={styles.modal_content_details_item}>
                    {cover?.description}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
      {!cart?.has_insurance ? (
        <div className={styles.modal_footer}>
          <div className="d-flex align-items-center w-100">
            <button
              className={`${styles.modal_btn} ${
                isLoading ? styles.disabled_btn : ""
              }`}
              data-cro-id="click_on_adding_product_and_insurance_1"
              onClick={() => {
                if (isLoading) return;

                if (!isProductInBasket) {
                  addProductToCartHandler();
                  return;
                }

                if (isProductInBasket && !cart?.has_insurance) {
                  toggleInsuranceHandler({
                    hasInsurance: true,
                  });
                }
              }}
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
            >
              {isLoading && <Loading isSmall />}
              <div
                className={`${
                  isLoading ? styles.btn_content_loading : ""
                } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
              >
                {isProductInBasket && !cart?.has_insurance
                  ? "افزودن بیمه به کالا"
                  : "افزودن کالا و بیمه به سبد"}
              </div>
            </button>
            <button
              className={`${styles.modal_btn} ${styles.modal_disabled_btn} m-0`}
              data-cro-id="click_on_no_willing_to_buy_insurance_1"
              onClick={() => closeModal()}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                فعلا تمایل ندارم
              </div>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default InsuranceModal;
