"use client";

import { useState } from "react";

import DisabledProduct from "@/features/product/sections/disabledProduct/DisabledProduct";
import GalleryMobile from "@/features/product/sections/gallery/GalleryMobile";
import StickyTabs from "@/features/product/sections/stickyTabs/StickyTabs";
import Header from "@/features/product/sections/header/Header";
import MobileSpec from "@/features/product/sections/mobileSpec/MobileSpec";
import MobileSellerRecommendation from "@/features/product/sections/productContent/mobileSellerRecommendation/MobileSellerRecommendation";
import SearchBoxClick from "@/features/product/sections/searchBoxClick/SearchBoxClick";
import Review from "@/features/product/sections/review/Review";
import CommentQuestionSection from "@/features/product/sections/commentQuestionSection/CommentQuestionSection";
import MobileBreadcrumb from "@/components/modules/mobileBreadcrumb/MobileBreadcrumb";
import StickyMobileFooter from "@/features/product/sections/stickyMobileFooter/StickyMobileFooter";
import StickyPromoBanner from "@/features/product/sections/stickyPromoBanner/StickyPromoBanner";
import Dkp from "@/features/product/sections/dkp/Dkp";
import Suggestion from "@/features/product/sections/suggestion/Suggestion";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./productMobileContent.module.css";

export default function ProductMobileContent() {
  const { productDetails } = useProductContext();

  const [showSearchBox, setShowSearchBox] = useState(false);

  return (
    <div className="d-flex flex-column flex-grow-1" aria-hidden="true">
      <div className={styles.base_layout__content}>
        {productDetails?.is_inactive ? (
          <DisabledProduct />
        ) : (
          <div className={styles.base_layout__container}>
            <div className={styles.header}>
              <StickyTabs />
              <Header />
              <SearchBoxClick
                showSearchBox={showSearchBox}
                setShowSearchBox={setShowSearchBox}
              />
            </div>
            <div id="gallery" className={styles.gallery_container}>
              <MobileBreadcrumb />
              <div className={styles.gallery_content}>
                <div className="position-relative bg-white">
                  <GalleryMobile />
                </div>
              </div>
            </div>
            <div id="content" className={styles.content_container}>
              <section id="SPEC">
                <StickyPromoBanner />
                <MobileSpec />
              </section>
              <Review />
              <CommentQuestionSection />
              <MobileSellerRecommendation />

              <Suggestion />
              <Dkp />
            </div>
            <StickyMobileFooter />
          </div>
        )}
      </div>
    </div>
  );
}
