import Header from "@/components/layout/header/desktop/Header";
import ProductListing from "@/features/shared/sections/productListing/ProductListing";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function BrandDesktop() {
  return (
    <div className="h-100 d-flex align-items-center flex-column bg-white">
      <Header />
      <ProductListing desktopClassname="w-100 px-6 pt-6" />
      <Footer />
    </div>
  );
}
