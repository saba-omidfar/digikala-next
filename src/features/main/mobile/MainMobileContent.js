import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import MainContent from "@/features/main/sections/mainContent/MainContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import styles from "./mainMobileContent.module.css";

export default function MainMobileContent(props) {
  return (
    <div className="d-flex flex-column bg-white">
      <MobileStickyHeader title={props?.data?.category?.title_fa} />
      <div className={styles.container}>
        <MainContent {...props} />
      </div>
      <MenuMobile noShadowStyle />
    </div>
  );
}
