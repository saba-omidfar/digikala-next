import ProductListing from "@/features/shared/sections/productListing/ProductListing";

export default function SearchPage() {
  return (
    <ProductListing
      desktopClassname="w-100 px-6 pt-6"
      mobileClassname="w-100 px-5"
      desktopNavClassname="py-5"
      mobileNavClassname="py-2"
    />
  );
}
