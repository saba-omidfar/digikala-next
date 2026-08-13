import { Fragment, useState } from "react";

import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import toPersianDigits from "@/utils/toPersianDigits";
import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./mobileSpecDetailsModalDetailsModal.module.css";

export default function MobileSpecDetailsModal({ initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const { productDetails } = useProductContext();
  const { closeMobileModal } = useModal();

  const handleDismiss = () => {
    setActiveTab(null);
    closeMobileModal();
  };

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      snapPoints={({ maxHeight }) => [0.6 * maxHeight, maxHeight]}
      header={
        <div className={styles.header}>
          <span className={styles.header_title}>مشخصات و بررسی کالا</span>
          <div className="d-flex" onClick={handleDismiss}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
    >
      <div className={styles.content}>
        {/* Tabs */}
        <div className={styles.tabs_container}>
          {/* معرفی کالا */}
          {productDetails?.review?.description?.length ? (
            <div
              className={`${styles.tab} ${
                activeTab === 0 && styles.tab_active
              }`}
              onClick={() => setActiveTab(0)}
            >
              معرفی کالا
              <div
                className={`${styles.tab_bottom} ${
                  activeTab === 0 && styles.tab_bottom__active
                }`}
                style={{ width: "96%", right: "2%" }}
              ></div>
            </div>
          ) : (
            ""
          )}

          {/* بررسی تخصصی */}
          {productDetails?.expert_reviews?.review_sections?.length ? (
            <div
              className={`${styles.tab} ${
                activeTab === 1 && styles.tab_active
              }`}
              onClick={() => setActiveTab(1)}
            >
              بررسی تخصصی
              <div
                className={`${styles.tab_bottom} ${
                  activeTab === 1 && styles.tab_bottom__active
                }`}
                style={{ width: "96%", right: "2%" }}
              ></div>
            </div>
          ) : (
            ""
          )}

          {/* جدول مشخصات */}
          {productDetails?.specifications?.length && (
            <div
              className={`${styles.tab} ${
                activeTab === 2 && styles.tab_active
              }`}
              onClick={() => setActiveTab(2)}
            >
              جدول مشخصات
              <div
                className={`${styles.tab_bottom} ${
                  activeTab === 2 && styles.tab_bottom__active
                }`}
                style={{ width: "96%", right: "2%" }}
              ></div>
            </div>
          )}
        </div>
        <span className={styles.space}></span>

        {/* Content */}
        {activeTab === 0 ? (
          <div className={styles.tab_content}>
            <p className={styles.review_product_text}>
              {productDetails?.review?.description}
            </p>
            <div className="d-flex gap-2 overflow-auto hide-scrollbar w-100 px-3"></div>
          </div>
        ) : (
          ""
        )}

        {activeTab === 1 ? (
          <div className="px-3">
            {productDetails?.expert_reviews?.review_sections?.map(
              (reviewSection, index) => {
                return (
                  <section className={styles.review_section} key={index}>
                    <div className={styles.product_content_title_container}>
                      <div className="d-flex align-items-center flex-grow-1">
                        <p className={styles.product_content_title}>
                          <span className="position-relative">
                            {reviewSection?.title}
                          </span>
                        </p>
                      </div>
                    </div>
                    {reviewSection?.sections?.map((section, index) => (
                      <div key={index}>
                        {/* Text */}
                        {section.template === "text" && (
                          <div className={styles.review_section_text_content}>
                            <div className="mb-4">
                              <p
                                className={styles.section_text}
                                dir="rtl"
                                dangerouslySetInnerHTML={{
                                  __html: section.text || "",
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Image-Text */}
                        {section.template === "image-text" && (
                          <div className={styles.review_section_img_content}>
                            <div className="d-flex justify-content-center">
                              <div
                                className={styles.section_img_container}
                                aria-hidden="true"
                                aria-label=""
                              >
                                <img
                                  className={styles.section_img}
                                  src={section.image}
                                  alt=""
                                  title=""
                                />
                              </div>
                            </div>
                            <div className={styles.review_section_img_content}>
                              <div className={styles.section_text_container}>
                                <p
                                  className={styles.section_text}
                                  dir="rtl"
                                  dangerouslySetInnerHTML={{
                                    __html: section.text || "",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Text-Image */}
                        {section.template === "text-image" && (
                          <div className={styles.review_section_img_content}>
                            <div className="d-flex justify-content-center">
                              <p
                                className={styles.section_text}
                                dir="rtl"
                                dangerouslySetInnerHTML={{
                                  __html: section.text || "",
                                }}
                              />
                            </div>
                            <div className={styles.review_section_img_content}>
                              <div className="d-flex justify-content-center mt-4 me-4">
                                <div
                                  className={styles.section_img_text_container}
                                  aria-hidden="true"
                                  aria-label=""
                                >
                                  <img
                                    className={styles.section_img_text}
                                    src={section.image}
                                    alt=""
                                    title=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Image */}
                        {section.template === "image" && (
                          <div className="d-flex justify-content-center mb-4">
                            <div
                              className={styles.section_img_container}
                              aria-hidden="true"
                              aria-label=""
                            >
                              <img
                                className={styles.section_img}
                                src={section.image}
                                alt=""
                                title=""
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </section>
                );
              },
            )}
          </div>
        ) : (
          ""
        )}

        {activeTab === 2 ? (
          <div className={styles.review_product_table_container}>
            {productDetails?.specifications?.map((spec, specIndex) => (
              <Fragment key={specIndex}>
                {/* title */}
                <p className={styles.review_product_title}>{spec.title}</p>

                {/* table */}
                <table className={styles.review_product_table}>
                  <tbody>
                    {spec.attributes?.map((attr, attrIndex) => (
                      <tr
                        key={attrIndex}
                        className={styles.review_product_table_tr}
                      >
                        <th className={styles.review_product_table_th}>
                          {attr.title}
                        </th>
                        <td className={styles.review_product_table_td}>
                          {toPersianDigits(
                            Array.isArray(attr.values)
                              ? attr.values.join("، ")
                              : attr.values,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fragment>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </BottomSheet>
  );
}
