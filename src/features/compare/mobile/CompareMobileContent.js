import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import CompareContent from "@/features/compare/sections/compareContent/CompareContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import styles from "./compareMobileContent.module.css";

export default function CompareMobileContent({ productIds }) {
  return (
    <>
      <MobileStickyHeader />
      <div className={styles.container}>
        <main className={styles.content}>
          <CompareContent
            productIds={productIds}
            maxLength={2}
            borderClassName={styles.br_list_vertical_no_padding_200}
            isSmallScreen
          />
        </main>
      </div>
      <MenuMobile noShadowStyle />
    </>
  );
}
