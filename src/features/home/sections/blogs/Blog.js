import React from "react";
import Link from "next/link";
import Image from "next/image";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./blog.module.css";

function Blog({ post }) {
  const { isSmallScreen } = useScreenStatus();

  return (
    <Link href="#" className={styles.blog_link}>
      <div
        className={styles.blog_img_container}
        aria-hidden="false"
        aria-label={post?.title}
      >
        <img
          className={styles.blog_img}
          src={isSmallScreen ? post?.image?.url : post?.image}
          alt={post?.title}
        />
      </div>
      <h4 className={styles.blog_caption}>{post?.title}</h4>
    </Link>
  );
}

export default Blog;
