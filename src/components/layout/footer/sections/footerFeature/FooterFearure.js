import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./footerFearure.module.css";

function FooterFearure({ caption, src }) {
  return (
    <Link href="#" id="footer-features" className={styles.feature_link}>
      <div className={styles.fearure_img_container}>
        <Image className={styles.fearure_img} fill src={src} alt={caption} />
      </div>
      <p className={styles.fearure_caption}>{caption}</p>
    </Link>
  );
}

export default FooterFearure;
