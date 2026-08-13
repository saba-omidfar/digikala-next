import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ScrollTrigger } from "@/lib/gsap";

import styles from "./stickyTabs.module.css";

export default function StickyTabs() {
  const sections = [
    { id: "SPEC", label: "مشخصات" },
    { id: "REVIEW", label: "بررسی تخصصی" },
    { id: "COMMENTS", label: "دیدگاه و پرسش" },
    { id: "SUGGESTION", label: "پیشنهاد ما" },
  ];

  const tabsRef = useRef({});

  const tabContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("SPEC");
  const [showHeader, setShowHeader] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: "74px",
    right: "16px",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const activeTabElement = tabsRef.current[activeTab];
    const container = tabContainerRef.current;

    if (activeTabElement && container) {
      const { offsetWidth, offsetLeft } = activeTabElement;

      const containerRight = container.offsetWidth - (offsetLeft + offsetWidth);

      setIndicatorStyle({
        width: `${offsetWidth}px`,
        right: `${containerRight}px`,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    const triggers = sections.map(({ id }) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 80px",

        onEnter: () => {
          setActiveTab(id);
        },

        onEnterBack: () => {
          setActiveTab(id);
        },
      });
    });

    const headerTrigger = ScrollTrigger.create({
      trigger: "#SPEC",
      start: "top 80px",

      onEnter: () => setShowHeader(true),
      onLeaveBack: () => setShowHeader(false),
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      headerTrigger.kill();
    };
  }, []);

  const OFFSET = 80;

  const handleTabClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      window.scrollTo({
        top: rect.top + scrollTop - OFFSET,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={styles.header_fixed_container}
      style={{
        transition: "opacity 0s ease-in-out",
        opacity: showHeader ? "1" : "0",
        pointerEvents: showHeader ? "auto" : "none",
      }}
    >
      <div
        className={styles.header_fixed}
        id="TAB_CONTAINER"
        ref={tabContainerRef}
      >
        <div className={styles.padding_right}></div>
        {sections.map(({ id, label }) => (
          <div
            key={id}
            id={`${id}_tab`}
            ref={(el) => (tabsRef.current[id] = el)}
            className={`${styles.header_fixed_tab} ${
              activeTab === id ? styles.header_fixed_tab_active : ""
            }`}
            onClick={() => handleTabClick(id)}
          >
            {label}
          </div>
        ))}
        <div className={styles.padding_right}></div>
        <div
          className={styles.header_fixed_tab_active_bottom}
          style={{
            transition: "0.1s ease-in-out",
            ...indicatorStyle,
          }}
        ></div>
      </div>
    </div>
  );
}
