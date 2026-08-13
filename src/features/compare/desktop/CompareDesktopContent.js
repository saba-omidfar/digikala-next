import Header from "@/components/layout/header/desktop/Header";
import CompareContent from "@/features/compare/sections/compareContent/CompareContent";
import Footer from "@/components/layout/footer/desktop/Footer";

import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./compareDesktopContent.module.css";

export default function CompareDesktopContent({ productIds }) {
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <>
      <Header />
      <div
        className={styles.container}
        style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
      >
        <main className={styles.content}>
          <CompareContent productIds={productIds} maxLength={4} />
        </main>
      </div>
      <Footer />
    </>
  );
}
