"use client";

import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";

import FavoriteList from "@/features/profile/sections/profileLists/favoriteList/FavoriteList";
import PublicList from "@/features/profile/sections/profileLists/publicList/PublicList";
import ObservedList from "@/features/profile/sections/profileLists/observedList/ObservedList";

import styles from "./profileLists.module.css";

const tabs = [
  {
    title: "لیست علاقه‌مندی",
    key: "favorites",
  },
  {
    title: "لیست‌های دیگر",
    key: "public",
  },
  {
    title: "اطلاع‌رسانی‌ها",
    key: "announcements",
  },
];

export default function ProfileLists() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("activeTab") || "favorites";

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("activeTab", key);

    router.push(`/profile/lists/?${params.toString()}`);
  };

  return (
    <div>
      <div className={styles.profile_content}>
        <div className={styles.profile_header_container}>
          <div className={styles.profile_header}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.profile_title}>
                <span className="position-relative">لیست‌ها</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <ul className={styles.tabs_container}>
            {tabs?.map((tab) => (
              <li
                key={tab.key}
                className={`${styles.tab} ${
                  activeTab === tab.key ? styles.tab_active : ""
                }`}
                data-cro-id="profile-mylist-menu"
                onClick={() => handleTabClick(tab.key)}
              >
                <div className={styles.tab_title}>{tab.title}</div>
              </li>
            ))}
          </ul>

          <ul className="m-0 p-0">
            {activeTab === "favorites" ? <FavoriteList /> : ""}
            {activeTab === "public" ? <PublicList /> : ""}
            {activeTab === "announcements" ? <ObservedList /> : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}
