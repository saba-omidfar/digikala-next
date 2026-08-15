import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./notFoundContent.module.css";

export default function NotFoundContent() {
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <div
      className={styles.container}
      style={{
        paddingTop: topMegaMenuBanners ? 168 : 108,
      }}
    >
      <div className={styles.not_found_container}>
        <div className={styles.not_found}>
          <h2 className={styles.not_found_title}>
            صفحه‌ای که دنبال آن بودید پیدا نشد!
          </h2>

          <Link className={styles.not_found_link} href="/">
            <span>صفحه اصلی</span>
            <div className="d-flex">
              <div
                data-icon-name="cube-chevron-left"
                data-icon="&#xE9C2;"
                className={`${styles.not_found_icon} cube-font-icon`}
              ></div>
            </div>
          </Link>

          <div className={styles.not_found_logo}>
            <div className={styles.not_found_img_container}>
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src="/images/png/page-not-dound.webp"
                alt="error 404"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
