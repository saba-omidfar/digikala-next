"use client";

import Link from "next/link";

import styles from "./banner.module.css";

export default function BannerItem({ banner, imgWrapperClass, wrapperClass }) {
  if (!banner) return null;

  const hasUrl = Boolean(banner?.url);

  const image = (
    <div className={imgWrapperClass}>
      <picture>
        <source
          type="image/webp"
          srcSet={banner?.image?.webp_url || banner?.image?.url}
        />
        <source type="image/jpeg" srcSet={banner?.image?.url} />
        <img className={styles.banner_img} src={banner?.image?.url} alt="" />
      </picture>
    </div>
  );

  if (!hasUrl) {
    return (
      <div className="w-100">
        <div className={styles.banner_img_span}>{image}</div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Link
        href={banner?.url?.uri || "#"}
        className={`d-block position-relative ${wrapperClass}`}
        aria-hidden="true"
      >
        <div>{image}</div>
      </Link>
    </div>
  );
}
