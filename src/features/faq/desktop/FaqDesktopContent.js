"use client";

import Header from "@/components/layout/header/desktop/Header";
import FaqContent from "@/features/faq/sections/FaqContent";
import Footer from "@/components/layout/footer/desktop/Footer";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useFaqPage } from "@/features/faq/hooks/useFaqPage";
import { useGetUniversal } from "@/hooks/useGetUniversal";

export default function FaqDesktopContent({ categoryId, questionId }) {
  const faq = useFaqPage(categoryId, questionId);
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <>
      {faq?.showLoading && (
        <div className="cart_overlay">
          <div className="page_loading_container">
            <LoadingModal />
          </div>
        </div>
      )}
      <Header />
      <div
        className="d-flex align-items-center flex-column flex-shrink-0 flex-grow-1 bg-white"
        style={{ paddingTop: topMegaMenuBanners?.desktop?.length ? 168 : 108 }}
      >
        <FaqContent {...faq} />
      </div>
      <Footer />
    </>
  );
}
