import React from "react";

import MenuMobileBox from "./MenuMobileBox";

import { useUserContext } from "@/contexts/UserContext";
import { useGetProfile } from "@/hooks/useUser";

import styles from "./menuMobile.module.css";

function MenuMobile({ activeMenu, noShadowStyle }) {
  const { user } = useUserContext();

  return (
    <div className={styles.mobile_menu_container}>
      <div className={styles.container}>
        <div
          className={`${styles.mobile_menu} ${
            noShadowStyle ? styles.noShadow : styles.shadow
          }`}
        >
          <MenuMobileBox
            activeMenu={activeMenu}
            title="خانه"
            iconId={`${activeMenu === "خانه" ? "home1Fill" : "home1Outline"}`}
            link="/"
          />
          <MenuMobileBox
            activeMenu={activeMenu}
            title="دسته‌بندی"
            iconId={
              activeMenu === "دسته‌بندی" ? "categoryFill" : "categoryOutline"
            }
            link="/categories"
          />
          <MenuMobileBox
            activeMenu={activeMenu}
            isBasketMenu
            title="سبد خرید"
            iconId={`${activeMenu === "سبد خرید" ? "cartOn" : "cartOff"}`}
            link="/checkout/cart/"
          />
          <MenuMobileBox
            activeMenu={activeMenu}
            title="دیجی‌کالای من"
            iconId={activeMenu === "دیجی‌کالای من" ? "profileOn" : "profileOff"}
            link={user?.is_logged_in ? "/profile" : "/users/login"}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
