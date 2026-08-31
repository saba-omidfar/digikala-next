import Header from "@/components/layout/header/desktop/Header";
import MainContent from "@/features/main/sections/mainContent/MainContent";
import Footer from "@/components/layout/footer/desktop/Footer";

import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./mainDesktopContent.module.css";

export default function MainDesktopContent(props) {
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <div className="h-100 d-flex flex-column bg-white align-items-center">
      <Header />
      <div
        className={styles.container}
        style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
      >
        <MainContent {...props} />
      </div>
      <Footer />
    </div>
  );
}
