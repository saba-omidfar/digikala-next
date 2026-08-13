"use client";

import Link from "next/link";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./topMegamenuBanner.module.css";

export default function TopMegamenuBanner() {
  const { data } = useGetUniversal();
  const { isSmallScreen } = useScreenStatus();

  const banner = isSmallScreen ? data?.mobile : data?.desktop;

  if (!banner) return null;

  return (
    <div>
      <Link
        href={banner?.url?.uri || "#"}
        target="_blank"
        className={styles.banner_link}
      >
        <div className={styles.banner}>
          <div
            role="img"
            aria-hidden="false"
            aria-label={banner?.title}
            className={styles.banner_img_container}
          >
            <picture>
              <source type="image/webp" srcSet={banner?.webp_image} />
              <source type="image/jpeg" srcSet={banner?.image} />
              <img
                className={styles.banner_img}
                src={banner?.image}
                height="60"
                alt={banner?.title}
              />
            </picture>
          </div>
        </div>
      </Link>
    </div>
  );
}
