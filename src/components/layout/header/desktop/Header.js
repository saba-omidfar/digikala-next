"use client";

import { useState } from "react";

import Topbar from "@/components/layout/header/sections/tobbar/Topbar";
import Navbar from "@/components/layout/header/sections/navbar/Navbar";
import TopMegamenuBanner from "@/components/layout/header/sections/topMegamenuBanner/TopMegamenuBanner";

import { useHeaderScroll } from "@/components/layout/header/hooks/useHeaderScroll";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./header.module.css";

export default function Header({ isBrandLandingPage }) {
  const [isOpenMegamenu, setIsOpenMegamenu] = useState(false);

  const { hideMenuOnTop } = useHeaderScroll();
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <>
      {isOpenMegamenu && <div className="overlay" />}

      <div
        className={`${!isBrandLandingPage ? (topMegaMenuBanners?.desktop?.length ? styles.banner_header_container : styles.header_container) : styles.header_landing_container} ${hideMenuOnTop ? (topMegaMenuBanners?.desktop?.length ? styles.header_banner_fixed_container : styles.header_fixed_container) : ""} ${isOpenMegamenu ? styles.padding_right : ""}`}
      >
        <header className={styles.header}>
          <TopMegamenuBanner />
          <Topbar hideMenuOnTop={hideMenuOnTop} />
          {!isBrandLandingPage && (
            <Navbar
              hideMenuOnTop={hideMenuOnTop}
              isOpenMegamenu={isOpenMegamenu}
              setIsOpenMegamenu={setIsOpenMegamenu}
            />
          )}
        </header>
      </div>
    </>
  );
}
