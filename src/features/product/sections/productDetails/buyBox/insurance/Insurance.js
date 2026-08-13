import { useMemo } from "react";
import { useRouter } from "next-nprogress-bar";

import InsuranceModal from "@/features/shared/modals/insuranceModal/InsuranceModal";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";
import { useCartContext } from "@/contexts/CartContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import toPersianDigits from "@/utils/toPersianDigits";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./insurance.module.css";

function Insurance() {
  const router = useRouter();

  const { openModal, openMobileModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { isSmallScreen } = useScreenStatus();
  const { productDetails, activeVariant } = useProductContext();
  const { user, guestCartId } = useUserContext();
  const { userCart, toggleInsurance, selectedInsurance, setSelectedInsurance } =
    useCartContext();

  const toggleInsuranceHandler = (checked) => {
    if (!user && !guestCartId) {
      router.push("/users/login");
      return;
    }

    setSelectedInsurance(checked);

    toggleInsurance(
      {
        guestCartId,
        productId: productDetails?.id,
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

  const openInsuranceModalHandler = () => {
    isSmallScreen
      ? openMobileModal("insurance", {
          productId: productDetails.id,
          variantId: activeVariant?.id,
        })
      : openModal(<InsuranceModal product={productDetails} />, {
          name: "insurance",
          className: "modal__insurance rounded-medium",
        });
  };

  const cart = useMemo(() => {
    return userCart?.cart?.packages
      ?.flatMap((pkg) => pkg.cart_items || [])
      ?.find(
        (item) =>
          item.product.id === productDetails?.id &&
          item.variant.id === activeVariant?.id,
      );
  }, [userCart, productDetails?.id, activeVariant?.id]);

  const insuranceInCart = !!cart?.has_insurance;
  const insuranceOptimistic = selectedInsurance;
  const isInsuranceActive = insuranceInCart || insuranceOptimistic;

  if (!activeVariant?.insurance) return null;

  return (
    <div>
      <div className={styles.insurance_container}>
        <p className={styles.insurance_title}>
          {isSmallScreen ? activeVariant?.insurance?.title : "بیمه"}
        </p>
        <div
          className={`${styles.insurance_input_container} ${isInsuranceActive ? styles.active_insurance_input_container : ""}`}
        >
          <label className={styles.insurance_label}>
            <input
              className={styles.insurance_input}
              type="checkbox"
              checked={isInsuranceActive}
              onChange={(e) => toggleInsuranceHandler(e.target.checked)}
              data-cro-id="click_on_checkbox"
            />
            <span
              className={`${styles.checkbox} ${
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
          <div className={styles.insurance_infos}>
            <p className={styles.insurance_name}>
              {activeVariant?.insurance?.title}
            </p>
            <div className={styles.insurance_price_box}>
              <div className="d-flex align-items-center ms-auto">
                <div className={styles.insurance_price_right_box}>
                  <div className={styles.product_price__discount_wrapper}>
                    <span
                      className={styles.product_price__discount}
                      data-testid="price-discount-percent"
                    >
                      {toPersianDigits(
                        activeVariant?.insurance?.discount_percent,
                      )}
                      ٪
                    </span>
                  </div>
                  <div className={styles.price_before_discount}>
                    {(
                      activeVariant?.insurance?.before_discount / 10
                    )?.toLocaleString("fa-IR")}
                  </div>
                </div>
                <div className={styles.final_price_container}>
                  <span data-testid="price-final">
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
                </div>
              </div>
              <span
                className={styles.insurance_details_container}
                data-cro-id="click_on_details"
                onClick={openInsuranceModalHandler}
              >
                <span>جزئیات</span>
                <div className="d-flex" aria-hidden={false}>
                  <div
                    data-icon-name="cube-chevron-left"
                    data-icon="&#xE9C2;"
                    className={`${styles.chevron_icon} cube-font-icon`}
                  ></div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Insurance;
