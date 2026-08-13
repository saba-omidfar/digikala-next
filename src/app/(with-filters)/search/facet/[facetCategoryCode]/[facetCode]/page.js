import ProductListing from "@/features/shared/sections/productListing/ProductListing";

export default function page() {
  return (
    <ProductListing
      desktopClassname="w-100 px-6 pt-6"
      mobileClassname="w-100 px-5"
      desktopNavClassname="py-2"
    />
  );
}
