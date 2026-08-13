"use client";

import React from "react";
import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import styles from "./menuMobileBox.module.css";

function MenuMobileBox({ activeMenu, isBasketMenu, title, iconId, link }) {
  const { user } = useUserContext();
  const { cart, basket, isLoadingUserCart } = useCartContext();

  const isActive = activeMenu === title;

  return (
    <Link
      className={`${styles.menu_mobile_link} ${
        isActive ? styles.menu_mobile_link__active : ""
      }`}
      href={link}
    >
      <div className="d-flex position-relative flex-column align-items-center">
        <div
          className={`${styles.basket_container}`}
          style={{ paddingRight: title === "سبد خرید" ? "8px" : "" }}
        >
          <div className="d-flex" aria-hidden="false">
            <svg
              className={`${styles.menu_mobile_icon} ${
                isActive ? styles.menu_mobile_icon__active : ""
              }`}
            >
              <use href={`#${iconId}`}></use>
            </svg>
          </div>
          {isBasketMenu && basket.length && !isLoadingUserCart ? (
            <div className={styles.cart_count_badge}>
              <span className={styles.cart_count_badge_text}>
                {toPersianDigits(cart?.items_count)}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p
        className={`${styles.menu_mobile_link__title} ${
          isActive ? styles.menu_mobile_link__title__active : ""
        }`}
      >
        {title}
      </p>
    </Link>
  );
}

export default MenuMobileBox;
