import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import LandingContent from "@/features/landing/sections/landingContent/LandingContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

export default function LandingMobileContent({ id }) {
  return (
    <>
      <MobileStickyHeader />
      <LandingContent id={id} />
      <MenuMobile noShadowStyle />
    </>
  );
}
