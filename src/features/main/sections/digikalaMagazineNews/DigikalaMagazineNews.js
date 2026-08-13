import React from "react";
import Link from "next/link";

import styles from "./digikalaMagazineNews.module.css";

function Digikalamagazine({ title, magazine }) {
  return (
    <div className={styles.container}>
      <div className={styles.magazine_title_container}>
        <div className={styles.magazine_title}>{title}</div>
        <span id="more-blogs" className="flex-shrink-0">
          <Link
            className={styles.magazine_see_more_link}
            href="/mag"
            // href={magazine?.see_more_url?.uri}
          >
            <span>مطالب بیشتر در دیجی‌کالا مگ</span>
            <div className="d-flex">
              <div
                data-icon-name="cube-nav-chevron-down"
                data-icon="&#xE9C2;"
                className={`${styles.magazine_icon} cube-font-icon`}
              ></div>
            </div>
          </Link>
        </span>
      </div>
      <div className={styles.magazine_content}>
        {magazine?.news?.slice(0, 4).map((news, index) => (
          <Link
            key={index}
            href={news.url.uri}
            target="_blank"
            className={styles.magazine_link}
            id="blogs"
          >
            <div className={styles.magazine_img_container}>
              <img
                className={styles.magazine_img}
                src={news.image}
                alt={news.title}
              />
            </div>
            <div className={styles.magazine_text}>{news.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Digikalamagazine;
