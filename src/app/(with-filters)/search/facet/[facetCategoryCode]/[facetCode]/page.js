import ProductListing from "@/features/shared/sections/productListing/ProductListing";

export default function page() {
  return (
    <ProductListing
      isFacetPage
      desktopClassname="w-100 px-6 pt-6"
      mobileClassname="w-100 px-5"
      mobileNavClassname="py-2"
      desktopNavClassname="py-2"
    />
  );
}
