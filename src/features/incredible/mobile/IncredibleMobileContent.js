import IncredibleContent from "@/features/incredible/sections/incredibleContent/IncredibleContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";
import MobileHeader from "@/features/incredible/sections/mobileHeader/MobileHeader";

export default function IncredibleMobileContent({ categoryId }) {
  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <MobileHeader />
        <IncredibleContent categoryId={categoryId} />
        <MenuMobile noShadowStyle />
      </div>
    </div>
  );
}
