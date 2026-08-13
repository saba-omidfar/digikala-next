"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useModal } from "@/contexts/modalContext";
import useScreenStatus from "@/hooks/useScreenStatus";

import DeepLinksModal from "@/features/home/modals/deepLinksModal/DeepLinksModal";

import styles from "./deepLinks.module.css";

function DeepLinks({ deepLinks }) {
  const { openModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  if (!deepLinks) return;

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        {isSmallScreen ? <div className="me-1"></div> : ""}
        {deepLinks?.slice(0, isSmallScreen ? 8 : 9)?.map((deepLink) => (
          <Link
            key={deepLink.id}
            href={deepLink?.url?.url || "#"}
            className={styles.service_link}
          >
            <div className={styles.service_img_container}>
              <picture>
                <source type="image/webp" srcSet={deepLink?.image?.url} />
                <source type="image/jpeg" srcSet={deepLink?.image?.url} />
                <img
                  className={styles.service_img}
                  src={deepLink?.image?.url}
                  alt={deepLink?.title}
                  title=""
                />
              </picture>
            </div>
            <span className={styles.service_caption}>{deepLink?.title}</span>
          </Link>
        ))}
        <div
          className={`${styles.services__read_more_btn} ${styles.service_link}`}
          onClick={() =>
            openModal(<DeepLinksModal deepLinks={deepLinks} />, {
              className: "modal__deep_links rounded-large",
            })
          }
        >
          <div className={styles.services__read_more_bg}>
            <div className="d-flex" aria-hidden="false">
              <svg
                aria-label="مشاهده همه خدمات"
                className={styles.services__read_more_icon}
              >
                <use href="#moreHoriz"></use>
              </svg>
            </div>
          </div>
          <span className={styles.service_caption}>بیشتر</span>
        </div>
        <div className={styles.margin_right}></div>
      </div>
    </div>
  );
}

export default DeepLinks;
