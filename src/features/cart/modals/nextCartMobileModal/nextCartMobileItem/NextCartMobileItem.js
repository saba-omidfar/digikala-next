import { useState, useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import Spinner from "@/utils/Spinner";

import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./nextCartMobileItem.module.css";

function NextCartMobileItem({ item, isNextCartItem }) {
  const router = useRouter();

  const { showSnackbar } = useSnackbar();
  const { user, guestCartId } = useUserContext();
  const {
    userCart,
    toggleInsurance,
    addProductToCart,
    removeFromNextCart,
    removeProductFromCart,
    setLoadingVariantId,
  } = useCartContext();

  const [productQuantity, setProductQuantity] = useState(0);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [loadingState, setLoadingState] = useState(null);

  const removeProductFromNextPurchase = ({ e, variantId, removeAll }) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user && !guestCartId) {
      router.push("/users/login");
      return;
    }

    setLoadingState({ variantId, action: "remove" });
    setLoadingVariantId(variantId);

    removeFromNextCart(
      {
        guestCartId,
        variantId,
        removeAll,
      },
      {
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const favoriteHandler = (e) => {
    if (isLoadingFavoriteStatus || isLoadingAddFavorite) return;

    e.preventDefault();
    e.stopPropagation();

    setLoadingVariantId(product?.variant?.id);

    if (!user) {
      router.push("/users/login");
      return;
    }

    if (!favotiteStatus?.is_favorite) {
      addFavorite(
        {
          productId: product?.id,
        },
        {
          onSuccess: ({ success }) => {
            if (success) {
              showSnackbar(`کالا در لیست علاقه‌مندی‌ها ذخیره شد`);
            }
          },
        },
      );
    }
  };

  const moveProductToBasket = ({ variantId }) => {
    if (!user && !guestCartId) {
      router.push("/users/login");
      return;
    }

    setLoadingState({ variantId, action: "add" });
    setLoadingVariantId(variantId);

    addProductToCart(
      {
        guestCartId,
        variantId,
        fromNextCart: true,
      },
      {
        onSuccess: (res) => {
          console.log("res =>", res);

          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (res.success) {
            showSnackbar("کالا به سبد خرید اضافه شد");
          }
        },
        onSettled: () => {
          setLoadingState(null);
        },
      },
    );
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
                  {item?.quantity?.toLocaleString("fa-IR")}
                </div>
              </Link>
            </div>
            <div className={styles.product_infos_container}>
              {" "}
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
                              item?.quantity
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
                  <div
                    className={styles.next_cart_btn_container}
                    onClick={(e) =>
                      isNextCartItem
                        ? removeProductFromNextPurchase({
                            e,
                            variantId: item?.variant?.id,
                            removeAll: false,
                          })
                        : favoriteHandler(e)
                    }
                  >
                    <div className={styles.next_cart_btn}>
                      <div className={styles.next_cart_text_bg}>
                        {loadingState?.variantId === item?.variant?.id &&
                        loadingState?.action === "remove" ? (
                          <Spinner size={16} color="000" />
                        ) : (
                          <span className={styles.next_cart_text}>
                            حذف کالا
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.add_btn}
                    onClick={(e) =>
                      isNextCartItem
                        ? moveProductToBasket({
                            e,
                            variantId: item?.variant?.id,
                          })
                        : seeProductHandler(e)
                    }
                  >
                    {loadingState?.variantId === item?.variant?.id &&
                    loadingState?.action === "add" ? (
                      <Spinner size={16} color="rgb(237, 25, 68)" />
                    ) : (
                      <span className={styles.add_btn_text}>
                        {isNextCartItem ? "افزودن به سبد خرید" : "مشاهده کالا"}
                      </span>
                    )}
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
                        item?.quantity
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
      </div>
    </>
  );
}

export default NextCartMobileItem;
