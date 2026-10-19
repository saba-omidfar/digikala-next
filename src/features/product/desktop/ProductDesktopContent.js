"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";

import { ScrollTrigger } from "@/lib/gsap";

import Header from "@/components/layout/header/desktop/Header";
import CategoryBreadcrumb from "@/components/modules/categoryBreadcrumb/CategoryBreadcrumb";
import MiddleFooter from "@/features/product/sections/middleFooter/MiddleFooter";
import Sellers from "@/features/product/sections/sellers/Sellers";
import RecommendationProducts from "@/features/product/sections/recommendationProducts/RecommendationProducts";
import Tabs from "@/features/product/sections/tabs/Tabs";
import ProductContent from "@/features/product/sections/productContent/ProductContent";
import MiniBuyBoxSticky from "@/features/product/sections/miniBuyBoxSticky/MiniBuyBoxSticky";
import DisabledProduct from "@/features/product/sections/disabledProduct/DisabledProduct";
import Footer from "@/components/layout/footer/desktop/Footer";

import InfoSectionRight from "@/features/product/sections/productDetails/InfoSectionRight";
import InfoSectionLeft from "@/features/product/sections/productDetails/InfoSectionLeft";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useProductContext } from "@/contexts/ProductContext";
import {
  useGetProductDetails,
  useProductRecommendation,
} from "@/hooks/useProduct";

import styles from "./productDesktopContent.module.css";

export default function ProductDesktopContent({ productId }) {
  const { uniqueVariants, suggestionProducts } = useProductContext();

  const { data: productDetails, isLoading: isLoadingProductDetails } =
    useGetProductDetails(productId);

  const similarProductsRef = useRef(null);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [showSimilarProductsTitle, setShowSimilarProductsTitle] =
    useState(false);

  const { data: similarProducts } = useProductRecommendation(
    productDetails?.id,
    0,
  );

  const { data: alsoBought } = useProductRecommendation(productDetails?.id, 1);

  useEffect(() => {
    if (!similarProductsRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: similarProductsRef.current,
      start: "top",
      onEnter: () => setShowSimilarProductsTitle(true),
      onLeaveBack: () => setShowSimilarProductsTitle(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const tabsTrigger = ScrollTrigger.create({
      trigger: "#TABS",
      start: "top 50%",
      onEnter: () => setIsTabsSticky(true),
      onLeaveBack: () => setIsTabsSticky(false),
    });

    return () => tabsTrigger.kill();
  }, []);

  if (isLoadingProductDetails) {
    return (
      <div className="cart_overlay">
        <div className="page_loading_container">
          <LoadingModal />
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center flex-column h-100 bg-white">
      <Header />
      <div
        className="flex-grow-1 bg-white d-flex flex-column w-100 align-items-center flex-shrink-0 user-select-none"
        style={{
          paddingTop: isTabsSticky ? 148 : 124,
        }}
      >
        <div className={styles.content_container}>
          {productDetails?.is_inactive ? (
            <DisabledProduct />
          ) : (
            <>
              <div className={styles.content}>
                <div className={styles.breadcrumb_container}>
                  <CategoryBreadcrumb />
                </div>
                <div className={styles.productDetails_container}>
                  <InfoSectionRight />
                  <InfoSectionLeft />
                </div>
              </div>

              <MiddleFooter />

              {/* کالاهای پیشنهادی */}
              {suggestionProducts?.length ? (
                <RecommendationProducts data={suggestionProducts} />
              ) : (
                ""
              )}

              {uniqueVariants?.length > 1 ? (
                <Sellers sellers={uniqueVariants} />
              ) : (
                ""
              )}

              {/* کالاهای مشابه */}
              <RecommendationProducts data={similarProducts} />

              <Tabs isTabsSticky={isTabsSticky} />

              <div className="d-flex w-100 px-3">
                <ProductContent />
                <MiniBuyBoxSticky />
              </div>

              {/* Also Bought Products */}
              <RecommendationProducts data={alsoBought} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
