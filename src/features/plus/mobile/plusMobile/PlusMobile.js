import PlusContent from "@/features/plus/sections/plusContent/PlusContent";
import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import TopMegamenuBanner from "@/components/layout/header/sections/topMegamenuBanner/TopMegamenuBanner";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import styles from "./plusMobile.module.css";

export default function PlusMobile() {
  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <MobileStickyHeader />
        <div className={styles.content}>
          <TopMegamenuBanner />
          <main className={styles.content_container}>
            <PlusContent />
          </main>
        </div>
        <MenuMobile />
      </div>
    </div>
  );
}
