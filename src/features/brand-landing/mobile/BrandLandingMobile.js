import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import BrandLandingContent from "@/features/brand-landing/sections/BrandLandingContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import styles from "./brandLandingMobile.module.css";

export default function BrandLandingMobile() {
  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1 w-100">
        <div className={styles.container}>
          <MobileStickyHeader hasNotSearchIcon />
          <BrandLandingContent />
          <MenuMobile noShadowStyle />
        </div>
      </div>
    </div>
  );
}
