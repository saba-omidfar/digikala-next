import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import ProductListing from "@/features/shared/sections/productListing/ProductListing";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import { useListing } from "@/contexts/ListingContext";

export default function TagsMobile() {
  const { data } = useListing();

  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <MobileStickyHeader title={data?.tag?.name} />
        <ProductListing mobileClassname="w-100 px-5" />
        <MenuMobile noShadowStyle />
      </div>
    </div>
  );
}
