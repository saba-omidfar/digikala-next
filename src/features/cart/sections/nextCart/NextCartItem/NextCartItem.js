"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";

import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import { useGetFavoriteStatus } from "@/hooks/useProduct";

import RelatedProductsModal from "@/features/cart/modals/relatedProductsModal/RelatedProductsModal";
import Spinner from "@/utils/Spinner";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./nextCartItem.module.css";

export default function NextCartItem({ product, variant, isNextCartItem }) {
  const { redirectToLogin } = useLoginRedirect();

  const [loadingState, setLoadingState] = useState(null);

  const { openModal } = useModal();
  const { user, guestCartId } = useUserContext();
  const { addProductToCart, removeFromNextCart, setLoadingVariantId } =
    useCartContext();

  const { data: favotiteStatus, isPending: isLoadingFavoriteStatus } =
    useGetFavoriteStatus({ productId: product?.id });

  const { removeFavorite, isPendingRemoveFavorite } = useProductContext();

  const handleLoginRedirect = () => {
    redirectToLogin();
  };

  const moveProductToBasket = ({ e, variantId }) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoadingFavoriteStatus || isPendingRemoveFavorite) return;

    if (!user && !guestCartId) {
      handleLoginRedirect();
      return;
    }

    setLoadingState({ variantId, action: "add" });

    addProductToCart(
      {
        guestCartId,
        variantId,
        fromNextCart: true,
      },
      {
        onSettled: () => {
          setLoadingVariantId(null);
          setLoadingState(null);
        },
      },
    );
  };

  const removeProductFromNextPurchase = ({ e, variantId, removeAll }) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user && !guestCartId) {
      handleLoginRedirect();
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
          setLoadingState(null);
        },
      },
    );
  };

  const seeProductHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(product?.url?.uri);
  };

  const seeRelatedProducts = (e) => {
    e.preventDefault();
    e.stopPropagation();

    openModal(<RelatedProductsModal productId={product?.id} />, {
      name: "related-products",
      className: "modal__related-products rounded-medium",
    });
  };

  const removeProductFromFavorites = ({ e, variantId }) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingState({ variantId, action: "remove" });
    setLoadingVariantId(variantId);

    if (favotiteStatus?.is_favorite) {
      removeFavorite(
        {
          productId: product?.id,
        },
        {
          onSettled: () => {
            setLoadingVariantId(null);
            setLoadingState(null);
          },
        },
      );
    }
  };

  return (
    <div>
      <Link
        className={styles.cart_item_link}
        href={`${product?.url?.uri}/?variant_id=${variant?.id}` || "#"}
        target="_blank"
      >
        <div className={styles.product_img_bg}>
          <div
            className={styles.product_img_container}
            aria-hidden="false"
            aria-label={product?.title_fa}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={product?.images?.main?.url?.[0]}
              />
              <source
                type="image/jpeg"
                srcSet={product?.images?.main?.url?.[0]}
              />
              <img
                className={styles.product_img}
                src={product?.images?.main?.url?.[0]}
                alt={product?.title_fa}
                title=""
              />
            </picture>
          </div>
        </div>

        <div className={styles.product_infos_container}>
          <span className={styles.product_title}>{product?.title_fa}</span>

          <div className={styles.amazing_badge_container}>
            {variant?.price?.badge ? (
              <div className={styles.amazing_badge}>
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.amazing_icon} cube-font-icon`}
                    data-icon-name="cube-badge-amazing"
                    data-icon=""
                    style={{ color: variant?.price?.badge?.color }}
                  />
                </div>

                <span
                  className={styles.amazing_text}
                  style={{ color: variant?.price?.badge?.color }}
                >
                  {variant?.price?.badge?.title}
                </span>
              </div>
            ) : null}
          </div>

          {product?.default_variant ? (
            <div className={styles.product_price_container}>
              <div className={styles.product_price}>
                {product?.default_variant?.price?.discount_percent !== 0 ? (
                  <div className={styles.old_price_container}>
                    <div className={styles.old_price}>
                      <div className={styles.discount_badge}>
                        <div className="d-flex align-items-center">
                          <span className={styles.discount_percent}>%</span>
                          <span className={styles.discount_text}>
                            {product?.default_variant?.price?.discount_percent?.toLocaleString(
                              "fa-IR",
                            )}
                          </span>
                        </div>
                      </div>

                      <div className={styles.old_price_text_container}>
                        <span className={styles.old_price_text}>
                          {(
                            product?.default_variant?.price?.rrp_price / 10
                          )?.toLocaleString("fa-IR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className={styles.new_price_container}>
                  <div className={styles.new_price}>
                    <span className={styles.new_price_text}>
                      {(
                        product?.default_variant?.price?.selling_price / 10
                      )?.toLocaleString("fa-IR")}
                    </span>

                    <div className="d-flex">
                      <svg className={styles.price_icon}>
                        <use href="#toman"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span className={styles.out_of_box_text}>ناموجود</span>
          )}

          <div className={styles.btns_container}>
            <div
              className={`${styles.btn} ${styles.delete_btn}`}
              onClick={(e) =>
                isNextCartItem
                  ? removeProductFromNextPurchase({
                      e,
                      variantId: variant?.id,
                      removeAll: false,
                    })
                  : removeProductFromFavorites({
                      e,
                      variantId: variant?.id,
                    })
              }
            >
              {loadingState?.variantId === variant?.id &&
              loadingState?.action === "remove" ? (
                <Spinner size={16} color="#000" />
              ) : (
                <span
                  className={`${styles.btn_text} ${styles.delete_btn_text}`}
                >
                  حذف
                </span>
              )}
            </div>

            <div
              className={styles.mobile_delete_btn}
              aria-hidden="false"
              onClick={(e) =>
                isNextCartItem
                  ? moveProductToBasket({
                      e,
                      variantId: variant?.id,
                    })
                  : seeProductHandler(e)
              }
            >
              <div
                className={`${styles.mobile_delete_btn_icon} cube-font-icon`}
                data-icon-name="cube-action-delete"
                data-icon=""
              />
            </div>

            <div
              className={`${styles.btn} ${styles.add_btn}`}
              onClick={(e) =>
                isNextCartItem
                  ? moveProductToBasket({
                      e,
                      variantId: variant?.id,
                    })
                  : product?.default_variant
                    ? seeProductHandler(e)
                    : seeRelatedProducts(e)
              }
            >
              {loadingState?.variantId === variant?.id &&
              loadingState?.action === "add" ? (
                <Spinner size={16} color="rgb(237, 25, 68)" />
              ) : (
                <span className={`${styles.btn_text} ${styles.add_btn_text}`}>
                  {isNextCartItem
                    ? "افزودن به سبد"
                    : product?.default_variant
                      ? "مشاهده کالا"
                      : "کالاهای مشابه"}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
