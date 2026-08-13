"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import MiniCart from "@/components/layout/header/sections/miniCart/MiniCart";
import MiniProfileMenu from "@/components/layout/header/sections/miniCart/miniProfileMenu/MiniProfileMenu";
import SearchInput from "@/components/layout/header/sections/searchInput/SearchInput";
import SelectCity from "@/components/layout/header/sections/tobbar/SelectCity";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./topbar.module.css";

function Topbar() {
  const { isLoadingSearchedProducts } = useProductContext();
  const { user, userIsLoading } = useUserContext();
  const { cart, basket } = useCartContext();

  const miniProfileBtnRef = useRef(null);
  const [isOpenMiniCart, setIsOpenMiniCart] = useState(false);
  const [isMiniProfileOpen, setIsMiniProfileOpen] = useState(false);

  return (
    <div className={styles.navbar_top_container}>
      <div className={styles.navbar_top}>
        <div
          className={`${styles.custom_flex} w-100 d-flex position-relative z-2`}
        >
          <div className="w-100 d-flex align-items-center flex-grow-1">
            <Link href="/" className={styles.navbar_top__digikala_link}>
              <div className={styles.navbar_top__digikala_logo_container}>
                <Image
                  width={195}
                  height={30}
                  src="/images/brand/full-horizontal.svg"
                  alt="لوگوی دیجیکالا"
                  priority
                  className={styles.navbar_top__digikala_logo}
                />
              </div>
            </Link>

            <div className="d-flex flex-grow-1 ms-auto">
              <div className="position-relative">
                <SearchInput />
              </div>
            </div>
          </div>

          <div className={styles.basket_login_container}>
            {userIsLoading || isLoadingSearchedProducts ? (
              <div className="skeleton_container">
                <div
                  className={`${styles.mini_profile_skeleton} skeleton_no_animation`}
                ></div>
              </div>
            ) : user ? (
              <div
                ref={miniProfileBtnRef}
                className={styles.mini_profile__button_container}
                onClick={() => setIsMiniProfileOpen((prev) => !prev)}
              >
                <div
                  className={`${styles.mini_profile__button} ${
                    isMiniProfileOpen ? styles.mini_profile__button__opened : ""
                  }`}
                  id="HP-profile-header"
                >
                  <div>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.mini_profile__button_icon}>
                        <use href="#profileOff"></use>
                      </svg>
                    </div>
                  </div>
                  <div className="d-flex">
                    <svg className={styles.mini_profile__button_dropdown_icon}>
                      <use href="#dropdown"></use>
                    </svg>
                  </div>
                </div>
                {isMiniProfileOpen && (
                  <MiniProfileMenu
                    isMiniProfileOpen={isMiniProfileOpen}
                    setIsMiniProfileOpen={setIsMiniProfileOpen}
                    miniProfileBtnRef={miniProfileBtnRef}
                  />
                )}
              </div>
            ) : (
              <div className="position-relative">
                <Link href="/users/login/">
                  <button className={styles.profile_btn} id="header-profile">
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      <div
                        className={styles.register_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.register_icon}>
                          <use href="#registerationSignIn"></use>
                        </svg>
                      </div>
                      ورود | ثبت‌نام
                    </div>
                  </button>
                </Link>
              </div>
            )}

            <span className={styles.divider}></span>
            <div
              className="d-flex flex-column position-relative"
              onMouseEnter={() => {
                if (!isMiniProfileOpen && basket?.length)
                  setIsOpenMiniCart(true);
              }}
              onMouseLeave={() => {
                if (!isMiniProfileOpen && basket?.length)
                  setIsOpenMiniCart(false);
              }}
            >
              {isLoadingSearchedProducts ? (
                <div className="skeleton_container">
                  <div
                    className={`${styles.cart_shopping_skeleton} skeleton_no_animation`}
                  ></div>
                </div>
              ) : (
                <>
                  <Link
                    href="/checkout/cart/"
                    className={`${styles.cart_shopping__link} ${
                      isOpenMiniCart ? styles.mini_cart_open : ""
                    } p-lg-2`}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <svg className={styles.mini_cart_shopping_icon}>
                        <use href="#cartOff"></use>
                      </svg>
                    </div>
                    {basket?.length ? (
                      <div className={styles.mini_cart_count_badge}>
                        <span className={styles.mini_cart_count_badge_text}>
                          {toPersianDigits(cart?.items_count)}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </Link>
                  {isOpenMiniCart && (
                    <MiniCart setIsOpenMiniCart={setIsOpenMiniCart} />
                  )}
                </>
              )}
            </div>
          </div>
          <SelectCity />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
