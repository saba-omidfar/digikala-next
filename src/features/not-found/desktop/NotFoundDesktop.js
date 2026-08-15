import Header from "@/components/layout/header/desktop/Header";
import NotFoundContent from "@/features/not-found/sections/notFoundContent/NotFoundContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function NotFoundDesktop() {
  return (
    <div className="h-100 d-flex flex-column bg-white align-items-center">
      <Header />
      <NotFoundContent />
      <Footer />
    </div>
  );
}
