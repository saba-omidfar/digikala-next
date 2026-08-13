import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import IncredibleTeasingContent from "@/features/incredible-offers-teasing/sections/incredibleTeasingContent/IncredibleTeasingContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function IncredibleTeasingMobileContent({ categoryId }) {
  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <MobileStickyHeader isIncredibleTeasing />
        <IncredibleTeasingContent categoryId={categoryId} isIncredibleTeasing />
        <MenuMobile noShadowStyle />
      </div>
    </div>
  );
}
