"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { useProfile } from "@/features/profile/hooks/useProfile";

import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";

import styles from "./listsContent.module.css";

export default function ListsContent() {
  const { data } = useProfile();

  if (!data?.user_list?.products?.length) return null;

  return (
    <div className={styles.profile_content}>
      <div className={styles.profile_header_container}>
        <div className={styles.profile_header}>
          <div className="d-flex align-items-center flex-grow-1">
            <p className={styles.profile_title}>
              <span className="position-relative">
                {data?.user_list?.title}
              </span>
            </p>
          </div>
          <div className={styles.profile_title__line_red}></div>
        </div>
        <span data-cro-id="profile-all-profile">
          <Link
            className={styles.profile_link}
            href={data?.user_list?.see_more_url?.uri || "#"}
          >
            <span>مشاهده همه</span>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </Link>
        </span>
      </div>
      {data?.user_list?.products?.length ? (
        <div>
          <Swiper slidesPerView={"auto"} spaceBetween={24}>
            {data?.user_list?.products?.map((product) => (
              <SwiperSlide key={product.id}>
                <VerticalProductCard product={product} isVertical />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
