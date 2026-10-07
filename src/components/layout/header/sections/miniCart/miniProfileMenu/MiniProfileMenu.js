"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

import { useModal } from "@/contexts/modalContext";
import { useGetProfile } from "@/hooks/useUser";
import toPersianDigits from "@/utils/toPersianDigits";

import LogoutModal from "@/components/layout/header/modals/logoutModal/LogoutModal";

import styles from "./miniProfileMenu.module.css";

function MiniProfileMenu({
  miniProfileBtnRef,
  isMiniProfileOpen,
  setIsMiniProfileOpen,
}) {
  const miniProfileRef = useRef(null);
  const { openModal } = useModal();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMiniProfileOpen &&
        miniProfileRef.current &&
        miniProfileBtnRef.current &&
        !miniProfileRef.current.contains(event.target) &&
        !miniProfileBtnRef.current.contains(event.target)
      ) {
        setIsMiniProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMiniProfileOpen]);

  return (
    <div className={styles.menu} ref={miniProfileRef}>
      <Link
        data-cro-id="header-profile-detail"
        href="/profile/"
        className={styles.menu_link}
      >
        <div className={styles.menu_content}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <span className={styles.user_name}>
              {profile?.is_verified
                ? `${profile?.first_name} ${profile?.last_name}`
                : toPersianDigits(profile?.phone_number)}
            </span>

            <div className={styles.arrow_icon_container}>
              <div
                data-icon-name="cube-arrow-left"
                data-icon="&#xE9C2;"
                className={`${styles.arrow_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
        </div>
      </Link>
      <ul className="p-0 m-0">
        <li className={styles.menu_item} data-cro-id="plus-mini-profile-lead">
          <Link className={styles.menu_item_link} href="/plus/landing/">
            <div className={styles.menu_item_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-plus"
                  data-icon="&#xE9B4;"
                  className={`${styles.menu_item_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.menu_item_text_container}>
              <span className={styles.menu_item_plus}>پلاس</span>
              <div className="d-flex align-items-center">
                <p className={styles.menu_item_plus_text}>خرید اشتراک</p>
                <div className="d-flex">
                  <div
                    data-icon-name="cube-arrow-left"
                    data-icon="&#xE9C2;"
                    className={`${styles.arrow_plus_icon} cube-font-icon`}
                  ></div>
                </div>
              </div>
            </div>
          </Link>
        </li>
        <li className={styles.menu_item} data-cro-id="header-my-orders">
          <Link className={styles.menu_item_link} href="/profile/orders/">
            <div className={styles.menu_item_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-order"
                  data-icon="&#xE9AE;"
                  className={`${styles.menu_item_order_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.menu_item_text_container}>
              <span className={styles.menu_item_text}>سفارش‌ها</span>
            </div>
          </Link>
        </li>
        <li className={styles.menu_item}>
          <Link className={styles.menu_item_link} href="/profile/addresses/">
            <div className={styles.menu_item_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-street"
                  data-icon="&#xE947;"
                  className={`${styles.menu_item_order_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.menu_item_text_container}>
              <span className={styles.menu_item_text}>آدرس‌ها</span>
            </div>
          </Link>
        </li>
        <li className={styles.menu_item} data-cro-id="header-lists">
          <Link className={styles.menu_item_link} href="/profile/lists">
            <div className={styles.menu_item_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-favoriteOff"
                  data-icon="&#xE930;"
                  className={`${styles.menu_item_order_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.menu_item_text_container}>
              <span className={styles.menu_item_text}>لیست‌ها</span>
            </div>
          </Link>
        </li>
        <li className={styles.menu_item} data-cro-id="header-comments">
          <Link className={styles.menu_item_link} href="/profile/comments/">
            <div className={styles.menu_item_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-comment"
                  data-icon="&#xE90B;"
                  className={`${styles.menu_item_order_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.menu_item_text_container}>
              <span className={styles.menu_item_text}>دیدگاه‌ها و پرسش‌ها</span>
            </div>
          </Link>
        </li>
        <li
          data-cro-id="header-logout"
          className={styles.menu_item}
          onClick={() =>
            openModal(<LogoutModal />, {
              name: "logout",
              className: "rounded-medium",
            })
          }
        >
          <span className={styles.menu_item_link}>
            <div className={styles.menu_item_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-registeration-signin"
                  data-icon="&#xE92A;"
                  className={`${styles.registeration_signIn_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <div className={styles.menu_item_text_container}>
              <span className={styles.menu_item_text}>خروج از حساب کاربری</span>
            </div>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default MiniProfileMenu;
