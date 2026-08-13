"use client";

import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import FaqContent from "@/features/faq/sections/FaqContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useFaqPage } from "@/features/faq/hooks/useFaqPage";

import styles from "./faqMobileContent.module.css";
import TopMegamenuBanner from "@/components/layout/header/sections/topMegamenuBanner/TopMegamenuBanner";

export default function FaqMobileContent({ categoryId, questionId }) {
  const faq = useFaqPage(categoryId, questionId);

  return (
    <>
      {faq?.showLoading && (
        <div className="cart_overlay">
          <div className="page_loading_container">
            <LoadingModal />
          </div>
        </div>
      )}

      <MobileStickyHeader />

      <div className={styles.container}>
        <TopMegamenuBanner />
        <FaqContent {...faq} />
      </div>

      <MenuMobile noShadowStyle />
    </>
  );
}
