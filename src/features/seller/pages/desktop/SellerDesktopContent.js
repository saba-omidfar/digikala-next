import Header from "@/components/layout/header/desktop/Header";
import ProductListing from "@/features/shared/sections/productListing/ProductListing";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function SellerDesktopContent() {
  return (
    <>
      <Header />
      <ProductListing desktopClassname="w-100 px-6 pt-6" />
      <Footer />
    </>
  );
}
