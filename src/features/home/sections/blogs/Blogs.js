"use client";

import React from "react";
import Link from "next/link";

import Blog from "./Blog";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./blogs.module.css";

function Blogs({ title, magazineNews }) {
  const { isSmallScreen } = useScreenStatus();

  const posts = isSmallScreen ? magazineNews : magazineNews?.slice(0, 4);

  if (!magazineNews) return null;

  return (
    <div className={styles.content}>
      <div className={styles.blogs_wrapper}>
        <div className={styles.more_blogs_title_container}>
          <div className={styles.more_blogs_title}>{title}</div>
          <span className="flex-shrink-0">
            <Link
              className={styles.more_blogs_link}
              href="https://www.digikala.com/mag/"
            >
              <span>
                {isSmallScreen ? "مشاهده همه" : "مطالب بیشتر در دیجی‌کالا مگ"}
              </span>
              <div className="d-flex">
                <svg className={styles.more_blogs_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </Link>
          </span>
        </div>
        <div className={styles.blogs_container}>
          {isSmallScreen ? <div className={styles.space_right}></div> : ""}
          {posts?.map((post, index) => (
            <Blog key={index} post={post} />
          ))}
          {isSmallScreen ? <div className={styles.space_left}></div> : ""}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
