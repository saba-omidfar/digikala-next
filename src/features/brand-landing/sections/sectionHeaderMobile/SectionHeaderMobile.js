"use client";
import Link from "next/link";

import styles from "./sectionHeaderMobile.module.css";

export default function sectionHeaderMobile({
  headerBanners,
  premiumBrand,
  brandTitle,
  menuUrls,
}) {
  return (
    <div className="d-flex flex-column w-100">
      <div
        className={styles.premium_brand_header__bg}
        style={{
          backgroundImage: `url(${headerBanners?.image})`,
        }}
      >
        <div className={styles.brand_container}>
          <div
            role="img"
            aria-hidden="false"
            aria-label={brandTitle?.title_fa}
            className={styles.brand_img_container}
          >
            <picture>
              <source type="image/webp" srcSet={premiumBrand?.logo?.url?.[0]} />
              <source type="image/jpeg" srcSet={premiumBrand?.logo?.url?.[0]} />
              <img
                className={styles.brand_img}
                src={premiumBrand?.logo?.url?.[0]}
                width="100"
                height="100"
                alt={brandTitle?.title_fa}
                title=""
              />
            </picture>
          </div>
        </div>
      </div>

      <div className={styles.menu_urls_container}>
        <div className={styles.menu_urls_title_container}>
          <h2 className={styles.menu_urls_title}>{brandTitle?.title_fa}</h2>
        </div>
        <div className={styles.menu_urls}>
          <h2 className={styles.brand_title}>{headerBanners.title}</h2>

          <div className="overflow-hidden hide-scrollbar">
            <ul className={styles.menu_urls_content}>
              <div className="d-flex overflow-x-auto overflow-y-hidden hide-scrollbar w-100">
                <Link href={brandTitle?.url?.uri || "#"}>
                  <li
                    className={`${styles.menu_url_text} ${styles.active_menu}`}
                  >
                    ویترین
                  </li>
                </Link>
                {menuUrls?.map((item, index) => (
                  <Link href={item?.url?.uri || "#"} key={index}>
                    <li className={`${styles.menu_url_text}`}>
                      {item?.url?.text}
                    </li>
                  </Link>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
