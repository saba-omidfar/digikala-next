import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import ProductListing from "@/features/shared/sections/productListing/ProductListing";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function SellerMobileContent() {
  return (
    <>
      <div className="d-flex flex-column bg-white">
        <div className="d-flex flex-column flex-grow-1">
          <MobileStickyHeader />
          <ProductListing mobileClassname="w-100 px-5" />
          <MenuMobile noShadowStyle />
        </div>
      </div>
    </>
  );
}
