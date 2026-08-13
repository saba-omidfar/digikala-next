import Spinner from "@/utils/Spinner";

import styles from "./cartActionBox.module.css";

function CartActionBox({
  quantityBoxClassName,
  iconClassName,
  showButton,
  isStickyFooter,
  isAddToCartModal,
  productQuantity,
  isMaxReached,
  addProductToCartHandler,
  removeProductFromCartHandler,
  isLoading,
  sellerVariantId,
  noShadow,
}) {
  return (
    <>
      {productQuantity === 0 && showButton ? (
        <div
          className={styles.add_btn_container}
          onClick={(e) => {
            if (!isLoading) addProductToCartHandler(e);
          }}
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          <button className={styles.add_btn} type="button">
            {isLoading && (
              <div className={styles.loading_active}>
                <Spinner size={16} color="rgb(237, 25, 68)" />
              </div>
            )}
            <div
              className={`${
                isLoading ? styles.btn_content_loading : ""
              } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
            >
              <div
                className={`${iconClassName} ${styles.add_btn_icon_container} ${isAddToCartModal ? styles.add_btn_icon_size : ""}`}
              >
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.add_btn_icon}>
                    <use href="#addSimple"></use>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        ""
      )}
      {productQuantity === 0 && !showButton ? (
        <button
          className={styles.add_to_cart_btn}
          data-add-to-cart-variant-id={sellerVariantId}
          id="add-to-cart"
          onClick={(e) => {
            if (!isLoading) addProductToCartHandler(e);
          }}
          style={{
            pointerEvents: isLoading ? "none" : "auto",
            width: isStickyFooter ? "50%" : "100%",
          }}
        >
          {isLoading && (
            <div className={styles.loading_active}>
              <Spinner size={16} color="rgb(237, 25, 68)" />
            </div>
          )}
          <div
            className={`${
              isLoading ? styles.btn_content_loading : ""
            } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
          >
            <div className={styles.add_to_cart_text_container}>
              <div
                className={`${isStickyFooter ? styles.footer_add_to_cart_text : styles.add_to_cart_text}`}
              >
                افزودن به سبد خرید
              </div>
              {/* {minOrderLimit > 1 && (
                <div className={styles.add_to_cart_subtext}>
                  حداقل: {toPersianDigits(minOrderLimit)} عدد
                </div>
              )} */}
            </div>
          </div>
        </button>
      ) : (
        ""
      )}

      {productQuantity !== 0 ? (
        <div
          className={`${quantityBoxClassName}`}
          style={{
            boxShadow: noShadow ? "none" : "0px 1px 5px rgba(0, 0, 0, 0.2)",
            border: noShadow ? "1px solid #e0e0e2" : "none",
          }}
        >
          <div
            aria-hidden="false"
            className={`d-flex ${isMaxReached ? styles.disabled_btn : ""}`}
            onClick={(e) => {
              if (isMaxReached) return;
              if (!isLoading) addProductToCartHandler(e);
            }}
            style={{
              pointerEvents: isLoading || isMaxReached ? "none" : "auto",
            }}
          >
            <svg
              data-testid="quantity-increase"
              className={styles.product_quantity_icon}
            >
              <use href="#addSimple"></use>
            </svg>
          </div>
          {isLoading ? (
            <Spinner size={16} color="rgb(237, 25, 68)" />
          ) : (
            <span className={styles.product_quantity_number_container}>
              <span
                className={styles.product_quantity_number}
                style={{ top: isMaxReached ? "4px" : "" }}
              >
                {productQuantity?.toLocaleString("fa-IR")}
              </span>
              {isMaxReached && (
                <small className={styles.quantity_number_caption}>حداکثر</small>
              )}
            </span>
          )}
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={(e) => {
              if (!isLoading) removeProductFromCartHandler(e);
            }}
            style={{ pointerEvents: isLoading ? "none" : "auto" }}
          >
            <svg
              data-testid="quantity-decrease"
              className={styles.product_quantity_icon}
            >
              <use
                href={`${productQuantity === 1 ? "#delete" : "#removeSimple"}`}
              ></use>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CartActionBox;
