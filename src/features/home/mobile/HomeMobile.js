import TopMegamenuBanner from "@/components/layout/header/sections/topMegamenuBanner/TopMegamenuBanner";
import IndexMobileHeader from "@/features/home/sections/indexMobileHeader/IndexMobileHeader";
import FooterMobile from "@/components/layout/footer/mobile/footerMobile/FooterMobile";
import HomeTopSlider from "@/features/home/sections/homeTopSlider/HomeTopSlider";
import HomeContent from "@/features/home/sections/homeContent/HomeContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";
import CircleLoading from "@/components/modules/circleLoading/CircleLoading";

import useHomePageData from "@/features/home/hooks/useHomePageData";

import styles from "./homeMobile.module.css";

export default function HomeMobile() {
  const { homeData, homeDataLoading } = useHomePageData();

  const homeSlider = homeData?.find(
    (widget) => widget.utm === "banner_slider_homepage_tab_all",
  );

  return (
    <div className="d-flex flex-column bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <TopMegamenuBanner />
        <IndexMobileHeader />
        <div className={styles.container}>
          <main className="d-flex flex-column flex-grow-1 bg-white">
            <div id="homepage_root_bg" className={styles.home_bg}>
              {homeDataLoading ? (
                <CircleLoading />
              ) : (
                <div className="position-relative">
                  <div className={styles.sticky_slider_container}>
                    <div className="w-100">
                      <HomeTopSlider
                        slides={homeSlider?.data?.items}
                        isLoading={homeDataLoading}
                      />
                    </div>
                  </div>
                  <div className={styles.content_children}>
                    <HomeContent homeData={homeData} isMobile={true} />
                  </div>
                </div>
              )}
            </div>
          </main>
          <FooterMobile />
        </div>
        <MenuMobile noShadowStyle activeMenu="خانه" />
      </div>
    </div>
  );
}
