import Header from "@/components/layout/header/desktop/Header";
import DesktopContent from "@/features/best-selling/sections/desktopContent/DesktopContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function BestSellingDesktop() {
  return (
    <div className="h-100 d-flex align-items-center flex-column bg-white">
      <Header isBestSellingPage />
      <DesktopContent />
      <Footer />
    </div>
  );
}
