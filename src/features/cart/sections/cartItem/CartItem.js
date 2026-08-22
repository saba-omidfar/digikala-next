import { useState, useEffect, useMemo } from "react";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import Image from "next/image";

import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";
import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import InsuranceModal from "@/features/shared/modals/insuranceModal/InsuranceModal";
import SaveToListModal from "@/features/cart/modals/saveToListModal/SaveToListModal";
import Timer from "@/components/modules/timer/Timer";

import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import { useModal } from "@/contexts/modalContext";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./cartItem.module.css";

function CartItem({ item }) {
  const router = useRouter();
  const { openMobileModal, openModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const { user, guestCartId } = useUserContext();
  const { userCart, toggleInsurance, addProductToCart, removeProductFromCart } =
    useCartContext();

  const [productQuantity, setProductQuantity] = useState(0);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [loadingState, setLoadingState] = useState(null);

  const addProductToCartHandler = ({ variantId }) => {
    setLoadingState({
      variantId,
      action: "add",
    });

    addProductToCart(
      {
        guestCartId,
        productId: item?.product?.id,
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
          setLoadingState(null);
        },
      },
    );
  };

  const removeProductFromCartHandler = ({ variantId }) => {
    setLoadingState({
      variantId,
      action: "remove",
    });

    removeProductFromCart(
      {
        guestCartId,
        variantId,
      },
      {
        onSettled: () => {
          setLoadingState(null);
        },
      },
    );
  };

  const handleAddToCartSuccess = () => {
    setShowAddToCartSuccess(true);
  };

  const toggleInsuranceHandler = (checked) => {
    toggleInsurance({
      guestCartId,
      productId: item?.product?.id,
      variantId: item?.variant?.id,
      hasInsurance: checked,
    });
  };

  const maxLimit = item?.variant?.price?.order_limit || Infinity;
  const isMaxReached = item?.quantity === maxLimit;
  const isJetEligible =
    item?.product?.digiplus?.is_jet_eligible ||
    item?.product?.shipment_methods?.providers?.[0]?.shipping_mode === "jet";

  useEffect(() => {
    if (userCart) {
      setProductQuantity(item?.quantity || 0);
    }
  }, [userCart]);

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess setShowAddToCartSuccess={setShowAddToCartSuccess} />
      )}
      <div
        className={`${styles.cart_item_container} ${styles.br_list_vertical}`}
        id="cart-item"
      >
        <div className={styles.cart_item_grid}>
          <div className={styles.right_section}>
            <div className="d-flex align-items-center flex-column">
              <Link
                href={
                  `${item?.product?.url?.uri}/?variant_id=${item?.variant?.id}` ||
                  "#"
                }
                className={styles.product_img_bg}
              >
                {isJetEligible ? (
                  <div className={styles.shipping_today_badge}>
                    <div className={styles.shipping_today_bg}>
                      <div className="d-flex gap-2 align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <div
                            className={`${styles.shipping_today_icon} cube-font-icon`}
                            data-icon-name="cube-shipping-today"
                            data-icon=""
                          ></div>
                        </div>
                        <span className={styles.shipping_today_text}>
                          ارسال سریع
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.product_img_container}>
                  <picture>
                    <source
                      type="image/webp"
                      src={item?.product?.images?.main?.url?.[0]}
                    />
                    <source
                      type="image/jpeg"
                      src={item?.product?.images?.main?.url?.[0]}
                    />
                    <img
                      title=""
                      src={item?.product?.images?.main?.url?.[0]}
                      alt={item?.product?.title_fa}
                      className={styles.product_img}
                    />
                  </picture>
                </div>
                <div className={styles.cart_item_imageQuantity}>
                  {item?.quantity.toLocaleString("fa-IR")}
                </div>
              </Link>
            </div>
            <div className={styles.product_infos_container}>
              <div className={styles.amazing_badge_container}>
                <div className={styles.amazing_badge}>
                  {item?.variant?.price?.is_promotion ? (
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.amazing_icon} cube-font-icon`}
                        data-icon-name="cube-badge-amazing"
                        data-icon=""
                      ></div>
                    </div>
                  ) : (
                    ""
                  )}
                  {item?.variant?.price?.is_incredible ? (
                    <div
                      className={`${styles.amazing_icon} cube-font-icon`}
                      data-icon-name="cube-badge-amazing-new"
                      data-icon=""
                    ></div>
                  ) : (
                    ""
                  )}
                  <span className={styles.amazing_text}>
                    {item?.variant?.price?.badge
                      ? item?.variant?.price?.badge?.title
                      : ""}
                  </span>
                  {item?.variant?.price?.timer ? (
                    <span className={styles.timer_container}>
                      <Timer seconds={item?.variant?.price?.timer} />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styles.product_infos}>
                <Link
                  href={
                    `${item?.product?.url?.uri}/?variant_id=${item?.variant?.id}` ||
                    "#"
                  }
                >
                  <span className={styles.product_title}>
                    {item?.product?.title_fa}
                  </span>
                </Link>
                {item?.variant?.color ? (
                  <div className={styles.product_color_bg}>
                    <span
                      className={styles.product_color}
                    >{`رنگ ${item?.variant?.color?.title}`}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.mobile_price_container}>
                  <div className={styles.product_price}>
                    {item?.variant?.price?.discount_percent !== 0 ? (
                      <div className={styles.discount_badge_container}>
                        <div className={styles.old_price_container}>
                          <div className={styles.discount_badge}>
                            <div className="d-flex align-items-center justify-content-center">
                              <span className={styles.discount_percent}>%</span>
                              <span className={styles.discount}>
                                {toPersianDigits(
                                  item?.variant?.price?.discount_percent,
                                )}
                              </span>
                            </div>
                          </div>
                          <div className={styles.old_price_text_container}>
                            <span className={styles.old_price_text}>
                              {(
                                (item?.variant?.price?.rrp_price / 10) *
                                item?.quantity
                              )?.toLocaleString("fa-IR")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className={styles.mobile_price_container}>
                      <div className="d-flex gap-2">
                        <div className={styles.product_price_container}>
                          <span className={styles.price}>
                            {(
                              (item?.variant?.price?.selling_price / 10) *
                              item.quantity
                            ).toLocaleString("fa-IR")}
                          </span>
                          <div>
                            <span
                              className={styles.price_icon_container}
                              aria-hidden="true"
                            >
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
              {isJetEligible ? (
                <div className={styles.shipment_methods_container}>
                  <div className={styles.shipment_methods}>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.jet_delivery_icon} cube-font-icon`}
                        data-icon-name="cube-shipping-today"
                        data-icon=""
                      ></div>
                    </div>
                    <span className={styles.variant_text}>ارسال سریع</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.mobile_btns_container}>
            <div className={styles.mobile_btns}>
              <div className="d-flex flex-column gap-2">
                <div className={styles.btns_container}>
                  <CartActionBox
                    noShadow
                    quantityBoxClassName={styles.quantity_box}
                    productQuantity={productQuantity}
                    isMaxReached={isMaxReached}
                    addProductToCartHandler={() =>
                      addProductToCartHandler({
                        variantId: item?.variant?.id,
                      })
                    }
                    removeProductFromCartHandler={() =>
                      removeProductFromCartHandler({
                        variantId: item?.variant?.id,
                        removeFromNextPurchase: false,
                      })
                    }
                    isLoading={
                      loadingState?.variantId === item?.variant?.id &&
                      ["add", "remove"].includes(loadingState?.action)
                    }
                  />
                  <div
                    className={styles.next_cart_btn_container}
                    onClick={() =>
                      isSmallScreen
                        ? openMobileModal("save-to-list", {
                            productId: item.product.id,
                            variantId: item.variant.id,
                            colorTitle: item?.variant?.color?.title,
                            variantTitle: item?.variant?.seller?.title,
                          })
                        : openModal(
                            <SaveToListModal
                              productId={item.product.id}
                              variantId={item.variant.id}
                              colorTitle={item?.variant?.color?.title}
                              variantTitle={item?.variant?.seller?.title}
                            />,
                            {
                              name: "save-to-list",
                              className: "rounded-medium",
                            },
                          )
                    }
                  >
                    <div className={styles.next_cart_btn}>
                      <div className={styles.next_cart_text_bg}>
                        <span className={styles.next_cart_text}>
                          بعدا می‌خرم
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.left_section}>
            <div className="d-flex flex-column gap-1">
              <div className={styles.product_price}>
                {item?.variant?.price?.discount_percent !== 0 ? (
                  <div className={styles.discount_badge_container}>
                    <div className={styles.old_price_container}>
                      <div className={styles.discount_badge}>
                        <div className="d-flex align-items-center justify-content-center">
                          <span className={styles.discount_percent}>%</span>
                          <span className={styles.discount}>
                            {toPersianDigits(
                              item?.variant?.price?.discount_percent,
                            )}
                          </span>
                        </div>
                      </div>
                      <div className={styles.old_price_text_container}>
                        <span className={styles.old_price_text}>
                          {(
                            (item?.variant?.price?.rrp_price / 10) *
                            item?.quantity
                          )?.toLocaleString("fa-IR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="d-flex gap-2">
                  <div className={styles.product_price_container}>
                    <span className={styles.price}>
                      {(
                        (item?.variant?.price?.selling_price / 10) *
                        item.quantity
                      ).toLocaleString("fa-IR")}
                    </span>
                    <div>
                      <span
                        className={styles.price_icon_container}
                        aria-hidden="true"
                      >
                        <svg className={styles.price_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className={styles.btns_container}>
                <CartActionBox
                  noShadow
                  quantityBoxClassName={styles.quantity_box}
                  productQuantity={productQuantity}
                  isMaxReached={isMaxReached}
                  addProductToCartHandler={() =>
                    addProductToCartHandler({
                      variantId: item?.variant?.id,
                    })
                  }
                  removeProductFromCartHandler={() =>
                    removeProductFromCartHandler({
                      variantId: item?.variant?.id,
                      removeFromNextPurchase: false,
                    })
                  }
                  isLoading={
                    loadingState?.variantId === item?.variant?.id &&
                    ["add", "remove"].includes(loadingState?.action)
                  }
                />
                <div
                  className={styles.next_cart_btn_container}
                  onClick={() =>
                    openModal(
                      <SaveToListModal
                        variantId={item.variant.id}
                        productId={item.product.id}
                        colorTitle={item?.variant?.color?.title}
                        variantTitle={item?.variant?.seller?.title}
                      />,
                      {
                        name: "save-to-list",
                        className: "rounded-medium",
                      },
                    )
                  }
                >
                  <div className={styles.next_cart_btn}>
                    <div className={styles.next_cart_text_bg}>
                      <span className={styles.next_cart_text}>بعدا می‌خرم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {item?.variant?.gifts?.length
          ? item?.variant?.gifts?.map((gift) => (
              <div className={styles.gift_container} key={gift.id}>
                <div className="d-flex">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className={styles.gift_icon_container}>
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.gift_icon}>
                          <use href="#gift"></use>
                        </svg>
                      </div>
                      <span className={styles.gift_title}>هدیه</span>
                    </div>
                    <div
                      className={styles.gift_img_container}
                      aria-hidden="false"
                      aria-label={gift.title_fa}
                    >
                      <Image
                        className={styles.gift_img}
                        src={gift?.images?.main?.url?.[0]}
                        width={56}
                        height={56}
                        alt={gift?.title_fa}
                        title=""
                      />
                    </div>
                  </div>
                  <p className={styles.gift_product_title}>{gift?.title_fa}</p>
                </div>
              </div>
            ))
          : ""}

        {/* {isMiniCart ? (
          <div className={styles.vertical_slider_container}>
            <VerticalSlider
              transform={20}
              badges={item?.productNewBadges}
              isMiniCart={isMiniCart}
            />
          </div>
        ) : (
          ""
        )} */}
        {/* {activeTab === "basket" && (
            <div className={styles.cart_next_purchase_container}>
              <div className="d-flex me-auto">
                <button
                  className={styles.cart_next_purchase_btn}
                  onClick={() =>
                    moveProductToNextPurchaseBasket({
                      variantId: item?.variant?.id,
                    })
                  }
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    {isLoadingAddToNextCart ? (
                      <div style={{ width: "134px" }}>
                        <Loading isSmall={true} />
                      </div>
                    ) : (
                      <>
                        انتقال به خرید بعدی
                        <div className="d-flex me-2" aria-hidden="false">
                          <svg className={styles.trailing_icon}>
                            <use href="#chevronLeft"></use>
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )} */}

        {/* <div className={styles.cart_item_btns_container}>
          <button
            className={styles.cart_item_delete_btn}
            id="cart-delete-item-central"
            onClick={() =>
              removeProductFromCartHandler({
                variantId: item?.variant?.id,
                removeFromNextPurchase: true,
              })
            }
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              <div className={styles.cart_item_delete_icon_container}>
                <div
                  data-icon-name="cube-delete"
                  data-icon="&#xE90E;"
                  className={`${styles.cart_item_delete_icon} cube-font-icon`}
                ></div>
              </div>
              <p className={styles.cart_item_delete_text}>حذف</p>
            </div>
          </button>

          <button
            className={styles.cart_item_add_to_cart_btn}
            onClick={() =>
              addProductToCartHandler({
                variantId: item?.variant?.id,
              })
            }
          >
            {isLoadingAddToNextCart ? (
              <div className={styles.loading_container}>
                <Loading isSmall={true} />
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <div className={styles.cart_item_add_to_cart_icon_container}>
                  <div
                    data-icon-name="cube-move-to-cart"
                    data-icon="&#xE919;"
                    className={`${styles.cart_item_add_to_cart_icon} cube-font-icon`}
                  ></div>
                </div>
                افزودن به سبد
              </div>
            )}
          </button>
        </div> */}

        {/* insurance */}
        {item?.variant?.insurance ? (
          <div className={styles.insurance_container}>
            <div className={styles.insurance_input_container}>
              <label className={styles.insurance_label}>
                <input
                  className={styles.insurance_input}
                  type="checkbox"
                  checked={item?.has_insurance}
                  onChange={(e) => toggleInsuranceHandler(e.target.checked)}
                  data-cro-id="click_on_checkbox"
                />
                <span
                  className={`${styles.checkbox} ${
                    item?.has_insurance
                      ? styles.active_checkbox
                      : styles.disabled_checkbox
                  }`}
                >
                  <div
                    className={`${
                      item?.has_insurance
                        ? styles.checkbox_active_icon_container
                        : styles.checkbox_hide_icon_container
                    }`}
                    aria-hidden="false"
                  >
                    <svg className={styles.insurance_checkbox_icon}>
                      <use href="#check"></use>
                    </svg>
                  </div>
                </span>
              </label>
            </div>
            <div className={styles.insurance_infos}>
              <div className={styles.insurance_name}>
                {item?.variant?.insurance?.title}
              </div>
              <div>
                <div className={styles.insurance_price_box}>
                  <div className="d-flex align-items-center gap-2">
                    <div className={styles.old_price_container}>
                      <div className={styles.old_price_text_container}>
                        <span className={styles.old_price_text}>
                          {(
                            item?.variant?.insurance?.before_discount / 10
                          )?.toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <div className={styles.discount_badge}>
                        <div className="d-flex align-items-center justify-content-center">
                          <span className={styles.discount_percent}>%</span>
                          <span className={styles.discount}>
                            {toPersianDigits(
                              item?.variant?.insurance?.discount_percent,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.before_discount}>
                    <span className={styles.before_discount_text}>
                      {(
                        item?.variant?.insurance?.total_premium / 10
                      )?.toLocaleString("fa-IR")}
                    </span>

                    <div
                      className={styles.insurance_price_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.price_icon}>
                        <use href="#toman"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="d-flex"
              aria-hidden="false"
              onClick={() =>
                openModal(
                  <InsuranceModal product={item?.product} cartItem={item} />,
                  {
                    name: "insurance",
                    className: "modal__insurance rounded-medium",
                  },
                )
              }
            >
              <div
                data-icon-name="cube-chevron-left"
                data-icon="&#xE9C2;"
                className={`${styles.chevron_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CartItem;
