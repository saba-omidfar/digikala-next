import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import NotFoundContent from "@/features/not-found/sections/notFoundContent/NotFoundContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function NotFoundMobile() {
  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <MobileStickyHeader />
        <NotFoundContent />
        <MenuMobile className="mt-4" />
      </div>
    </div>
  );
}
