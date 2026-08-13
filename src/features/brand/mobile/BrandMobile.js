import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import ProductListing from "@/features/shared/sections/productListing/ProductListing";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function BrandMobile() {
  return (
    <div className="h-100 d-flex align-items-center flex-column bg-white">
      <MobileStickyHeader isBrandPage />
      <ProductListing mobileClassname="w-100 px-5" />
      <MenuMobile />
    </div>
  );
}
