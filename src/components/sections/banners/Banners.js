import React from "react";
import Link from "next/link";

import chunkArray from "@/utils/chunkArray";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./banners.module.css";

function Banners({ banners, isHomePage }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();

  const grouped = isSmallScreen ? chunkArray(banners, 2) : [banners];

  if (!isClientReady || !banners?.length) return null;

  return (
    <div className={styles.content}>
      {grouped?.map((group, index) => (
        <div
          key={index}
          className={
            isSmallScreen
              ? styles.mobile_banners_container
              : styles.banners_container
          }
        >
          {group?.length
            ? group?.map((banner, index) => (
                <Link
                  key={index}
                  target="_blank"
                  href={banner?.url?.url || "#"}
                  style={{
                    width:
                      isHomePage && isSmallScreen && banners.length === 4
                        ? "100%"
                        : `calc(${100 / banners?.length}% - ${((banners?.length - 1) * 16) / banners?.length}px)`,
                    marginRight: index !== 0 && !isSmallScreen ? "16px" : "0",
                  }}
                >
                  <div className={isSmallScreen ? styles.banner_img_bg : ""}>
                    <div
                      className={styles.banner_img_container}
                      aria-hidden="true"
                    >
                      {isSmallScreen ? (
                        <img
                          src={
                            isSmallScreen ? banner?.image?.url : banner?.image
                          }
                          alt={banner?.title}
                          title={banner?.title}
                          className={styles.banner_img}
                        />
                      ) : (
                        <picture>
                          <source
                            srcSet={banner?.image?.url}
                            type="image/webp"
                          />
                          <source
                            srcSet={banner?.image?.url}
                            type="image/jpeg"
                          />
                          <img
                            src={banner?.image?.url}
                            alt={banner?.title}
                            title={banner?.title}
                            className={styles.banner_img}
                            style={{
                              aspectRatio: banners?.length === 1 && "8 / 1",
                            }}
                          />
                        </picture>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            : ""}
        </div>
      ))}
    </div>
  );
}

export default Banners;
