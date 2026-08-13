import BannerItem from "../BannerItem";

import chunkArray from "@/utils/chunkArray";

import styles from "../banner.module.css";

export default function Banner2B({ desktopBanners }) {
  const groups = chunkArray(desktopBanners, 2);

  return (
    <div className={styles.banners_container}>
      {groups.map((group, index) => (
        <div key={index} className="w-100">
          {group.map((banner) => (
            <BannerItem
              key={banner?.image?.id}
              banner={banner}
              imgWrapperClass={styles.one_banner_img_container}
              wrapperClass="w-100"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
