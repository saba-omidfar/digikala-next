import Header from "@/components/layout/header/desktop/Header";
import PrivacyContent from "@/features/page/pages/privacy/sections/privacyContent/PrivacyContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function PrivacyDesktopContent() {
  return (
    <div className="d-flex flex-column bg-white">
      <Header />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
