"use client";

import Header from "@/components/layout/header/desktop/Header";
import HomeContent from "@/features/home/sections/homeContent/HomeContent";
import Footer from "@/components/layout/footer/desktop/Footer";
import CircleLoading from "@/components/modules/circleLoading/CircleLoading";

import useHomePageData from "@/features/home/hooks/useHomePageData";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./homeDesktop.module.css";

function HomeDesktop() {
  const { data: topMegaMenuBanners } = useGetUniversal();
  const { homeData, homeDataLoading } = useHomePageData();

  return (
    <div className="h-100 flex flex-column bg-white align-items-center">
      <Header />
      <div
        className={styles.content}
        style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
      >
        <main className={styles.content_full_width}>
          <div className={styles.container}>
            {homeDataLoading ? (
              <CircleLoading />
            ) : (
              <div className="position-relative">
                <div className={styles.content_container}>
                  <HomeContent homeData={homeData} isMobile={false} />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default HomeDesktop;
