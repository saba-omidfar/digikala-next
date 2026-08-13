import chunkArray from "@/utils/chunkArray";
import BannerItem from "../BannerItem";

import styles from "../banner.module.css";

export default function Banner4A({
  mobileBanners,
  desktopBanners,
  isSmallScreen,
}) {
  const groups = chunkArray(isSmallScreen ? mobileBanners : desktopBanners, 2);

  return (
    <div
      className={`${styles.banners_container} ${styles.banners_mobile_container}`}
    >
      {mobileBanners?.length > 3
        ? groups?.map((group, index) => (
            <div key={index} className={styles.fore_a_banner_container}>
              {group.map((banner) => (
                <BannerItem
                  key={banner?.image?.id}
                  banner={banner}
                  imgWrapperClass={styles.fore_banner_img_container}
                  wrapperClass="w-100"
                />
              ))}
            </div>
          ))
        : mobileBanners?.map((banner) => (
            <BannerItem
              key={banner?.image?.id}
              banner={banner}
              imgWrapperClass={styles.fore_banner_img_container}
              wrapperClass="w-100"
            />
          ))}
    </div>
  );
}
