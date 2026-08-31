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
import { useUserContext } from "@/contexts/UserContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./mobileSpec.module.css";

function MobileSpec() {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const { redirectToLogin } = useLoginRedirect();
  const {
    productDetails,
    suggestionProducts,
    activeVariant,
    addFavorite,
    isLoadingAddFavorite,
    removeFavorite,
    favotiteStatus,
    isLoadingFavoriteStatus,
  } = useProductContext();

  const [isExpandTilte, setIsExpandTilte] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);

  const handleAddToCartSuccess = () => {
    setShowAddToCartSuccess(true);
  };

  const favoriteHandler = () => {
    if (isLoadingFavoriteStatus || isLoadingAddFavorite) return;

    if (!user) {
      redirectToLogin();
      return;
    }

    if (favotiteStatus?.is_favorite) {
      removeFavorite({
        productId: productDetails?.id,
      });
    } else {
      addFavorite(
        {
          productId: productDetails?.id,
        },
        {
          onSuccess: ({ success }) => {
            if (success) {
              showSnackbar("کالا به علاقه‌مندی‌ها اضافه شد");
            }
          },
        },
      );
    }
  };

  const isLong = shouldTruncate(productDetails?.title_fa, 80);

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
                favotiteStatus?.is_favorite
                  ? styles.favorite_on_icon
                  : styles.favorite_off_icon
              }`}
            >
              <use
                href={
                  favotiteStatus?.is_favorite ? "#favoriteOn" : "#favoriteOff"
                }
              ></use>
            </svg>
          </div>
        </div>
        <div>
          <div className={styles.product_title_container}>
            <div className="w-100">
              <h1
                className={`${styles.product_title} ${!isExpandTilte ? "ellipsis ellipsis-2" : ""}`}
              >
                {!isExpandTilte && productDetails?.title_fa?.length > 80
                  ? productDetails?.title_fa.slice(0, 80)
                  : productDetails?.title_fa}
                {!isExpandTilte && productDetails?.title_fa?.length > 80
                  ? "..."
                  : ""}

                {!isExpandTilte && productDetails?.title_fa?.length > 80 ? (
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

        {/* کالاهای پیشنهادی */}
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
