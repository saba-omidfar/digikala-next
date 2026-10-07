"use client";

import { useState } from "react";

import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import ProductBreadcrumb from "@/features/product/sections/breadcrumb/Breadcrumb";
import ProductReviewSection from "./productReviewSection/ProductReviewSection";
import MobileRecommendationProducts from "@/features/product/sections/mobileRecommendationProducts/MobileRecommendationProducts";
import AiVoicePlayer from "@/features/product/sections/aiVoicePlayer/AiVoicePlayer";
import Insurance from "@/features/product/sections/productDetails/buyBox/insurance/Insurance";
import ShippingToday from "@/features/product/sections/productDetails/shippingToday/ShippingToday";
import SellerBox from "./sellerBox/SellerBox";
import SizeBox from "./sizeBox/SizeBox";
import ColorBox from "./colorBox/ColorBox";
import SpecBox from "./specBox/SpecBox";
import ShippingBox from "./shippingBox/ShippingBox";
import RulesBox from "./rulesBox/RulesBox";

import shouldTruncate from "@/utils/shouldTruncate";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useProductContext } from "@/contexts/ProductContext";
import {
  useAddFavoriteProduct,
  useRemoveFavoriteProduct,
} from "@/features/profile/hooks/useLists";
import { useUserContext } from "@/contexts/UserContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./mobileSpec.module.css";

function MobileSpec() {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const { redirectToLogin } = useLoginRedirect();
  const { productDetails, suggestionProducts, activeVariant } =
    useProductContext();

  const { mutate: removeFavorite, isLoading: isLoadingRemoveFavorite } =
    useRemoveFavoriteProduct();
  const { mutate: addFavorite, isLoading: isLoadingAddFavorite } =
    useAddFavoriteProduct();

  const isFavorite = user?.favorite_products?.includes(
    String(productDetails?.id),
  );

  const [isExpandTilte, setIsExpandTilte] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  const handleAddToCartSuccess = () => {
    setShowAddToCartSuccess(true);
  };

  const favoriteHandler = () => {
    if (isLoadingAddFavorite || isLoadingRemoveFavorite) return;

    if (!user?.is_logged_in) {
      redirectToLogin();
      return;
    }

    if (isFavorite) {
      removeFavorite(productDetails.id);
    } else {
      addFavorite(productDetails?.id, {
        onSuccess: ({ success }) => {
          if (success) {
            showSnackbar("کالا به علاقه‌مندی‌ها اضافه شد");
          }
        },
      });
    }
  };

  const title = productDetails?.test_title_fa || productDetails?.title_fa;

  const isLong = shouldTruncate(title, 80);

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess setShowAddToCartSuccess={setShowAddToCartSuccess} />
      )}
      <div className={styles.mobile_spec_container}>
        <div className={styles.spec_btn_container}>
          <div className={styles.spec_btn}></div>
        </div>
        <div className={styles.spec_header_container}>
          <ProductBreadcrumb
            textColor="#81858b"
            textSize="12px"
            textWeight="normal"
            dividerCode="E9C2"
            textDecoration="underline"
          />
          <div
            className={styles.mobile_spec_icon_container}
            onClick={favoriteHandler}
          >
            <svg
              className={`${
                isFavorite ? styles.favorite_on_icon : styles.favorite_off_icon
              }`}
            >
              <use href={isFavorite ? "#favoriteOn" : "#favoriteOff"}></use>
            </svg>
          </div>
        </div>
        <div>
          <div className={styles.product_title_container}>
            {productDetails?.default_variant &&
            !Array.isArray(productDetails?.default_variant) ? (
              <div className="w-100">
                <h1
                  className={`${styles.product_title} ${!isExpandTilte ? "ellipsis ellipsis-2" : ""}`}
                >
                  {!isExpandTilte && title?.length > 122
                    ? title.slice(0, 122)
                    : title}
                  {!isExpandTilte && title?.length > 122 ? "..." : ""}

                  {!isExpandTilte && title?.length > 122 ? (
                    <button
                      className={styles.expand_btn}
                      onClick={() => setIsExpandTilte(true)}
                    >
                      <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                        <div className="d-flex" aria-hidden="false">
                          <div
                            className={`${styles.chevron_icon} cube-font-icon`}
                            data-icon-name="cube-nav-chevron-down"
                            data-icon=""
                          ></div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    ""
                  )}
                </h1>
                {productDetails?.title_en && (
                  <h2 className={styles.product_eng_title}>
                    {productDetails?.title_en}
                  </h2>
                )}
              </div>
            ) : (
              <div className={styles.out_of_stock_container}>
                <span className={styles.out_of_stock_title}>
                  محصول ناموجود است
                </span>
                <h1
                  className={`${styles.product_title} ${!isExpandTilte ? "ellipsis ellipsis-2" : ""}`}
                >
                  {!isExpandTilte && title?.length > 122
                    ? title.slice(0, 122)
                    : title}
                  {!isExpandTilte && title?.length > 122 ? "..." : ""}

                  {!isExpandTilte && title?.length > 122 ? (
                    <button
                      className={styles.out_of_stock_expand_btn}
                      onClick={() => setIsExpandTilte(true)}
                    >
                      <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                        <div className="d-flex" aria-hidden="false">
                          <div
                            className={`${styles.chevron_icon} cube-font-icon`}
                            data-icon-name="cube-nav-chevron-down"
                            data-icon=""
                          ></div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    ""
                  )}
                </h1>
              </div>
            )}
          </div>

          <ProductReviewSection />
        </div>

        <AiVoicePlayer />
        <ShippingToday />

        {activeVariant?.digiplus?.is_jet_eligibles ? (
          <div className={styles.shipping_today_container}>
            <div className={styles.shipping_today_icon_container}>
              <div className="d-flex">
                <div
                  className={`${styles.shipping_today_icon} cube-font-icon`}
                  data-icon-name="cube-shipping-today"
                  data-icon="&#xEA76;"
                ></div>
              </div>
              <span className={styles.shipping_today_text}>
                تحویل امروز{" "}
                <span className={styles.shipping_today_subtext}>
                  با ارسال سریع دیجی‌کالا
                </span>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}

        <hr className="line-1" />

        {activeVariant?.color || activeVariant?.size ? (
          <div id="pdp-variant" className={styles.variant_container}>
            <ColorBox />
            <SizeBox />
          </div>
        ) : (
          ""
        )}

        <hr className="line-1" />
        <SpecBox />

        <hr className="line-1" />
        {activeVariant?.insurance ? (
          <div className={styles.insurance_container}>
            <Insurance />
          </div>
        ) : (
          ""
        )}

        <hr className="line-8" />
        <SellerBox handleAddToCartSuccess={handleAddToCartSuccess} />

        {suggestionProducts?.length ? (
          <MobileRecommendationProducts data={suggestionProducts} />
        ) : (
          ""
        )}

        <hr className="line-8" />
        <ShippingBox />

        <hr className="line-8" />
        <RulesBox />
      </div>
    </>
  );
}

export default MobileSpec;
