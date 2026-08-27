"use client";

import { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import Image from "next/image";

import SizeGuideModal from "@/features/product/modals/sizeGuideModal/SizeGuideModal";
import ShippingToday from "./shippingToday/ShippingToday";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import scrollToSection from "@/utils/scrollToSection";
import toPersianDigits from "@/utils/toPersianDigits";
import isLightColor from "@/utils/isLightColor";

import styles from "./variantInfo.module.css";
import { useCartContext } from "@/contexts/CartContext";

function VariantInfo() {
  let isValueEnabled = false;
  const { openModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const {
    productDetails,
    questionsData,
    commentsData,
    activeVariant,
    productThemes,
    selectedThemes,
    setSelectedThemes,
    availableValues,
    setAvailableValues,
    setIsSelectedColor,
    setActiveVariant,
    selectedColor,
    setSelectedColor,
    trueToSize,
  } = useProductContext();

  const { basket } = useCartContext();

  const [openTooltipId, setOpenTooltipId] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "bottom",

      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top"],
          },
        },
      ],
    },
  );

  const handleOpenModal = (tab) => {
    openModal(
      <SizeGuideModal
        initialTab={tab}
        selectedSize={
          activeVariant?.themes?.find((theme) => theme.type === "sized")?.value
            ?.title
        }
      />,
      { name: "size-guide", className: "modal__size_guide rounded-medium" },
    );
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

    setSelectedThemes(
      mainVariant?.themes?.map((theme) => ({
        themeType: theme.type,
        themeHexCode: theme.value.hex_code,
        themeId: theme.value.id,
        themeSortOrder: theme.value.sort_order,
        themeTitle: theme.value.title,
        themeVariantId: theme.value.variant_id,
      })),
    );

    setActiveVariant(mainVariant);
  };

  const getAvailableValuesForTheme = (v) => {
    if (!productDetails?.default_variant?.size) return;

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

  const basketVariant = basket?.find(
    (item) => item.product.id === productDetails?.id,
  );

  const basketSizeId = basketVariant?.variant?.themes?.find(
    (theme) => theme.type === "sized",
  )?.value?.id;

  return (
    <div id="variant" className={styles.variant_info}>
      {/* Eng Title */}
      {productDetails?.title_en && (
        <>
          <div className="align-items-center d-flex">
            <span className={styles.variant_info_enTitle_text}>
              {productDetails?.title_en}
            </span>
          </div>
        </>
      )}

      {/* Line */}
      <div className={styles.variant_info_enTitle_line}></div>

      {/* Rating */}
      {productDetails?.rating?.rate ||
      productDetails?.comments_overview ||
      productDetails?.comments_count ||
      productDetails?.questions_count ? (
        <div className={styles.variant_header_container}>
          <div className="d-flex align-items-center">
            {productDetails?.rating?.rate ? (
              <div className="d-flex align-items-center">
                <div className={styles.variant_info_icon}>
                  <Image
                    width={16}
                    height={16}
                    src="/images/png/star-yellow.webp"
                    alt="امتیاز"
                  />
                </div>
                <p className={styles.variant_info_score}>
                  {toPersianDigits(
                    Math.round((productDetails?.rating?.rate / 100) * 5 * 10) /
                      10,
                  )}
                </p>
                <p className={styles.variant_info_text}>
                  {`(امتیاز ${toPersianDigits(
                    productDetails?.rating?.count,
                  )} خریدار)`}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.variant_info_feedback}>
            <div
              className="d-flex align-items-center w-100"
              style={{ gap: "6px" }}
            >
              {productDetails?.comments_count &&
              productDetails?.comments_overview ? (
                <span
                  className={styles.variant_info_summary_comments}
                  id="comments-abovefold"
                  onClick={() => scrollToSection("commentSection", 220)}
                >
                  <span>
                    <span className={styles.variant_info_summary_comments_text}>
                      <div className="d-flex align-items-center ms-1">
                        <div
                          data-icon-name="cube-action-ai-all"
                          data-icon="&#xEB79;"
                          className={`${styles.variant_info_summary_comments_icon} cube-font-icon`}
                        ></div>
                      </div>
                      خلاصه دیدگاه‌ها
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
              {productDetails?.comments_count ? (
                <div className="d-flex align-items-center">
                  <span
                    className={styles.variant_info_comments}
                    id="comments-abovefold"
                    onClick={() => scrollToSection("commentSection", 220)}
                  >
                    <span>
                      <span className={styles.variant_info_comments_text}>
                        {toPersianDigits(commentsData?.pager?.total_items)}{" "}
                        دیدگاه{" "}
                        {/* {toPersianDigits(productDetails?.comments_count)} دیدگاه */}
                        <div className="d-flex align-items-center">
                          <div
                            data-icon-name="cube-arrow-left"
                            data-icon="&#xE9C2;"
                            className={`${styles.variant_info_comments_icon} cube-font-icon`}
                          ></div>
                        </div>
                      </span>
                    </span>
                  </span>
                </div>
              ) : (
                ""
              )}
              {productDetails?.questions_count ? (
                <span
                  className={styles.variant_info_questions}
                  id="questions-abovefold"
                  onClick={() => scrollToSection("questionSection", 220)}
                >
                  <span>
                    <span className={styles.variant_info_questions_text}>
                      {toPersianDigits(questionsData?.pager?.total_items)}{" "}
                      {/* {productDetails?.questions_count?.toLocaleString("fa-IR")}{" "} */}
                      پرسش
                      <div className="d-flex align-items-center">
                        <div
                          data-icon-name="cube-arrow-left"
                          data-icon="&#xE9C2;"
                          className={`${styles.variant_info_questions_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Colors */}
      {productDetails?.colors?.length ? (
        <div className={styles.variation_colors_container}>
          <div className="d-flex flex-column" style={{ gap: "12px" }}>
            <div className={styles.variation_colors_header_title}>
              <div className="d-flex">
                <div
                  className="d-flex flex-column justify-content-center align-items-start"
                  style={{ gap: "2px" }}
                >
                  <div
                    className="d-flex align-items-center flex-wrap"
                    style={{ gap: "2px" }}
                  >
                    <span className={styles.variation_colors_header_text}>
                      رنگ:
                    </span>
                    <div className={styles.variation_colors_header_color}>
                      <span>
                        {
                          activeVariant?.themes?.find(
                            (theme) => theme.type === "colored",
                          )?.value?.title
                        }
                      </span>
                      <span
                        className={styles.variation_color_circle}
                        style={{
                          backgroundColor: `${
                            activeVariant?.themes?.find(
                              (theme) => theme.type === "colored",
                            )?.value?.hex_code
                          }`,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100">
              <div className={styles.variation_colors}>
                {productThemes
                  ?.find((theme) => theme.type === "colored")
                  ?.values?.map((v) => (
                    <div key={v?.id} className={styles.variation_color_box}>
                      <div
                        className={`${styles.variation_color} ${
                          v.id ===
                          activeVariant?.themes?.find(
                            (theme) => theme.type === "colored",
                          )?.value?.id
                            ? styles.variation_color__selected
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
                          ref={
                            openTooltipId === v.id ? setReferenceElement : null
                          }
                          className={styles.variation_color_text}
                          onMouseEnter={() => setOpenTooltipId(v.id)}
                          onMouseLeave={() => setOpenTooltipId(null)}
                        >
                          <div>
                            <div className="d-flex align-items-center">
                              <div
                                className={`${styles.variation_color_content} ${
                                  v.id ===
                                    activeVariant?.themes?.find(
                                      (theme) => theme.type === "colored",
                                    )?.value?.id &&
                                  styles.variation_color_active
                                }`}
                              >
                                <div
                                  className={
                                    styles.variation_color_content_main
                                  }
                                  style={{
                                    background: v?.hex_code,
                                  }}
                                >
                                  {v.id ===
                                    activeVariant?.themes?.find(
                                      (theme) => theme.type === "colored",
                                    )?.value?.id && (
                                    <div className="d-flex" aria-hidden="false">
                                      <svg
                                        className={styles.variation_icon}
                                        style={{
                                          fill: isLightColor(
                                            activeVariant?.themes?.find(
                                              (theme) =>
                                                theme.type === "colored",
                                            )?.value?.hex_code,
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
                              </div>
                            </div>
                          </div>
                        </div>
                        {openTooltipId === v.id && (
                          <div
                            ref={setPopperElement}
                            style={popperStyles.popper}
                            {...attributes.popper}
                            className={`${openTooltipId ? "tooltip__active" : "tooltip__inactive"} color_tooltip`}
                          >
                            {v?.title}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/*  Size */}
      {productDetails?.has_true_to_size ? (
        <div className={styles.size_container}>
          <div className={styles.size_content}>
            <div className="w-100 d-flex justify-content-between align-items-start">
              {productDetails?.default_variant?.size ? (
                <span className="d-flex">
                  <div
                    className={styles.size_title_container}
                    data-theme-animation="sized-selected"
                  >
                    <span className={styles.size_title}>
                      سایز:{" "}
                      {selectedThemes?.find(
                        (theme) => theme.themeType === "sized",
                      )?.themeTitle ||
                        productDetails?.default_variant?.themes?.find(
                          (t) => t.type === "sized",
                        )?.value?.title}
                    </span>
                  </div>
                </span>
              ) : (
                ""
              )}

              {/* Size Guide */}
              {productDetails?.has_size_guide ? (
                <button
                  className={styles.size_btn__text}
                  onClick={() => handleOpenModal(1)}
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    راهنمای اندازه
                  </div>
                </button>
              ) : (
                ""
              )}
              {/* True To Size */}
              {productDetails?.has_true_to_size &&
              !productDetails?.has_size_guide &&
              trueToSize?.total_count !== 0 ? (
                <button
                  className={styles.true_to_size_btn}
                  onClick={() => handleOpenModal(2)}
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    نظر خریدارها
                  </div>
                </button>
              ) : (
                ""
              )}
            </div>

            {/* Sizes */}
            <div className="w-100">
              <div className={styles.sizes_container}>
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
                            activeVariant?.themes?.find(
                              (theme) => theme.type === "sized",
                            )?.value?.id
                              ? styles.sizes_content__selected
                              : ""
                          }`}
                          onClick={() =>
                            v.isValueEnabled
                              ? changeThemeValueHandler(v)
                              : showSnackbar(
                                  `این سایز در رنگ ${
                                    activeVariant?.themes?.find(
                                      (theme) => theme.type === "colored",
                                    )?.value?.title
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
                            <span className={styles.sizes_text}>
                              {v?.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <ShippingToday />
    </div>
  );
}

export default VariantInfo;
