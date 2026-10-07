"use client";

import Footer from "@/components/layout/footer/desktop/Footer";
import Header from "@/components/layout/header/desktop/Header";
import ProfileSidebar from "../sections/profileSidebar/ProfileSidebar";
import ProfileContent from "../sections/profileContent/ProfileContent";

import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./profileDesktop.module.css";

export default function ProfileDesktop({ children }) {
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <div className="h-100 d-flex flex-column bg-white align-items-center">
      <Header />

      <div
        className="flex-grow-1 bg-white d-flex flex-column w-100 align-items-center flex-shrink-0 user-select-none"
        style={{
          paddingTop: topMegaMenuBanners?.desktop?.length ? 168 : 108,
        }}
      >
        <main className={styles.desktop_content}>
          <div className={styles.profile_container} id="profileLayoutContainer">
            <ProfileSidebar />

            <ProfileContent>{children}</ProfileContent>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
