import ProductListing from "@/features/shared/sections/productListing/ProductListing";

function page() {
  return (
    <ProductListing
      desktopClassname="w-100 px-5"
      mobileClassname="w-100 px-5"
      desktopNavClassname="py-5"
      mobileNavClassname="py-2"
    />
  );
}

export default page;
