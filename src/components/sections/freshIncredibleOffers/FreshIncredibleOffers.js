"use client";

import React from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import Timer from "@/components/modules/timer/Timer";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./freshIncredibleOffers.module.css";

function FreshIncredibleOffers({
  products,
  title,
  discountPercent,
  productsCount,
  backgroundGradiant,
  seeMoreLink,
  isHomePage = false,
  marginStyle = undefined,
  patternStyle = undefined,
  timer,
  isTeasingIncredible,
}) {
  const router = useRouter();
  const { isSmallScreen } = useScreenStatus();

  function seeMoreLinkHandler() {
    router.replace(seeMoreLink ? seeMoreLink : "");
  }

  if (!products) return;

  return (
    <div className={isHomePage ? styles.index_content : styles.content}>
      <div
        className={isTeasingIncredible ? styles.teasing_link : styles.link}
        style={marginStyle}
        onClick={seeMoreLinkHandler}
      >
        <div className={styles.pattern} style={patternStyle}></div>
        <div
          className={styles.bg}
          style={{ background: backgroundGradiant }}
        ></div>
        <div className={styles.content_top}>
          <div
            className={`d-flex justify-content-center ${isTeasingIncredible ? "flex-column" : ""}`}
          >
            {isTeasingIncredible ? (
              <>
                <div
                  className={
                    isTeasingIncredible
                      ? styles.teasing_image_text_container
                      : styles.image_text_container
                  }
                >
                  <img
                    className={styles.image}
                    src="/images/svg/typography/teasing.svg"
                    alt="fresh-incredible-offer"
                  />
                </div>
                <span className={styles.teasing_text}>
                  تخفیف‌های فردا رو از دست نده!
                </span>
              </>
            ) : (
              <>
                <div className={styles.image_icon_container}>
                  <Image
                    className={styles.image_icon}
                    src="/images/png/amazing/fresh.webp"
                    width={66}
                    height={62}
                    alt={title ? title : ""}
                  />
                </div>
                <div className={styles.image_text_container}>
                  <Image
                    className={styles.image}
                    src="/images/svg/amazing/fresh-incredible-offer.svg"
                    width={250}
                    height={28}
                    alt="fresh-incredible-offer"
                  />
                </div>
              </>
            )}
          </div>
          {discountPercent && (
            <div className={styles.percent_container}>
              <p className={styles.percent_text}>
                تا {discountPercent?.toLocaleString("fa-IR")}٪ تخفیف
              </p>
            </div>
          )}
          {timer && (
            <div className={styles.timer_container}>
              <Timer
                seconds={timer}
                hasBg
                gap="4px"
                width="28px"
                height="28px"
                borderRadius="4px"
                padding="0px"
                seperator
                seperatorColor="#23254e"
              />
            </div>
          )}
        </div>
        <div className={styles.content_bottom}>
          <div className={styles.product_items}>
            {products?.slice(0, isSmallScreen ? 3 : 6)?.map((product) => (
              <Link
                key={product.id}
                // href={product?.url?.uri}
                href="#"
                className={styles.product_item}
              >
                <div className={styles.product_item_img_container}>
                  <Image
                    className={styles.product_item_img}
                    src={product?.images?.main?.url?.[0]}
                    width={58}
                    height={58}
                    alt={product?.title_fa}
                  />
                </div>
                <div className={styles.product_item_percent}>
                  <span>
                    {product?.default_variant?.price?.discount_percent?.toLocaleString(
                      "fa-IR",
                    )}
                    ٪
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.see_more_btn}>
            <span className={styles.see_more_text}>
              بیش از {productsCount?.toLocaleString("fa-IR")} کالا
            </span>
            <div className={styles.see_more_icon_container}>
              <svg className={styles.see_more_icon}>
                <use href="#arrowLeft"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreshIncredibleOffers;
