"use client";

import { useEffect, useRef, useState } from "react";

import PlusHeader from "@/features/plus/sections/plusHeader/PlusHeader";
import PlusTitle from "@/features/plus/sections/plusTitle/PlusTitle";
import MobileBuySubscriptionPlan from "@/features/plus/sections/mobileBuySubscriptionPlan/MobileBuySubscriptionPlan";
import BuySubscriptionPlan from "@/features/plus/sections/buySubscriptionPlan/BuySubscriptionPlan";
import PlusFeatures from "@/features/plus/sections/PlusFeatures/PlusFeatures";
import BuySubscriptionBtn from "@/features/plus/sections/buySubscriptionBtn/BuySubscriptionBtn";
import PlusService from "@/features/plus/sections/plusService/PlusService";
import PlusQuestions from "@/features/plus/sections/plusQuestions/PlusQuestions";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./plusContent.module.css";

export default function PlusContent() {
  const btnRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  const { isSmallScreen } = useScreenStatus();

  useEffect(() => {
    if (!isSmallScreen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // sentinel دیده می‌شود → دکمه معمولی
        if (entry.isIntersecting) {
          setIsFixed(false);
          return;
        }

        // sentinel بالاتر از viewport رفته → دکمه fixed
        if (entry.boundingClientRect.top < 0) {
          setIsFixed(true);
        }
      },
      {
        threshold: 0,
      },
    );

    if (btnRef.current) {
      observer.observe(btnRef.current);
    }

    return () => observer.disconnect();
  }, [isSmallScreen]);

  return (
    <div className={styles.plus_bg}>
      <PlusHeader />
      <PlusTitle />

      <MobileBuySubscriptionPlan />
      <BuySubscriptionPlan />

      <div ref={btnRef} className={styles.subscription_sentinel} />
      <PlusFeatures />

      <div className={styles.buy_subscription_btn}>
        <BuySubscriptionBtn isFixed={isSmallScreen ? isFixed : false} />
      </div>

      <PlusService />

      <div
        className={styles.content}
        style={{ marginBottom: isFixed ? 94 : 40 }}
      >
        <h3 className={styles.title}>سوالات متداول</h3>
        <PlusQuestions />
      </div>
    </div>
  );
}
