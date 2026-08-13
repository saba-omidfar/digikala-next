"use client";

import { useEffect } from "react";

import { useProductContext } from "@/contexts/ProductContext";
import isLightColor from "@/utils/isLightColor";

import styles from "./colorBox.module.css";

function ColorBox() {
  const {
    productDetails,
    productThemes,
    selectedThemes,
    activeVariant,
    setActiveVariant,
    selectedColor,
    setSelectedColor,
    setIsSelectedColor,
    setSelectedThemes,
    setAvailableValues,
  } = useProductContext();

  const backgroundColor = selectedThemes?.find(
    (theme) => theme.themeType === "colored",
  )?.themeHexCode;

  const changeThemeValueHandler = (v) => {
    let mainVariant = null;

    if (v.hex_code) {
      mainVariant = productDetails?.variants?.find(
        (variant) => variant.id === v.variant_id,
      );
    } else {
      const variantId = Number(String(selectedColor.id) + String(v.id));
      mainVariant = productDetails?.variants?.find(
        (v) => v.size.id === variantId,
      );
    }

    const newSelectedTheme = mainVariant?.themes?.map((theme) => {
      return {
        themeType: theme.type,
        themeHexCode: theme.value.hex_code,
        themeId: theme.value.id,
        themeSortOrder: theme.value.sort_order,
        themeTitle: theme.value.title,
        themeVariantId: theme.value.variant_id,
      };
    });

    setSelectedThemes(newSelectedTheme);
    setActiveVariant(mainVariant);
  };

  const getAvailableValuesForTheme = (v) => {
    if (!activeVariant?.size) return;

    const availableValues = [];

    productDetails?.variants
      ?.map((v) => v.themes)
      ?.map((values) => {
        values?.map((val) => {
          if (val.type === "colored" && val?.value?.hex_code === v?.hex_code) {
            const mainValue = values.find(
              (value) => value.type === "sized",
            ).value;

            const exists = availableValues?.some((x) => x?.id === mainValue.id);
            if (!exists) availableValues.push(mainValue);
          }
        });
      });

    setAvailableValues(availableValues);
  };

  useEffect(() => {
    const allThemes = productDetails?.default_variant?.themes?.map(
      (variant) => ({
        themeType: variant.type,
        themeHexCode: variant.value.hex_code,
        themeId: variant.value.id,
        themeSortOrder: variant.value.set_order,
        themeTitle: variant.value.title,
        themeVariantId: variant.value.variant_id,
      }),
    );

    setSelectedThemes(allThemes);
  }, [productDetails]);

  useEffect(() => {
    if (!productDetails?.default_variant?.size) return;

    const availableValuesArray = [];

    productDetails?.variants
      ?.map((v) => v.themes)
      ?.map((values) => {
        values?.map((val) => {
          if (
            val.type === "colored" &&
            val?.value?.hex_code ===
              (productDetails?.default_variant?.themes).find(
                (theme) => theme.type === "colored",
              )?.value?.hex_code
          ) {
            const mainValue = values.find(
              (value) => value.type === "sized",
            ).value;

            const exists = availableValuesArray?.some(
              (x) => x?.id === mainValue.id,
            );
            if (!exists) availableValuesArray?.push(mainValue);
          }
        });
      });
    setAvailableValues(availableValuesArray);
  }, [productDetails]);

  if (!activeVariant?.color) return;

  return (
    <div className={styles.variant}>
      <div className={styles.color_container}>
        <span className="d-flex">
          <div className={styles.color_selected}>
            <span className={styles.color_title_container}>
              <span className={styles.color_title}>رنگ:</span>
              <div className={styles.color_name}>
                <span>
                  {selectedThemes?.find(
                    (theme) => theme.themeType === "colored",
                  )?.themeTitle ||
                    productDetails?.default_variant?.themes?.find(
                      (t) => t.type === "colored",
                    )?.value?.title}
                </span>
                {backgroundColor && (
                  <span
                    className={styles.color_circle}
                    style={{
                      background: backgroundColor,
                    }}
                  ></span>
                )}
              </div>
            </span>
          </div>
        </span>
      </div>
      <div className="w-100">
        <div className={styles.variation_colors}>
          <div className="pe-2"></div>
          {productThemes
            ?.find((theme) => theme.type === "colored")
            ?.values?.map((v) => (
              <div key={v?.id} className={styles.variation_color_box}>
                <div
                  className={`${styles.variation_color} ${
                    v?.title ===
                    selectedThemes?.find(
                      (theme) => theme.themeType === "colored",
                    )?.themeTitle
                      ? styles.variation_color_active
                      : ""
                  }`}
                  onClick={() => {
                    setIsSelectedColor(true);
                    setSelectedColor(v);
                    getAvailableValuesForTheme(v);
                    changeThemeValueHandler(v);
                  }}
                >
                  <div
                    className={styles.variation_colors_circle}
                    style={{
                      background: v?.hex_code,
                    }}
                  >
                    {v?.title ===
                      selectedThemes?.find(
                        (theme) => theme.themeType === "colored",
                      )?.themeTitle && (
                      <div className="d-flex" aria-hidden="false">
                        <svg
                          className={styles.variation_icon}
                          style={{
                            fill: isLightColor(
                              selectedThemes?.find(
                                (theme) => theme.themeType === "colored",
                              )?.themeHexCode,
                            )
                              ? "#000"
                              : "#fff",
                          }}
                        >
                          <use href="#done"></use>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={styles.variation_color_text}>
                    {v?.title}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ColorBox;
