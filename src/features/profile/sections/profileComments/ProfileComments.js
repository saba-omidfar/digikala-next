"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";

import PendingList from "./pendingList/PendingList";
import CommentsList from "./commentsList/CommentsList";
import QuestionsList from "./questionsList/QuestionsList";

import styles from "./profileComments.module.css";

const tabs = [
  // {
  //   title: "در انتظار دیدگاه",
  //   key: "pending",
  // },
  {
    title: "دیدگاه‌های من",
    key: "comments",
  },
  {
    title: "پرسش‌های من",
    key: "questions",
  },
];

export default function ProfileComments() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("activeTab") || "comments";

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("activeTab", key);

    router.push(`/profile/comments/?${params.toString()}`);
  };

  return (
    <div>
      <div className={styles.profile_content}>
        <div className={styles.profile_header_container}>
          <div className={styles.profile_header}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.profile_title}>
                <span className="position-relative">دیدگاه‌ها و پرسش‌ها</span>
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
                data-cro-id="profile-comments-menu"
                onClick={() => handleTabClick(tab.key)}
              >
                <div className={styles.tab_title}>{tab.title}</div>
              </li>
            ))}
          </ul>

          <ul className={styles.comments_lists_container}>
            {activeTab === "pending" ? <PendingList /> : ""}

            {activeTab === "comments" ? <CommentsList /> : ""}

            {activeTab === "questions" ? <QuestionsList /> : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}
