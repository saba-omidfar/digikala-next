import Header from "@/components/layout/header/desktop/Header";
import IncredibleTeasingContent from "@/features/incredible-offers-teasing/sections/incredibleTeasingContent/IncredibleTeasingContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function IncredibleDesktopContent({ categoryId }) {
  return (
    <div className="h-100 d-flex flex-column bg-white align-items-center">
      <Header />
      <IncredibleTeasingContent categoryId={categoryId} isIncredibleTeasing />
      <Footer />
    </div>
  );
}
