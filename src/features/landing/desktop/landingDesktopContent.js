import Header from "@/components/layout/header/desktop/Header";
import LandingContent from "@/features/landing/sections/landingContent/LandingContent";
import Footer from "@/components/layout/footer/desktop/Footer";

export default function LandingDesktopContent({ id }) {
  return (
    <>
      <Header />
      <LandingContent id={id} />
      <Footer />
    </>
  );
}
