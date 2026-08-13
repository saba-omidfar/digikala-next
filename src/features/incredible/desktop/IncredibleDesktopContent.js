import Header from "@/components/layout/header/desktop/Header";
import IncredibleContent from "@/features/incredible/sections/incredibleContent/IncredibleContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function IncredibleDesktopContent({ categoryId }) {
  return (
    <>
      <Header />
      <IncredibleContent categoryId={categoryId} />
      <Footer />
    </>
  );
}
