import chunkArray from "@/utils/chunkArray";
import BannerItem from "../BannerItem";

import styles from "../banner.module.css";

export default function Banner2B({ mobileBanners }) {
  const groups = chunkArray(mobileBanners, 2);

  return (
    <div className={styles.banners_container}>
      {groups.map((group, index) => (
        <div key={index} className={styles.two_banner_container}>
          {group.map((banner) => (
            <BannerItem
              key={banner?.image?.id}
              banner={banner}
              bannerType="2B"
              imgWrapperClass={styles.two_banner_img_container}
              wrapperClass="w-100"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
