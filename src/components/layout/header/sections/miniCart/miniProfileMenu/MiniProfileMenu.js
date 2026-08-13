"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import toPersianDigits from "@/utils/toPersianDigits";
import { useModal } from "@/contexts/modalContext";
import { useGetMe } from "@/hooks/useUser";

import LogoutModal from "@/components/layout/header/modals/logoutModal/LogoutModal";

import styles from "./miniProfileMenu.module.css";

function MiniProfileMenu({
  miniProfileBtnRef,
  isMiniProfileOpen,
  setIsMiniProfileOpen,
}) {
  const miniProfileRef = useRef(null);
  const { openModal } = useModal();
  const { data: userInfo } = useGetMe();

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
        href="/profile/notification/"
        className={styles.menu_link}
      >
        <div className={styles.menu_content}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <span className={styles.user_name}>
              {toPersianDigits(userInfo?.user?.phone)}
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
        <li className={styles.menu_item} id="header-digiclub">
          <Link className={styles.menu_item_link} href="#">
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
        <li className={styles.menu_item} id="header-digiclub">
          <Link className={styles.menu_item_link} href="#">
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
        <li className={styles.menu_item} id="header-digiclub">
          <Link className={styles.menu_item_link} href="#">
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
        <li className={styles.menu_item} id="header-digiclub">
          <Link className={styles.menu_item_link} href="#">
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
        <li className={styles.menu_item} id="header-digiclub">
          <Link className={styles.menu_item_link} href="#">
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
          className={styles.menu_item}
          onClick={() =>
            openModal(<LogoutModal />, {
              name: "logout",
              className: "rounded-medium",
            })
          }
        >
          <Link className={styles.menu_item_link} href="#">
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
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MiniProfileMenu;
