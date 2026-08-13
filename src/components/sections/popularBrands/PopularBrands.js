import Image from "next/image";

import MobilePopularBrands from "./MobilePopularBrands";
import DesktopPopularBrands from "./DesktopPopularBrands";
import Divider from "@/features/home/sections/divider/Divider";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./popularBrands.module.css";

function PopularBrands({
  icon,
  title,
  brands,
  isMainPage,
  isHomePage,
  isLandingPage,
  borderColor,
}) {
  const { isSmallScreen } = useScreenStatus();

  return (
    <>
      <div
        className={`${isLandingPage ? styles.landing_content : styles.content} ${styles.slider}`}
      >
        <div
          className={`${isLandingPage ? styles.landing_brands_container : styles.brands_container}`}
          style={{
            borderColor: borderColor ? borderColor : "#e0e0e2",
            backgroundColor: isLandingPage ? "transparent" : "#fff",
          }}
        >
          <div
            className={`${isHomePage ? styles.index_section_title_container : ""} ${isMainPage ? styles?.main_section_title_container : ""}`}
          >
            {title ? (
              <div
                className={`d-flex align-items-center ${!isSmallScreen ? "justify-content-center" : ""}`}
              >
                <div className={styles.brand_icon_container}>
                  <div className={styles.icon_container}>
                    {isHomePage && isSmallScreen ? (
                      <Image
                        src={icon}
                        width={24}
                        height={24}
                        className={styles.icon}
                        alt=""
                      />
                    ) : (
                      <svg className={styles.brand_icon}>
                        <use href="#topBrands"></use>
                      </svg>
                    )}
                  </div>
                </div>
                <h3
                  className={`${isMainPage ? styles.main_section_title : ""} ${isHomePage ? styles.index_section_title : ""}`}
                >
                  {title}
                </h3>
              </div>
            ) : (
              ""
            )}
          </div>
          {isHomePage ? (
            isSmallScreen ? (
              <MobilePopularBrands brands={brands} isHomePage />
            ) : (
              <DesktopPopularBrands brands={brands} isHomePage />
            )
          ) : (
            ""
          )}
          {(isMainPage || isLandingPage) && (
            <DesktopPopularBrands
              brands={brands}
              isMainPage
              isLandingPage={isLandingPage}
            />
          )}
        </div>
      </div>
      <Divider />
    </>
  );
}

export default PopularBrands;
