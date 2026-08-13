import { useState } from "react";

import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./sizeAndReviewModal.module.css";

function getSizeLabel(key) {
  switch (key) {
    case "tooBig":
      return "خیلی بزرگ‌تر";

    case "big":
      return "کمی بزرگ‌تر";

    case "fit":
      return "مطابق انتظار";

    case "small":
      return "کمی کوچک‌تر";

    case "tooSmall":
      return "خیلی کوچک‌تر";

    default:
      break;
  }
}

export default function SizeAndReviewModal({ initialTab = 1, selectedSize }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const { closeMobileModal } = useModal();
  const {
    trueToSize,
    trueToSizeLoading,
    sizeGuide,
    sizeGuideIsLoading,
    productDetails,
  } = useProductContext();

  const handleDismiss = () => {
    setActiveTab(null);
    closeMobileModal();
  };

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      snapPoints={({ maxHeight }) => [maxHeight]}
      defaultSnap={({ maxHeight }) => maxHeight}
      header={
        <div className={styles.header}>
          <span className={styles.header_title}>
            سایز:{" "}
            {selectedSize ||
              productDetails?.default_variant?.themes?.find(
                (t) => t.type === "sized",
              )?.value?.title}
          </span>
          <div className="d-flex" onClick={handleDismiss}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
      footer={
        <div className={styles.modal_footer_btn} onClick={handleDismiss}>
          متوجه شدم
        </div>
      }
    >
      {productDetails?.has_size_guide && productDetails?.has_true_to_size ? (
        <>
          {" "}
          <div
            className={styles.tabs_container}
            id="SIZE_GUIDE_MODAL_TAB_CONTAINER"
          >
            {productDetails?.has_size_guide ? (
              <div
                className={`${styles.tab} ${activeTab === 1 ? styles.tab_active : ""}`}
                onClick={() => setActiveTab(1)}
              >
                راهنمای اندازه
                <div
                  className={`${styles.tab_bottom} ${
                    activeTab === 1 ? styles.tab_bottom__active : ""
                  }`}
                  style={{ width: `calc(100% - 36px)`, right: "18px" }}
                ></div>
              </div>
            ) : (
              ""
            )}
            {productDetails?.has_true_to_size && (
              <div
                className={`${styles.tab} ${activeTab === 2 && styles.tab_active}`}
                onClick={() => setActiveTab(2)}
              >
                نظر خریدارها
                <div
                  className={`${styles.tab_bottom} ${
                    activeTab === 2 ? styles.tab_bottom__active : ""
                  }`}
                  style={{ width: `calc(100% - 36px)`, right: "18px" }}
                ></div>
              </div>
            )}
          </div>
          <span className={styles.space}></span>
        </>
      ) : (
        ""
      )}

      {activeTab === 1 ? (
        <div className={styles.size_content}>
          {!sizeGuideIsLoading && (
            <>
              {!sizeGuideIsLoading && sizeGuide?.image ? (
                <div
                  aria-hidden="false"
                  aria-label={sizeGuide?.title}
                  className={styles.modal_img_container}
                >
                  <img
                    className={styles.modal_img}
                    src={sizeGuide.image}
                    alt={sizeGuide?.title}
                    title=""
                  />
                </div>
              ) : (
                ""
              )}
              {/* {!sizeGuideIsLoading && productDetails?.has_size_guide ? (
                <div className={styles.modal_table}>
                  <div className="w-100 overflow-auto">
                    <table className={styles.modal_table_collapse}>
                      <tbody>
                        <tr>
                          {sizeGuide?.table?.[0]?.map((head, index) => (
                            <th className={styles.modal_table_head} key={index}>
                              {head}
                            </th>
                          ))}
                        </tr>
                        {sizeGuide?.table?.slice(1)?.map((row, rowIndex) => (
                          <tr className={styles.modal_table_row} key={rowIndex}>
                            {row?.map((cell, cellIndex) => (
                              <td
                                className={styles.modal_table_row_text}
                                key={cellIndex}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                ""
              )} */}
            </>
          )}
        </div>
      ) : (
        ""
      )}

      {activeTab === 2 ? (
        <>
          {!trueToSizeLoading ? (
            <div className={styles.review_content}>
              <p className={styles.review_title}>
                از خریداران پرسیدیم آیا اندازه کالا طبق انتظارشان بود؟
              </p>
              <div className={styles.review_items}>
                {trueToSize?.values?.map((v) => (
                  <div
                    key={v.key}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <p className={styles.review_item_title}>
                      {getSizeLabel(v.key)}
                    </p>
                    <div className={styles.progress_container}>
                      <div className={styles.progress}>
                        <div className={styles.progress_inactive}></div>
                        <div
                          className={styles.progress_active}
                          style={{ width: `${v.value}%` }}
                        ></div>
                      </div>
                      <p className={styles.progress_caption}>
                        {toPersianDigits(v.value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </BottomSheet>
  );
}
