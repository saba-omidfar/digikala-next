"use client";
import { useState, useEffect } from "react";

import { useGetUniversal } from "@/hooks/useGetUniversal";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./tabs.module.css";

export default function Tabs({ isTabsSticky }) {
  const { productDetails } = useProductContext();
  const { data: topMegaMenuBanners } = useGetUniversal();

  const [topOffset, setTopOffset] = useState(68);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(null);

  const sections = [];

  if (productDetails?.expert_reviews?.description) {
    sections.push({ id: "shortReview", label: "معرفی" });
  }

  if (productDetails?.expert_reviews?.review_sections?.length) {
    sections.push({ id: "expertReview", label: "بررسی تخصصی" });
  }

  if (productDetails?.specifications?.length) {
    sections.push({ id: "specification", label: "مشخصات" });
  }

  sections.push({ id: "commentSection", label: "دیدگاه‌ها" });
  sections.push({ id: "questionSection", label: "پرسش‌ها" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      setActiveTab(sections[0].id);
    }
  }, [productDetails]);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      },
      // {
      //   threshold: 0,
      //   rootMargin: "-100px 0px -60% 0px",
      // },
    );
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScrollY) {
        isTabsSticky
          ? (topMegaMenuBanners?.desktop || topMegaMenuBanners?.mobile)?.length
            ? 188
            : 128
          : 68;

        setTopOffset(
          (topMegaMenuBanners?.desktop || topMegaMenuBanners?.mobile)?.length
            ? 168
            : 108,
        );
      } else {
        setTopOffset(
          (topMegaMenuBanners?.desktop || topMegaMenuBanners?.mobile)?.length
            ? 128
            : 68,
        );
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleTabClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = isTabsSticky ? 184 : 68;
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      id="TABS"
      className={styles.tabs_container}
      style={{ top: `${topOffset}px` }}
    >
      <div>
        <ul className={styles.tabs_list}>
          {sections.map(({ id, label }) => (
            <li
              key={id}
              id={`#${id}`}
              className={`${styles.tabs_item} ${
                activeTab === id ? styles.tabs_item_active : ""
              }`}
              onClick={() => handleTabClick(id)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
