import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import MobileContent from "@/features/best-selling/sections/mobileContent/MobileContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function BestSellingMobile() {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column flex-grow-1">
        <MobileStickyHeader hasNotSearchIcon isBestSellingPage />
        <MobileContent />
        <MenuMobile noShadowStyle />
      </div>
    </div>
  );
}
