import BannerItem from "../BannerItem";

import groupByPattern from "@/utils/groupByPattern";

import styles from "../banner.module.css";

export default function Banner1A4A({ desktopBanners }) {
  const groupedBanners = groupByPattern(desktopBanners || [], [2, 1, 2]);

  return (
    <>
      {groupedBanners.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={`${styles.column_slide_container} ${
            groupIndex === 1 ? styles.second_column_slide_container : ""
          }`}
        >
          {group.map((banner) => (
            <BannerItem
              key={banner?.image?.id}
              banner={banner}
              bannerType="1A4A"
              imgWrapperClass={
                groupIndex !== 1 ? styles.banner_img_container : ""
              }
              wrapperClass="h-100"
            />
          ))}
        </div>
      ))}
    </>
  );
}
