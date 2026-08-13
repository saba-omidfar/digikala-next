import { useState, useEffect } from "react";

import { usePopper } from "react-popper";

import SellerPopper from "@/features/product/sections/sellerPopper/SellerPopper";
import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";
import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import Spinner from "@/utils/Spinner";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import { getScoreClass, getScoreLabel } from "@/utils/getScoreClass";

import styles from "./sellerCard.module.css";

function SellerCard({ seller, index }) {
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);
  const [openSellerId, setOpenSellerId] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { isSmallScreen } = useScreenStatus();
  const { user, guestCartId } = useUserContext();
  const { productDetails } = useProductContext();
  const { userCart, isLoadingUserCart } = useCartContext();

  const {
    addProductToCart,
    removeProductFromCart,
    loadingVariantId,
    setLoadingVariantId,
  } = useCartContext();

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

  const handleAddToCartSuccess = () => {
    setShowAddToCartSuccess(true);
  };

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "left-start",

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
        {
          name: "flip",
          options: {
            fallbackPlacements: ["right-start", "bottom"],
          },
        },
      ],
    },
  );

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

  const maxLimit = seller?.price?.order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  const isTrusted = seller?.seller?.properties?.is_trusted;
  const isOfficial = seller?.seller?.properties?.is_official;

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess setShowAddToCartSuccess={setShowAddToCartSuccess} />
      )}
      <div
        className={`${styles.seller_list_item} ${
          index % 2 === 1 ? styles.seller_list_item_odd : ""
        }`}
      >
        <div
          className={`d-flex ${
            isSmallScreen ? "justify-content-center" : "justify-content-between"
          } align-items-center`}
        >
          <div className={styles.seller_list_infos}>
            <SellerPopper
              seller={seller}
              isSellerSection
              isOpenSellerPopper={openSellerId === seller?.id}
              setPopperElement={setPopperElement}
              popperStyles={popperStyles}
              attributes={attributes}
            />
            <div
              ref={setReferenceElement}
              className={styles.seller_list_properties}
              onMouseEnter={() => setOpenSellerId(seller?.id)}
              onMouseLeave={() => setOpenSellerId(null)}
            >
              {seller?.seller?.title === "دیجی‌کالا" ? (
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
                <>
                  <div className="position-relative">
                    <div className="d-flex" aria-hidden="false">
                      {seller?.seller?.title === "دیجی‌کالا" ? (
                        <div className={styles.digikala_icon_container}>
                          <div className="d-flex">
                            <div
                              data-icon-name="cube-badge-dk-smile"
                              data-icon="&#xE9E3;"
                              className={`${styles.digikala_icon_badge} cube-font-icon`}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <svg className={styles.seller_info_store_icon}>
                          <use href="#seller"></use>
                        </svg>
                      )}
                    </div>

                    {isOfficial && (
                      <div
                        className={`${styles.seller_icon_badge_container} ${isOfficial ? styles.is_official_badge : ""} ${isTrusted ? styles.is_trusted_badge : ""}`}
                        aria-hidden="false"
                      >
                        <svg
                          className={`${isOfficial ? styles.is_official_icon : ""} ${isTrusted ? styles.is_trusted_icon : ""}`}
                        >
                          <use href="#verifiedUser"></use>
                        </svg>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div style={{ marginRight: "16px" }}>
                <div className={styles.seller_list_title_container}>
                  <p className={styles.seller_list_title}>
                    {seller?.seller?.title}
                  </p>
                  {isOfficial && (
                    <div
                      className={`${styles.seller_badge_container} ${isOfficial ? styles.is_official_badge : ""}`}
                    >
                      <div className={styles.seller_badge}>
                        <p className={styles.seller_badge_text}>رسمی</p>
                      </div>
                    </div>
                  )}
                  {isTrusted && (
                    <div
                      className={`${styles.seller_badge_container} ${isTrusted ? styles.is_trusted_badge : ""}`}
                    >
                      <div className={styles.seller_badge}>
                        <p className={styles.seller_badge_text}>منتخب</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.seller_variant_statistics_container}>
                  {seller?.statistics?.total_rate && (
                    <div
                      className="d-flex align-items-center position-relative"
                      style={{ paddingLeft: "8px" }}
                    >
                      <p
                        className={`${
                          styles.seller_variant_statistics_totalRate
                        } ${getScoreClass(
                          seller?.statistics?.total_rate / 10,
                        )}`}
                      >
                        {seller?.statistics?.total_rate
                          ?.toLocaleString("fa-IR")
                          .replace("٫", ".")}
                        %
                      </p>
                      <p className={styles.seller_variant_statistics_text}>
                        رضایت از کالا
                      </p>
                    </div>
                  )}
                  <div
                    className="d-flex align-items-center"
                    style={{ paddingRight: "8px" }}
                  >
                    <p className={styles.seller_variant_performance}>عملکرد</p>
                    <p
                      className={`${
                        styles.seller_variant_performance_text
                      } ${getScoreLabel(seller?.seller?.grade?.label)}`}
                    >
                      {seller?.seller?.grade?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 0" }}>
              {seller?.shipment_methods?.providers?.map((method, index) => (
                <div key={index} className={styles.seller_shipment_method}>
                  <li className={styles.seller_shipment_method_description}>
                    {method?.type === "digikala" && (
                      <div className="d-flex">
                        <div
                          data-icon-name="cube-delivery-express"
                          data-icon="&#xE935;"
                          className={`${styles.jet_delivery_icon} cube-font-icon`}
                        ></div>
                      </div>
                    )}
                    {method?.type === "seller" && (
                      <div className="d-flex">
                        <div
                          data-icon-name="cube-delivery-express"
                          data-icon="&#xE97C;"
                          className={`${styles.jet_delivery_icon} cube-font-icon`}
                        ></div>
                      </div>
                    )}

                    <p className={styles.seller_shipment_method_text}>
                      {method?.title === "ارسال فروشنده"
                        ? "ارسال دیجی‌کالا از انبار فروشنده"
                        : method?.title}
                    </p>
                  </li>
                </div>
              ))}
            </div>
            <div className={styles.seller_warranty}>
              <div className={styles.seller_warranty_icon_container}>
                <div className="d-flex">
                  <div
                    className={`${styles.seller_warranty_icon} cube-font-icon`}
                    data-icon-name="cube-value-guarantee"
                    data-icon="&#xE918;"
                  ></div>
                </div>
              </div>
              <p className={styles.seller_warranty_title}>
                {seller?.warranty?.title_fa}
              </p>
            </div>
          </div>
          <div className={styles.seller_price_container}>
            <div style={{ marginLeft: "24px" }}>
              <div>
                <div className="d-flex align-items-center justify-content-start">
                  {seller?.price?.discount_percent !== 0 && (
                    <div className={styles.seller_selling_price_container}>
                      <span className={styles.seller_selling_price}>
                        {(seller?.price?.rrp_price / 10)?.toLocaleString(
                          "fa-IR",
                        )}
                      </span>
                    </div>
                  )}

                  <div className="d-flex align-items-center">
                    <span className={styles.seller_price}>
                      {(seller?.price?.selling_price / 10).toLocaleString(
                        "fa-IR",
                      )}
                    </span>
                    <div className="d-flex">
                      <div
                        className={`${styles.seller_price_icon} cube-font-icon`}
                        data-icon-name="cube-value-toman"
                        data-icon="&#xE953;"
                      ></div>
                    </div>
                  </div>
                  {seller?.price?.discount_percent !== 0 && (
                    <div className={styles.seller_discount_price_container}>
                      <span
                        className={styles.seller_discount_price}
                        id="price-discount-percent"
                      >
                        {seller?.price?.discount_percent?.toLocaleString(
                          "fa-IR",
                        )}
                        ٪
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {seller?.gifts?.length ? (
                <span className={styles.gift_container}>
                  هدیه
                  <div
                    className={styles.gift_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.gift_icon}>
                      <use href="#gift"></use>
                    </svg>
                  </div>
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.add_to_cart_btn_container}>
              {isLoadingUserCart ? (
                <Spinner size={16} color="rgb(237, 25, 68)" />
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
          </div>
        </div>
        {seller?.digiplus?.is_jet_eligible && (
          <div className={styles.plus_box_container}>
            <span className={styles.plus_box_title_container}>
              <div className={styles.plus_icon_container}>
                <div
                  data-icon-name="cube-close"
                  data-icon="&#xE9B4;"
                  className={`${styles.plus_icon} cube-font-icon`}
                ></div>
              </div>
              خدمات پلاس
            </span>
            <span className={styles.plus_box_text}>
              ارسال سریع برای شهر تهران و کرج (رایگان)
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default SellerCard;
