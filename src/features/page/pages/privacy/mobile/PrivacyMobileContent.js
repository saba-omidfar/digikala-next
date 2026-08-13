import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import PrivacyContent from "@/features/page/pages/privacy/sections/privacyContent/PrivacyContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function PrivacyMobileContent() {
  return (
    <div className="d-flex flex-column bg-white">
      <MobileStickyHeader />
      <PrivacyContent />
      <MenuMobile noShadowStyle />
    </div>
  );
}
