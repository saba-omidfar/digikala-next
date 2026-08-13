"use client";

import React, { useState } from "react";
import Link from "next/link";

import styles from "./article.module.css";

function Article({ seo, title }) {
  const [isExtended, setIsExtended] = useState(false);
  if (!seo) return null;

  return (
    <article className={styles.article_container}>
      <span className={styles.article_title}>{title}</span>
      <div
        className={`${styles.article_content} ${
          isExtended ? styles.no_before : ""
        }`}
        style={{ height: isExtended ? "auto" : "156px" }}
      >
        <div
          className={styles.article_content_text}
          dir="rtl"
          dangerouslySetInnerHTML={{
            __html: seo?.content || "",
          }}
        ></div>
      </div>
      <div className="d-flex justify-content-between">
        <Link
          className={styles.article_link}
          rel="next"
          href="/main/electronic-devices/page=2/"
        ></Link>
      </div>
      <div
        className={styles.article_content__see_more_btn}
        onClick={() => setIsExtended((prevState) => !prevState)}
      >
        مشاهده {isExtended ? "کمتر" : "بیشتر"}
        <div className="d-flex">
          <div
            data-icon-name="cube-nav-chevron-down"
            data-icon={isExtended ? "\uE9C0" : "\uE9BF"}
            className={`${styles.article_content_icon} cube-font-icon`}
          ></div>
        </div>
      </div>
    </article>
  );
}

export default Article;
