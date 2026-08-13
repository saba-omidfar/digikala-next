import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./middleFooterFeature.module.css";

function MiddleFooterFeature({ feature }) {
  return (
    <Link
      href={feature?.href}
      target="_blank"
      className={styles.middle_footer_item_link}
    >
      <div className={styles.middle_footer_item}>
        <div className={styles.middle_footer_item_img_container}>
          <Image
            width={42}
            height={42}
            src={feature.src}
            alt={feature.caption}
          />
        </div>
        <p className={styles.middle_footer_item_caption}>{feature.caption}</p>
      </div>
    </Link>
  );
}

export default MiddleFooterFeature;
