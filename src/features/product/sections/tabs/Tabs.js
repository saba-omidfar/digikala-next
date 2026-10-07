"use client";
import { useState, useEffect, useRef } from "react";

import { useGetUniversal } from "@/hooks/useGetUniversal";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./tabs.module.css";

export default function Tabs({ isTabsSticky }) {
  const { productDetails } = useProductContext();
  const { data: topMegaMenuBanners } = useGetUniversal();

  const lastScrollY = useRef(0);
  const [topOffset, setTopOffset] = useState(68);
  const [activeTab, setActiveTab] = useState(null);

  const sections = [];

  const hasTopMegaMenuBanners =
    Boolean(topMegaMenuBanners?.desktop?.length?.length) ||
    Boolean(topMegaMenuBanners?.mobile?.length?.length);

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
      const isScrollingUp = currentScroll < lastScrollY.current;

      if (isScrollingUp) {
        setTopOffset(isTabsSticky ? (hasTopMegaMenuBanners ? 188 : 108) : 68);
      } else {
        setTopOffset(isTabsSticky ? (hasTopMegaMenuBanners ? 128 : 68) : 68);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTabsSticky, hasTopMegaMenuBanners]);

  const handleTabClick = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const offset = isTabsSticky ? (hasTopMegaMenuBanners ? 188 : 128) : 68;

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
