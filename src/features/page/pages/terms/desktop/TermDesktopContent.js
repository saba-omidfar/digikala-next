import Header from "@/components/layout/header/desktop/Header";
import TermsContent from "@/features/page/pages/terms/sections/termsContent/TermsContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function TermsDesktopContent() {
  return (
    <div className="d-flex flex-column bg-white">
      <Header />
      <TermsContent />
      <Footer />
    </div>
  );
}
