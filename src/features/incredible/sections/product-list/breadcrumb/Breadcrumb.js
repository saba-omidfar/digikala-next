"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useListing } from "@/contexts/ListingContext";

import styles from "./breadcrumb.module.css";

function Breadcrumb({ desktopNavClassname }) {
  const { brand } = useParams();
  const { data, isLoading } = useListing();

  const breadcrumbs = brand ? data?.breadcrumb : data?.breadcrumb?.slice(0, -1);

  if (!breadcrumbs) return;

  return (
    <nav aria-label="breadcrumb" className={desktopNavClassname}>
      {isLoading ? (
        <div className="skeleton_container">
          <div
            className={`${styles.breadcrumb_skeleton} skeleton_no_animation`}
          ></div>
        </div>
      ) : (
        <div>
          <Swiper
            lazyPreloadPrevNext={1}
            loopAdditionalSlides={2}
            slidesPerView="auto"
            spaceBetween={0}
            freeMode
          >
            {breadcrumbs?.map((breadcrumb, index, arr) => (
              <SwiperSlide
                key={breadcrumb?.title}
                className={styles.breadcrumb_slide}
              >
                <Link
                  className={styles.breadcrumb_link}
                  data-cro-id="plp-burger-menu"
                  href={breadcrumb?.url}
                >
                  {breadcrumb?.title}
                  <span className={styles.breadcrumb_divider}>
                    {index !== arr.length - 1 ? "/" : ""}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </nav>
  );
}

export default Breadcrumb;
