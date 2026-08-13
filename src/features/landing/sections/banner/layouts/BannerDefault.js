import chunkArray from "@/utils/chunkArray";
import BannerItem from "../BannerItem";

import styles from "../banner.module.css";

export default function BannerDefault({ desktopBanners }) {
  const groups = chunkArray(desktopBanners, 2);

  return (
    <div
      className={`${styles.banners_container} ${styles.banners_desktop_container}`}
    >
      {groups.map((group, index) => (
        <div key={index} className={styles.row_slide_container}>
          {group.map((banner) => (
            <BannerItem
              key={banner?.image?.id}
              banner={banner}
              bannerType="default"
              wrapperClass="w-100"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
