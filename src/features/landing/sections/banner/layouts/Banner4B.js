import chunkArray from "@/utils/chunkArray";
import BannerItem from "../BannerItem";

import styles from "../banner.module.css";

export default function Banner4B({ desktopBanners, mobileBanners }) {
  const groups = chunkArray(mobileBanners, 2);

  return (
    <>
      <div
        className={`${styles.banners_container} ${styles.banner_4b_container}`}
      >
        {desktopBanners.map((banner) => (
          <BannerItem
            key={banner?.image?.id}
            banner={banner}
            bannerType="4B"
            wrapperClass="w-100"
          />
        ))}
      </div>

      <div
        className={`${styles.banners_container} ${styles.banners_mobile_container}`}
      >
        {groups.map((group, index) => (
          <div key={index} className={styles.fore_banner_container}>
            {group.map((banner) => (
              <BannerItem
                key={banner?.image?.id}
                banner={banner}
                bannerType="4B"
                imgWrapperClass={styles.fore_b_banner_img_container}
                wrapperClass="w-100"
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
