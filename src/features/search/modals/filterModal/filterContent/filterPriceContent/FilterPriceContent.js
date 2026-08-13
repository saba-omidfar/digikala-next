"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import Nouislider from "nouislider-react";

import { useListing } from "@/contexts/ListingContext";

import styles from "./filterPriceContent.module.css";
import "@/styles/slider.css";

export default function FilterPriceContent() {
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  const currentRange = useRef({
    min: 0,
    max: 0,
  });

  const {
    params,
    filterExtra,
    priceInputChangeHandler,
    priceSliderChangeHandler,
    normalizeRange,
  } = useListing();

  const pathname = usePathname();
  const match = pathname.match(/from-(\d+)-up-to-(\d+)/);

  const facetMin = match?.[1];
  const facetMax = match?.[2];

  const priceMin =
    params?.price?.min ?? facetMin ?? filterExtra.filterOptions.min;

  const priceMax =
    params?.price?.max ?? facetMax ?? filterExtra.filterOptions.max;

  const toPrice = (value) => {
    if (value == null || value === "") return "";

    return (Number(value) / 10).toLocaleString("fa-IR");
  };

  const priceSliderSlideHandler = (values, handle) => {
    let min;
    let max;

    if (handle === 0) {
      min = Number(values[0]);
      max = Number(values[1]);
    }

    if (handle === 1) {
      min = Number(values[0]);
      max = Number(values[1]);
    }

    currentRange.current = { min, max };

    if (minInputRef.current) {
      minInputRef.current.value = toPrice(min);
    }

    if (maxInputRef.current) {
      maxInputRef.current.value = toPrice(max);
    }
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const handleInput = (e, name) => {
    const digits = e.target.value.replace(/[^\d]/g, "");

    if (!digits) {
      e.target.value = "";

      const range = {
        ...currentRange.current,
        [name]: undefined,
      };

      priceInputChangeHandler(range);
      return;
    }

    const filterMin = Number(filterExtra.filterOptions.min);
    const filterMax = Number(filterExtra.filterOptions.max);

    const value = clamp(Number(digits) * 10, filterMin, filterMax);

    let { min, max } = currentRange.current;

    if (name === "min") {
      min = value;

      if (min > max) {
        max = min;

        if (maxInputRef.current) {
          maxInputRef.current.value = toPrice(max);
        }
      }
    }

    if (name === "max") {
      max = value;

      if (max < min) {
        min = max;

        if (minInputRef.current) {
          minInputRef.current.value = toPrice(min);
        }
      }
    }

    currentRange.current = {
      min,
      max,
    };

    e.target.value = toPrice(value);

    priceInputChangeHandler({
      min,
      max,
    });
  };

  useEffect(() => {
    currentRange.current = {
      min: Number(priceMin),
      max: Number(priceMax),
    };

    if (minInputRef.current) {
      minInputRef.current.value = toPrice(priceMin);
    }

    if (maxInputRef.current) {
      maxInputRef.current.value = toPrice(priceMax);
    }
  }, [priceMin, priceMax]);

  const sliderMin = Number(filterExtra.filterOptions.min);
  const sliderMax = Number(filterExtra.filterOptions.max);

  const sliderStart = [
    Number(priceMin) || sliderMin,
    Number(priceMax) || sliderMax,
  ];

  return (
    <div className={styles.price_container}>
      {/* Min Input */}
      <div className={styles.min_price_container}>
        <span className={styles.price_range_text}>از</span>
        <label className={styles.price_range_label}>
          <div className={styles.price_range_input_container}>
            <div className="flex-grow-1">
              <input
                name="min"
                type="text"
                inputMode="numeric"
                ref={minInputRef}
                defaultValue={toPrice(priceMin)}
                className={styles.price_range_input}
              />
            </div>
          </div>
        </label>
        <div className="d-flex" aria-hidden="false">
          <svg className={styles.price_icon}>
            <use href="#toman"></use>
          </svg>
        </div>
      </div>

      {/* Max Input */}
      <div className={styles.max_price_container}>
        <span className={styles.price_range_text}>تا</span>
        <label className={styles.price_range_label}>
          <div className={styles.price_range_input_container}>
            <div className="flex-grow-1">
              <input
                name="max"
                type="text"
                inputMode="numeric"
                ref={maxInputRef}
                defaultValue={toPrice(priceMax)}
                className={styles.price_range_input}
              />
            </div>
          </div>
        </label>
        <div className="d-flex" aria-hidden="false">
          <svg className={styles.price_icon}>
            <use href="#toman"></use>
          </svg>
        </div>
      </div>

      {/* Slider */}

      <div className={styles.nouislider_container}>
        <div className={styles.nouislider}>
          <Nouislider
            className="price-slider"
            direction="rtl"
            connect
            start={sliderStart}
            range={{
              min: sliderMin,
              max: sliderMax,
            }}
            behaviour="tap-drag"
            step={10000}
            animate
            animationDuration={300}
            onSlide={(values, handle) =>
              priceSliderSlideHandler(values, handle)
            }
            onChange={priceSliderChangeHandler}
            pips={{
              mode: "count",
              values: 6,
              density: 100,
            }}
            clickablePips
          />
        </div>
      </div>
      {/* <div className={styles.nouislider_container}>
        <PriceSlider
          start={sliderStart}
          min={sliderMin}
          max={sliderMax}
          onSlide={priceSliderSlideHandler}
          onChange={priceSliderChangeHandler}
        />
      </div> */}

      <div className={styles.price_range_caption}>
        <span>ارزانترین</span>
        <span>گرانترین</span>
      </div>
    </div>
  );
}
