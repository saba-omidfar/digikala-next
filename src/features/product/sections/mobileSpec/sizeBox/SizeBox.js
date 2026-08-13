import { useState, useEffect } from "react";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./sizeBox.module.css";

function SizeBox() {
  const { openMobileModal } = useModal();
  const { showSnackbar } = useSnackbar();

  let isValueEnabled = false;

  const {
    trueToSize,
    sizeGuide,
    productDetails,
    productThemes,
    selectedThemes,
    setSelectedThemes,
    activeVariant,
    availableValues,
    selectedColor,
    setAvailableValues,
    setActiveVariant,
  } = useProductContext();

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

  const openSizeModal = (tab) => {
    const selectedSize = selectedThemes?.find(
      (theme) => theme.themeType === "sized",
    )?.themeTitle;

    openMobileModal("size_guide", {
      selectedSize,
      initialTab: tab,
    });
  };

  if (!productThemes?.length || !activeVariant?.size) return;

  return (
    <div className={styles.size_container}>
      <div className={styles.size_header}>
        <span className="d-flex">
          <div
            className={styles.size_selected}
            data-theme-animation="sized-selected"
          >
            <span className={styles.size_text}>
              سایز:{" "}
              {selectedThemes?.find((theme) => theme.themeType === "sized")
                ?.themeTitle ||
                productDetails?.default_variant?.themes?.find(
                  (t) => t.type === "sized",
                )?.value?.title}
            </span>
          </div>
        </span>
      </div>
      <div className="w-100">
        <div className={styles.sizes_container}>
          <div className="pe-2"></div>
          {productThemes
            ?.find((theme) => theme?.type === "sized")
            ?.values?.map((v) => {
              isValueEnabled = availableValues?.some(
                (value) => value.id === v.id,
              );
              return { ...v, isValueEnabled };
            })
            ?.sort((a, b) => {
              if (a.isValueEnabled && !b.isValueEnabled) {
                return -1;
              }
              if (!a.isValueEnabled && b.isValueEnabled) {
                return 1;
              }
              return 0;
            })
            ?.map((v) => {
              return (
                <div
                  key={v.id}
                  style={{ opacity: v.isValueEnabled ? "1" : "0.5" }}
                  className={styles.sizes_content_container}
                >
                  <div
                    key={v?.id}
                    className={`${styles.sizes_content} ${!v.isValueEnabled ? styles.size_content_disabled : ""} ${
                      v?.id ===
                      selectedThemes?.find(
                        (theme) => theme.themeType === "sized",
                      )?.themeId
                        ? styles.sizes_content__selected
                        : ""
                    }`}
                    onClick={() =>
                      v.isValueEnabled
                        ? changeThemeValueHandler(v)
                        : showSnackbar(
                            `این سایز در رنگ ${
                              selectedThemes?.find(
                                (theme) => theme.themeType === "colored",
                              )?.themeTitle
                            } ناموجود است.`,
                          )
                    }
                  >
                    <div className={styles.sizes_text_container}>
                      {v.id ===
                        selectedThemes?.find(
                          (theme) => theme.themeType === "sized",
                        )?.themeId &&
                        v.isValueEnabled && (
                          <div className="d-flex" aria-hidden="false">
                            <svg className={styles.size_icon}>
                              <use href="#done"></use>
                            </svg>
                          </div>
                        )}
                      <span className={styles.sizes_text}>{v?.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Size Guide && True To Size */}
        {productDetails?.has_size_guide ? (
          <button className={styles.size_btn} onClick={() => openSizeModal(1)}>
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              راهنمای اندازه
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.chevron_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
          </button>
        ) : (
          ""
        )}
        {/* True To Size */}
        {productDetails?.has_true_to_size ? (
          trueToSize?.total_count !== 0 && !sizeGuide?.table?.length ? (
            <button
              className={styles.size_btn}
              onClick={() => openSizeModal(2)}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                نظر خریدارها
              </div>
            </button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SizeBox;
