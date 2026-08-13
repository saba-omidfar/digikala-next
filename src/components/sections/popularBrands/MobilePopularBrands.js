import Link from "next/link";
import Image from "next/image";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./mobilePopularBrands.module.css";

function MobilePopularBrands({ brands, isHomePage }) {
  const { isSmallScreen } = useScreenStatus();

  return (
    <div className={styles.brands_container}>
      <div className={styles.paddingRight}></div>
      {brands?.map((brand, index) => (
        <div key={`${index}-${brand?.title}`}>
          <Link
            className={styles.brand_link}
            href={
              isHomePage && isSmallScreen ? brand?.url?.url : brand?.url?.uri
            }
          >
            <div className={styles.brand_bg}>
              <div className={styles.brand_logo_container}>
                <Image
                  width={70}
                  height={70}
                  src={
                    isHomePage && isSmallScreen
                      ? brand?.image?.url
                      : brand?.logo?.url?.[0]
                  }
                  alt={
                    isHomePage && isSmallScreen ? brand?.title : brand?.title_fa
                  }
                  className={styles.brand_logo}
                />
              </div>
            </div>
            <h4 className={styles.brand_title}>
              {isHomePage && isSmallScreen ? brand?.title : brand?.title_fa}
            </h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default MobilePopularBrands;
