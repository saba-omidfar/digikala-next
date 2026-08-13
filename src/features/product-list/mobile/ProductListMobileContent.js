import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import ProductListing from "@/features/shared/sections/productListing/ProductListing";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function ProductListMobileContent() {
  return (
    <>
      <MobileStickyHeader />
      <ProductListing mobileClassname="w-100 px-5" />
      <MenuMobile />
    </>
  );
}
