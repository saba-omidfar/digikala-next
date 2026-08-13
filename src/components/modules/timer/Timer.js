"use client";

import React, { useEffect, useState } from "react";

import styles from "./timer.module.css";

const toPersian = (n) =>
  n
    .toString()
    .padStart(2, "0")
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const formatTime = (
  seconds,
  hasBg,
  caption,
  seperator,
  seperatorColor,
  gap,
  width,
  height,
  borderRadius,
  padding,
  margin,
) => {
  if (seconds <= 0) return `${toPersian(0)}:${toPersian(0)}:${toPersian(0)}`;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (hasBg) {
    return (
      <div
        className={styles.timer_container}
        style={{
          gap: gap,
          height: height,
          color: seperatorColor,
        }}
      >
        <div
          className={styles.timer_box}
          style={{
            width: width,
            padding: padding,
            borderRadius: borderRadius,
          }}
        >
          <span className={styles.timer_value}>{toPersian(s)}</span>
          {caption ? <span className={styles.timer_title}>ثانیه</span> : ""}
        </div>
        {seperator ? (
          <div
            className={styles.timer_seperator}
            style={{ color: seperatorColor }}
          >
            :
          </div>
        ) : (
          ""
        )}
        <div
          className={styles.timer_box}
          style={{
            width: width,
            padding: padding,
            borderRadius: borderRadius,
            margin: margin ? margin : "",
          }}
        >
          <span className={styles.timer_value}>{toPersian(m)}</span>
          {caption ? <span className={styles.timer_title}>دقیقه</span> : ""}
        </div>
        {seperator ? (
          <div
            className={styles.timer_seperator}
            style={{ color: seperatorColor }}
          >
            :
          </div>
        ) : (
          ""
        )}
        <div
          className={styles.timer_box}
          style={{
            width: width,
            padding: padding,
            borderRadius: borderRadius,
          }}
        >
          <span className={styles.timer_value}>{toPersian(h)}</span>
          {caption ? <span className={styles.timer_title}>ساعت</span> : ""}
        </div>
      </div>
    );
  } else {
    return `${toPersian(s)} : ${toPersian(m)} : ${toPersian(h)}`;
  }
};

const Timer = ({
  seconds,
  onFinish,
  hasBg,
  caption,
  seperator,
  seperatorColor,
  gap,
  width,
  height,
  borderRadius,
  padding,
  margin,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!seconds) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinish && onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  if (timeLeft <= 0) return null;

  return (
    <div>
      {formatTime(
        timeLeft,
        hasBg,
        caption,
        seperator,
        seperatorColor,
        gap,
        width,
        height,
        borderRadius,
        padding,
        margin,
      )}
    </div>
  );
};

export default Timer;
