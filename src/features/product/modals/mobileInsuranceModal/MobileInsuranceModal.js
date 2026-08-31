import { useMemo } from "react";

import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import Loading from "@/components/modules/loading/Loading";

import { useProductContext } from "@/contexts/ProductContext";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./mobileInsuranceModal.module.css";

function MobileInsuranceModal({ productId, variantId }) {
  const { closeMobileModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { redirectToLogin } = useLoginRedirect();

  const { activeVariant } = useProductContext();
  const { user, guestCartId } = useUserContext();
  const {
    userCart,
    addProductToCart,
    addProductToCartIsLoading,
    toggleInsurance,
    selectedInsurance,
    setSelectedInsurance,
  } = useCartContext();

  const isProductInBasket = userCart?.cart?.packages
    .flatMap((pkg) => pkg.cart_items || [])
    .some(
      (item) =>
        item.product?.id === productId && item.variant.id === activeVariant?.id,
    );

  const cart = useMemo(() => {
    return userCart?.cart?.packages
      ?.flatMap((pkg) => pkg.cart_items || [])
      ?.find(
        (item) =>
          item.product.id === productId &&
          item.variant.id === activeVariant?.id,
      );
  }, [userCart, productId, activeVariant?.id]);

  const insuranceInCart = !!cart?.has_insurance;
  const insuranceOptimistic = selectedInsurance;
  const isInsuranceActive = insuranceInCart || insuranceOptimistic;

  const addProductToCartHandler = () => {
    addProductToCart(
      {
        guestCartId,
        productId: productId,
        variantId: activeVariant?.id,
        quantity: 1,
        hasInsurance: true,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (!isInsuranceActive) {
            showSnackbar({ text: "کالا همراه با بیمه به سبد اضافه شد" });
          }

          onDismiss();
        },
      },
    );
  };

  const toggleInsuranceHandler = ({ hasInsurance }) => {
    if (!user && !guestCartId) {
      redirectToLogin();
      return;
    }

    setSelectedInsurance(hasInsurance);

    toggleInsurance(
      {
        guestCartId,
        productId,
        variantId,
        hasInsurance,
      },
      {
        onSuccess: () => {
          if (hasInsurance) {
            if (cart) {
              if (!cart.has_insurance) {
                showSnackbar("بیمه به کالا اضافه شد");
              }
            }
          } else {
            showSnackbar("بیمه از کالا حذف شد");
          }

          onDismiss();
        },
      },
    );
  };

  function onDismiss() {
    closeMobileModal();
  }

  return (
    <BottomSheet
      open
      onDismiss={onDismiss}
      blocking
      snapPoints={({ maxHeight }) => [maxHeight, maxHeight * 0.7]}
      header={
        <div className={styles.header}>
          <div className="d-flex justify-content-between align-items-center">
            <p className={styles.header_title}>
              جزئیات {activeVariant?.insurance?.title}
            </p>
          </div>
          <div className="d-flex" onClick={onDismiss}>
            <div
              data-icon-name="cube-nav-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
    >
      <div className={styles.content_container}>
        <div className={styles.content}>
          <h2 className={styles.content_title}>
            {activeVariant?.insurance?.description}
          </h2>
          <h2 className={styles.digipay_title}>
            قدرت‌گرفته از
            <span className="d-flex justify-content-center align-items-center">
              <div
                className={styles.digipay_logo_icon_container}
                aria-hidden="false"
              >
                <div
                  className={`${styles.digipay_logo_icon} cube-font-icon`}
                  data-icon-name="cube-brand-digipay-logotype-en"
                  data-icon=""
                ></div>
              </div>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.digipay_icon}>
                  <use href="#digipay"></use>
                </svg>
              </div>
            </span>
          </h2>
          {activeVariant?.insurance?.covers?.length ? (
            <ul className={styles.covers_container}>
              <li className={styles.cover_title}>شرایط جبران خسارت</li>
              {activeVariant?.insurance?.covers?.map((item, index) => (
                <li key={index} className={styles.cover_description}>
                  {item?.description}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.footer}>
        {isInsuranceActive ? (
          <button
            className={`${styles.footer_btn} ${styles.disabled_btn} m-0`}
            data-cro-id="dont-want-insurance"
            onClick={() =>
              toggleInsuranceHandler({
                hasInsurance: false,
              })
            }
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              حذف بیمه
            </div>
          </button>
        ) : (
          <>
            <button
              className={`${styles.footer_btn} ${
                addProductToCartIsLoading ? styles.disabled_btn : ""
              }`}
              data-cro-id="adding-good-by-insurance"
              onClick={() => {
                if (addProductToCartIsLoading) return;

                if (!isProductInBasket) {
                  addProductToCartHandler();
                  return;
                }

                if (!isInsuranceActive) {
                  toggleInsuranceHandler({
                    hasInsurance: true,
                  });
                }
              }}
              style={{
                pointerEvents: addProductToCartIsLoading ? "none" : "auto",
              }}
            >
              {addProductToCartIsLoading && <Loading isSmall />}
              <div
                className={`${
                  addProductToCartIsLoading ? styles.btn_content_loading : ""
                } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
              >
                {!isInsuranceActive
                  ? "افزودن بیمه به کالا"
                  : "افزودن کالا و بیمه"}
              </div>
            </button>
            <button
              className={`${styles.footer_btn} ${styles.disabled_btn} m-0`}
              data-cro-id="dont-want-insurance"
              onClick={() => onDismiss()}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                فعلا تمایل ندارم
              </div>
            </button>
          </>
        )}
      </div>
    </BottomSheet>
  );
}
export default MobileInsuranceModal;
