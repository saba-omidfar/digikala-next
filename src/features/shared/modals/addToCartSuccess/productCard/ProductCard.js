import { useEffect, useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";

import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useCartContext } from "@/contexts/CartContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./productCard.module.css";

function ProductCard({ index, product, isLastIndex }) {
  let colorsRef = useRef();
  let sizesRef = useRef();
  const { user, guestCartId } = useUserContext();
  const [productThemes, setProductThemes] = useState([]);

  const {
    userCart,
    addProductToCart,
    removeProductFromCart,
    loadingVariantId,
    setLoadingVariantId,
  } = useCartContext();

  const { activeVariant } = useProductContext();

  const addProductToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingVariantId(product?.default_variant_id);

    addProductToCart(
      {
        guestCartId,
        productId: product?.id,
        variantId: product?.default_variant_id,
        quantity: 1,
      },
      {
        onSuccess: (res) => {
          if (!guestCartId && !user?._id && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }
        },
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const removeProductFromCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingVariantId(product?.default_variant_id);

    removeProductFromCart(
      {
        userId: user?._id,
        guestCartId,
        variantId: product?.default_variant_id,
        quantity: 1,
      },
      {
        onSettled: () => {
          setLoadingVariantId(null);
        },
      },
    );
  };

  const cartItem =
    userCart?.cart?.packages
      ?.flatMap((pkg) => pkg.cart_items || [])
      ?.find(
        (item) =>
          item.product.id === product?.id &&
          item.variant.id === product?.default_variant_id,
      ) || null;

  const productQuantity = cartItem?.quantity || 0;

  useEffect(() => {
    if (!product?.default_variant?.themes) return;

    const variantThemes = product?.variants?.flatMap((v) => v.themes);

    const productTheme = variantThemes.reduce((acc, theme) => {
      const { type, is_main, label, value } = theme;
      if (!acc[type]) {
        acc[type] = {
          is_main,
          label,
          type,
          values: [],
        };
      }

      const exists = acc[type]?.values?.some((x) => x.id === value.id);
      if (!exists) acc[type]?.values?.push(value);

      return acc;
    }, {});

    const sortedProductThemes = Object.values(productTheme)?.map((theme) => {
      theme.values.sort((a, b) => {
        const aOrder = a?.sort_order ?? 9999;
        const bOrder = b?.sort_order ?? 9999;
        return aOrder - bOrder;
      });
      return theme;
    });

    setProductThemes(Object.values(sortedProductThemes));
  }, [product]);

  colorsRef.current = productThemes?.find((theme) => theme.type === "colored");
  sizesRef.current = productThemes?.find((theme) => theme.type === "sized");

  const maxLimit = product?.default_variant?.price?.order_limit || Infinity;
  const isMaxReached = productQuantity === maxLimit;

  return (
    <div>
      <Link
        className={`${styles.product_link} ${isLastIndex ? "" : "border-bottom"}`}
        target="_blank"
        href={`/product/dkp-${product?.id}/`}
      >
        <div className="position-relative">
          <div
            className={styles.product_img_container}
            aria-hidden="true"
            aria-label=""
          >
            <img
              className={styles.product_img}
              src={product?.images?.main}
              alt={product?.title_fa}
              title={product?.title_fa}
            />
          </div>

          {/* Colors */}
          {productThemes?.find((theme) => theme.type === "colored")?.values
            ?.length > 3 ? (
            <div className={styles.product_colors_container}>
              <div className={styles.product_colors}>
                <div
                  className="d-flex flex-shrink-0"
                  style={{
                    width:
                      productThemes?.find((theme) => theme.type === "colored")
                        ?.values?.length > 2
                        ? "28px"
                        : "20px",
                  }}
                >
                  {productThemes
                    ?.find((theme) => theme.type === "colored")
                    ?.values?.slice(0, 3)
                    .map((color, index) => (
                      <div
                        key={color.variant_id}
                        className={styles.product_color}
                        style={{
                          backgroundColor: color.hex_code,
                          zIndex: { index },
                          transform: `translateX(${index * 4}px)`,
                        }}
                      ></div>
                    ))}
                </div>
                {productThemes?.find((theme) => theme.type === "colored")
                  ?.values?.length > 3 ? (
                  <div className={styles.more_colors_text}>
                    +
                    {toPersianDigits(
                      productThemes?.find((theme) => theme.type === "colored")
                        ?.values?.length - 3,
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Add To Cart Btn */}
          {productThemes?.find((theme) => theme.type === "colored")?.values
            ?.length === 1 || !productThemes?.length ? (
            <div className={styles.quantity_box_container}>
              <CartActionBox
                quantityBoxClassName={styles.quantity_box}
                iconClassName={styles.add_btn}
                showButton
                productQuantity={productQuantity}
                isMaxReached={isMaxReached}
                addProductToCartHandler={addProductToCartHandler}
                removeProductFromCartHandler={removeProductFromCartHandler}
                isLoading={loadingVariantId === product?.default_variant_id}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.infos_container}>
          <div className={styles.product_title}>{product?.title_fa}</div>
          <div className="d-flex align-items-center">
            <div
              aria-hidden="false"
              aria-label="امتیاز"
              className={styles.score_img_container}
            >
              <Image
                className={styles.score_img}
                src="/images/svg/pdp/star.svg"
                width={20}
                height={20}
                alt="امتیاز"
                title=""
              />
            </div>
            <p className={styles.score_text}>
              {toPersianDigits(
                Math.round((product?.rating?.rate / 100) * 5 * 10) / 10,
              )}
            </p>
          </div>
          {productThemes?.find((theme) => theme.type === "colored")?.values
            ?.length === 1 ? (
            <div className={styles.color_text}>
              <div>{`رنگ: ${
                productThemes?.find((theme) => theme.type === "colored")
                  ?.values[0]?.title
              }`}</div>

              {activeVariant?.size ? (
                <>
                  <div>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className="cube-font-icon"
                        data-icon-name="cube-content-dot"
                        data-icon=""
                      ></div>
                    </div>
                  </div>
                  <div>
                    {`سایز: ${
                      productThemes?.find((theme) => theme.type === "sized")
                        ?.values[0]?.title
                    }`}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {/* <div class="text-body-1-180 text-neutral-650 flex gap-1 items-center">
            <div></div>
            <div></div>
            <div></div>
          </div> */}
          <div className={styles.product_price_container}>
            {product?.price?.discount_percent !== 0 ? (
              <>
                <span className={styles.product_discount_container}>
                  <span className={styles.product_discount}>
                    {toPersianDigits(product?.price?.discount_percent)}٪
                  </span>
                </span>
                <span className={styles.original_price_container}>
                  <span className={styles.original_price}>
                    {(product?.price?.rrp_price / 10).toLocaleString("fa-IR")}
                  </span>
                </span>
              </>
            ) : (
              ""
            )}
            <span className={styles.product_price}>
              <span className={styles.product_price_text}>
                {(product?.price?.selling_price / 10).toLocaleString("fa-IR")}
              </span>
              <div className="d-flex" aria-hidden="false">
                <div
                  data-icon-name="cube-toman"
                  data-icon="&#xE953;"
                  className={`${styles.price_icon} cube-font-icon`}
                ></div>
              </div>
            </span>
          </div>
        </div>
      </Link>
      {index !== isLastIndex - 1 ? (
        <div className={styles.border_bottom}></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductCard;
