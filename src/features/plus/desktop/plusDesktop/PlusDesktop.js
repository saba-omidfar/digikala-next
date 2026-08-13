"use client";

import Header from "@/components/layout/header/desktop/Header";
import PlusContent from "@/features/plus/sections/plusContent/PlusContent";
import Footer from "@/components/layout/footer/desktop/Footer";

import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./plusDesktop.module.css";

export default function PlusDesktop() {
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <div className="h-100 d-flex align-items-center flex-column bg-white">
      <Header />
      <div
        className="d-flex align-items-center flex-column w-100 flex-shrink-0 flex-grow-1"
        style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
      >
        <div className={styles.content_container}>
          <PlusContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
