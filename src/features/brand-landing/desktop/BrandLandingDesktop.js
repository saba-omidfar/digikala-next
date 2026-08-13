import Header from "@/components/layout/header/desktop/Header";
import BrandLandingContent from "@/features/brand-landing/sections/BrandLandingContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function BrandLandingDesktop() {
  return (
    <>
      <div className="h-100 d-flex flex-column bg-white align-items-center">
        <Header isBrandLandingPage />
        <BrandLandingContent />
        <Footer />
      </div>
    </>
  );
}
