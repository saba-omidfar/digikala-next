import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ShipmentModal from "@/features/product/modals/shipmentModal/ShipmentModal";
import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";
import ProductPriceBox from "@/features/cart/sections/productPriceBox/ProductPriceBox";
import Loading from "@/components/modules/loading/Loading";

import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";
import { getScoreClass, getScoreLabel } from "@/utils/getScoreClass";

import styles from "./sellerCard.module.css";

const shippingModes = {
  jet: {
    icon: "deliveryToday",
    class: styles.modal_jet_delivery_icon,
  },
  seller: {
    icon: "deliveryInPerson",
    class: styles.modal_seller_delivery_icon,
  },
  digikala: {
    icon: "deliveryExpress",
    class: styles.modal_digikala_delivery_icon,
  },
};

function SellerCard({ seller, isShowSellersModal, handleAddToCartSuccess }) {
  const router = useRouter();
  const { openModal, openMobileModal, closeMobileModal } = useModal();
  const { user, guestCartId } = useUserContext();
  const { productDetails, activeVariant } = useProductContext();
  const {
    userCart,
    isLoadingUserCart,
    addProductToCart,
    removeProductFromCart,
    loadingVariantId,
    setLoadingVariantId,
  } = useCartContext();

  const [productQuantity, setProductQuantity] = useState(0);

  const addProductToCartHandler = () => {
    setLoadingVariantId(seller.id);

    addProductToCart(
      {
        guestCartId,
        productId: productDetails?.id,
        variantId: seller?.id,
        quantity: 1,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (productQuantity === 0) {
            closeMobileModal();
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
    setLoadingVariantId(seller.id);

    removeProductFromCart(
      {
        guestCartId,
        variantId: seller?.id,
        quantity: 1,
      },
      {
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  useEffect(() => {
    if (userCart && seller?.id) {
      const cartItem = userCart?.cart?.packages
        .flatMap((pkg) => pkg.cart_items || [])
        ?.find(
          (item) =>
            item.product.id === productDetails?.id &&
            Number(item.variant?.id) === Number(seller?.id),
        );

      setProductQuantity(cartItem?.quantity || 0);
    }
  }, [userCart, productDetails?.id, seller?.id]);

  const maxLimit = seller?.price?.min_order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  const showSellerDetails = (code) => {
    router.push(`/seller/${code}`);
  };

  return (
    <div className={styles.seller_card_container}>
      <div className="d-flex flex-column w-100">
        <div className={styles.seller_card_title_container}>
          <span className={styles.seller_title}>فروشنده</span>
          {activeVariant.id === seller.id ? (
            <span className={styles.seller_subtitle}>
              شما در حال خرید از این فروشنده هستید
            </span>
          ) : (
            ""
          )}
        </div>
        <div className={styles.seller_row_container}>
          <div className={styles.seller_row_icon_container}>
            {seller?.seller?.title === "دیجی‌کالا" ? (
              <div className={styles.seller_row_digikala_icon_bg}>
                <div
                  data-icon-name="cube-badge-dk-smile"
                  data-icon="&#xE9E3;"
                  className={`${styles.seller_row_digikala_icon} cube-font-icon`}
                ></div>
              </div>
            ) : (
              <div className={styles.seller_row_icon_bg}>
                <div
                  data-icon-name="cube-shop-seller"
                  data-icon="&#xE920;"
                  className={`${styles.seller_row_icon} cube-font-icon`}
                ></div>
              </div>
            )}
            {seller?.seller?.properties?.is_trusted && (
              <div className={styles.seller_row_badge}>
                <div
                  data-icon-name="cube-badge-verified"
                  data-icon="&#xE989;"
                  className={`${styles.seller_row_verified_icon} cube-font-icon`}
                ></div>
              </div>
            )}
          </div>
          <div
            className={styles.seller_row_info_container}
            onClick={() => showSellerDetails(seller?.seller?.code)}
          >
            <div className="d-flex justify-content-start align-items-center">
              <span className={styles.seller_name}>
                {seller?.seller?.title}
              </span>
              <div className="d-flex" aria-hidden="false">
                <div
                  data-icon-name="cube-nav-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.nav_icon} cube-font-icon`}
                ></div>
              </div>
              {seller?.seller?.properties?.is_trusted && (
                <span
                  className={`${styles.seller_badge} ${
                    styles.seller_trusted_text
                  }`}
                >
                  منتخب
                </span>
              )}
              {seller?.seller?.properties?.is_official && (
                <span
                  className={`${styles.seller_badge} ${styles.seller_official_text}`}
                >
                  رسمی
                </span>
              )}
            </div>
            <div className={styles.seller_satisfied_container}>
              {seller?.rate ? (
                <div className={styles.seller_satisfied_title}>
                  رضایت از کالا
                  <span
                    className={styles.seller_satisfied_percent}
                    style={{
                      backgroundColor: seller?.rate
                        ? `var(--${getScoreClass(
                            Math.round(seller?.rate / 10),
                          )})`
                        : "",
                    }}
                  >
                    {toPersianDigits(seller?.rate)}٪
                  </span>
                </div>
              ) : (
                ""
              )}
              {seller?.seller?.grade && (
                <div className={styles.seller_performance_title}>
                  عملکرد
                  <span
                    className={styles.seller_performance_text}
                    style={{
                      backgroundColor: seller?.seller?.grade
                        ? `var(--${getScoreLabel(
                            seller?.seller?.grade?.label,
                          )})`
                        : "",
                    }}
                  >
                    {seller?.seller?.grade?.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.seller_row_container}>
          <div className={styles.seller_row_icon_container}>
            <div className={styles.seller_row_icon_bg}>
              <div
                data-icon-name="cube-value-guarantee"
                data-icon="&#xE918;"
                className={`${styles.seller_row_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
          <div className={styles.seller_row_info_container}>
            <div className="d-flex justify-content-start align-items-center">
              <span className={styles.seller_guarantee_text}>
                {toPersianDigits(seller?.warranty?.title_fa)}
              </span>
            </div>
          </div>
        </div>
        <div
          className={styles.seller_row_container}
          onClick={() =>
            openModal(
              <ShipmentModal
                shippingModes={shippingModes}
                shipmentMethods={seller?.shipment_methods}
              />,
              { name: "shipment", className: "rounded-medium" },
            )
          }
        >
          <div className={styles.seller_row_icon_container}>
            <div className={styles.seller_row_icon_bg}>
              <div
                data-icon-name="cube-shop-product-available"
                data-icon="&#xE98C;"
                className={`${styles.seller_row_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
          <div className={styles.seller_row_info_container}>
            <div className="d-flex justify-content-between align-items-center">
              <span className={styles.seller_delivery_text}>
                روش‌ها و هزینه‌های ارسال
              </span>
              <div className="d-flex">
                <div
                  data-icon-name="cube-nav-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.chevron_left_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <ul>
              {seller?.shipment_methods?.providers?.map((method, index) => {
                const currentMode =
                  shippingModes[method?.type] || shippingModes.digikala;

                return (
                  <li key={index} className={styles.seller_delivery_box}>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={currentMode.class}>
                        <use href={`#${currentMode.icon}`}></use>
                      </svg>
                    </div>
                    <div className={styles.seller_delivery_title_container}>
                      <span className={styles.seller_delivery_title}>
                        {method?.label?.title}
                      </span>
                      {method?.price ? (
                        <span className={styles.method_price_text_container}>
                          <span className={styles.bulet_icon}>•</span>
                          <div style={{ display: "contents" }}>
                            {method?.price?.value ? (
                              <div className={styles.method_price_value}>
                                {(method?.price?.value / 10)?.toLocaleString(
                                  "fa-IR",
                                )}
                                <div
                                  className={styles.price_icon_container}
                                  aria-hidden="false"
                                >
                                  <svg className={styles.price_icon}>
                                    <use href="#toman"></use>
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {method?.price?.text ? (
                              <div
                                className={
                                  styles.modal_content_list_item_title_subText
                                }
                              >
                                {toPersianDigits(method?.price?.text)}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {seller?.price?.is_locked_for_digiplus ? (
          <div className={styles.seller_row_container}>
            <div className={styles.seller_row_icon_container}>
              <div className={styles.seller_row_icon_bg}>
                <div
                  data-icon-name="cube-badge-plus"
                  data-icon="&#xE9B4;"
                  className={`${styles.seller_row_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.seller_row_info_container}>
              <div className="d-flex justify-content-start align-items-center">
                <span className={styles.seller_plus_text}>ویژه اعضای پلاس</span>
              </div>
              <ul>
                {seller?.digiplus?.is_jet_eligible ? (
                  <li className={styles.seller_plus_box}>
                    <p className={styles.seller_plus_subtext}>
                      ارسال سریع و رایگان دیجی‌کالا (فقط تهران و کرج)
                    </p>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={styles.seller_row_container}
          onClick={() => openMobileModal("digiclub")}
        >
          <div className={styles.seller_row_icon_container}>
            <div className={styles.seller_row_icon_bg}>
              <div
                data-icon-name="cube-badge-club-coin"
                data-icon="&#xE960;"
                className={`${styles.seller_row_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
          <div className={styles.seller_row_info_container}>
            <div className="d-flex justify-content-between align-items-center">
              {seller?.digiclub?.point ? (
                <span className={styles.seller_digiclub_text}>
                  {toPersianDigits(seller?.digiclub?.point)} امتیاز دیجی‌کلاب
                  دریافت می‌کنید
                </span>
              ) : (
                ""
              )}
              <div className="d-flex">
                <div
                  data-icon-name="cube-nav-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.chevron_left_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.product_quantity__box_container}>
        <div
          className={`${styles.add_to_cart_btn_container} ${isShowSellersModal ? styles.add_to_cart_btn_width : ""}`}
        >
          {isLoadingUserCart ? (
            <Loading isSmall />
          ) : (
            <CartActionBox
              quantityBoxClassName={styles.quantity_box}
              productQuantity={productQuantity}
              isMaxReached={isMaxReached}
              addProductToCartHandler={() =>
                addProductToCartHandler({
                  variantId: seller?.id,
                })
              }
              removeProductFromCartHandler={() =>
                removeProductFromCartHandler({
                  variantId: seller?.id,
                  removeFromNextPurchase: false,
                })
              }
              isLoading={loadingVariantId === seller?.id}
              sellerVariantId={seller?.id}
            />
          )}
        </div>
        <ProductPriceBox price={seller?.price} isShowSellersModal />
      </div>
    </div>
  );
}
export default SellerCard;
