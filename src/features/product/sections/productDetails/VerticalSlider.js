"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useProductContext } from "@/contexts/ProductContext";

import useScreenStatus from "@/hooks/useScreenStatus";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./verticalSlider.module.css";

function VerticalSlider({
  badges,
  transform = 36,
  isBuyBox,
  isMiniCart,
  isMiniBuyBoxSticky,
  isMobileAlbum,
  isStickyFooter,
}) {
  const { activeVariant } = useProductContext();
  const { isSmallScreen } = useScreenStatus();

  const [currentIndex, setCurrentIndex] = useState(0);

  const badgeSubset = isMiniCart
    ? activeVariant?.variant_badges?.length
      ? [
          activeVariant?.variant_badges.reduce((prev, curr) =>
            curr.priority === 4 ? curr : prev,
          ),
        ]
      : badges
    : activeVariant?.variant_badges?.length
      ? activeVariant?.variant_badges
          ?.sort((a, b) => a.priority - b.priority)
          ?.slice(0, isMobileAlbum ? 4 : 3) || []
      : badges;

  useEffect(() => {
    if (!activeVariant?.variant_badges?.length && !badges?.length) return;

    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === badgeSubset?.length - 1 ? 0 : prev + 1,
        );
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [badgeSubset?.length]);

  if (!badgeSubset) return;

  return (
    <div
      style={
        !isMobileAlbum && !isStickyFooter
          ? {
              transform: `translateY(-${currentIndex * transform}px)`,
              transitionDuration: "300ms",
            }
          : undefined
      }
      className={
        isMobileAlbum || isStickyFooter ? styles.mobile_album_container : ""
      }
    >
      {badgeSubset?.map((badge, index) => (
        <div
          key={index}
          className={`${
            isBuyBox || isMiniBuyBoxSticky ? styles.buy_box_badge_container : ""
          } ${isStickyFooter && styles.footer_sticky_badge_container} ${
            isMobileAlbum && styles.badge_container
          } ${isMiniCart && styles.mini_cart_sticky_badge_container}`}
          style={
            isMobileAlbum || isStickyFooter
              ? {
                  transform: `translateY(-${currentIndex * transform}px)`,
                  transitionDuration: "300ms",
                }
              : undefined
          }
        >
          <div
            aria-hidden={true}
            className={`${isMobileAlbum ? styles.badge : ""} ${
              isStickyFooter ? styles.sticky_footer_badge : ""
            } ${!isMobileAlbum && !isStickyFooter ? "d-flex ms-2" : ""}`}
          >
            <div aria-hidden="true" className={styles.icon_container}>
              <Image
                width={isSmallScreen ? 14 : 18}
                height={isSmallScreen ? 14 : 18}
                src={badge?.payload?.svg_icon}
                alt=""
                className={styles.icon}
              />
            </div>
          </div>
          {isMobileAlbum || isStickyFooter ? (
            <span className={styles.badge_text}>
              {toPersianDigits(badge?.payload?.text)}
            </span>
          ) : (
            <p
              className={styles.buy_box_badge_text}
              style={{ color: badge?.payload?.text_color }}
            >
              {toPersianDigits(badge?.payload?.text)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default VerticalSlider;
