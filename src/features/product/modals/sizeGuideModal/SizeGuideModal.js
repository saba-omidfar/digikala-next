import { useState } from "react";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./sizeGuideModal.module.css";

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

export default function SizeGuideModal({ selectedSize, initialTab = 1 }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const { closeModal } = useModal();
  const {
    trueToSize,
    trueToSizeLoading,
    sizeGuide,
    sizeGuideIsLoading,
    productDetails,
    productThemes,
  } = useProductContext();

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header_container}>
        <div className={styles.modal_header}>
          <div className={styles.modal_header__title}>
            سایز:{" "}
            {selectedSize ||
              productDetails?.default_variant?.themes?.find(
                (t) => t.type === "sized",
              )?.value?.title}
          </div>
          <div
            className="d-flex"
            aria-hidden={false}
            onClick={() => {
              setActiveTab(null);
              closeModal();
            }}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.modal_close_btn}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>

      <>
        {!sizeGuideIsLoading && (
          <div className={styles.modal_content_container}>
            <div className={styles.modal_content}>
              {/* Tabs */}
              {productDetails?.has_size_guide &&
              productDetails?.has_true_to_size ? (
                <>
                  {/* Tabs */}
                  <div
                    className={styles.tabs_container}
                    id="SIZE_GUIDE_MODAL_TAB_CONTAINER"
                  >
                    <>
                      {productThemes?.length && (
                        <div
                          className={`${styles.tab} ${activeTab === 1 ? styles.tab_active : ""}`}
                          onClick={() => setActiveTab(1)}
                        >
                          راهنمای اندازه
                          <div
                            className={`${styles.tab_bottom} ${
                              activeTab === 1 ? styles.tab_bottom__active : ""
                            }`}
                            style={{
                              width: `calc(100% - 36px)`,
                              right: "18px",
                            }}
                          ></div>
                        </div>
                      )}
                      {trueToSize?.total_count !== 0 && (
                        <div
                          className={`${styles.tab} ${activeTab === 2 && styles.tab_active}`}
                          onClick={() => setActiveTab(2)}
                        >
                          نظر خریدارها
                          <div
                            className={`${styles.tab_bottom} ${
                              activeTab === 2 ? styles.tab_bottom__active : ""
                            }`}
                            style={{
                              width: `calc(100% - 36px)`,
                              right: "18px",
                            }}
                          ></div>
                        </div>
                      )}
                    </>
                  </div>
                  {activeTab ? <span className={styles.space}></span> : ""}
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
                    </>
                  )}

                  {/* {sizeGuide?.table?.length ? (
                  <div className={styles.modal_table}>
                    <div className="w-100 overflow-auto">
                      <table className={styles.modal_table_collapse}>
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
                      </table>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
                </div>
              ) : (
                ""
              )}

              {activeTab == 2 ? (
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
                                  style={{ width: `${v.value * 0.3145}%` }}
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
            </div>
          </div>
        )}
      </>

      <div
        className={styles.modal_footer}
        onClick={() => {
          setActiveTab(null);
          closeModal();
        }}
      >
        <div className={styles.modal_footer_btn}>متوجه شدم</div>
      </div>
    </div>
  );
}
