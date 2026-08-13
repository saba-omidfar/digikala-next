import React from "react";

import InfoSection from "../infoSection/InfoSection";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./review.module.css";

function Review() {
  const { productDetails } = useProductContext();
  const { openMobileModal } = useModal();

  const handleOpenModal = (tabIndex) => {
    openMobileModal("spec-details", {
      initialTab: tabIndex,
    });
  };

  const expertReview = productDetails?.expert_reviews?.review_sections?.length;

  if (!productDetails?.expert_reviews) return;

  return (
    <section id="REVIEW">
      <hr className="line-8" />

      {expertReview ? (
        <InfoSection
          title="بررسی تخصصی"
          id="review"
          onClick={() => handleOpenModal(1)}
        >
          <div className="w-100">
            <div className="d-flex flex-column w-100 align-items-center gap-3">
              <div className="w-100 d-flex flex-column align-items-start gap-1">
                <h4 className={styles.expert_review_title}>
                  {productDetails?.expert_reviews?.review_sections?.[0]?.title}
                </h4>

                {productDetails?.expert_reviews?.review_sections
                  ?.slice(0, 1)
                  ?.map((reviewSection, index) => {
                    return (
                      <React.Fragment key={index}>
                        {reviewSection?.sections?.map(
                          (section, reviewIndex) => (
                            <div key={reviewIndex}>
                              {section.template === "text" && (
                                <p
                                  className={styles.expert_review_description}
                                  dir="rtl"
                                  dangerouslySetInnerHTML={{
                                    __html: section.text || "",
                                  }}
                                ></p>
                              )}
                              {section.template === "image" && (
                                <div className={styles.expert_review_pic}>
                                  <div
                                    aria-hidden="true"
                                    aria-label=""
                                    className={
                                      styles.expert_review_img_container
                                    }
                                  >
                                    <img
                                      className={styles.expert_review_img}
                                      src={section?.image}
                                      alt=""
                                      title=""
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ),
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                className={styles.review_product_btn}
                onClick={() => handleOpenModal(1)}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    مشاهده ادامه بررسی تخصصی
                    <div
                      aria-hidden="false"
                      data-icon-name="cube-chevron-left"
                      data-icon="&#xE9C2;"
                      className={`${styles.review_product_btn_icon} cube-font-icon`}
                    ></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </InfoSection>
      ) : (
        <>
          {productDetails?.expert_reviews?.description ? (
            <InfoSection
              title="معرفی کالا"
              id="review"
              onClick={() => handleOpenModal(0)}
            >
              <div className="w-100">
                <div className="d-flex flex-column w-100 align-items-center gap-3">
                  <p className={styles.review_product_text}>
                    {productDetails?.expert_reviews?.description}
                  </p>
                  <button
                    className={styles.review_product_btn}
                    onClick={() => handleOpenModal(0)}
                  >
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        مشاهده ادامه معرفی
                        <div
                          aria-hidden="false"
                          data-icon-name="cube-chevron-left"
                          data-icon="&#xE9C2;"
                          className={`${styles.review_product_btn_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </InfoSection>
          ) : (
            ""
          )}
        </>
      )}

      <hr className="line-1" />

      <InfoSection
        id="review"
        title="جدول مشخصات"
        onClick={() => handleOpenModal(2)}
      >
        <table className={styles.review_product_table}>
          <tbody>
            {productDetails?.specifications
              ?.flatMap((spec) => spec?.attributes)
              .slice(0, 5)
              .map((specification, index) => (
                <tr key={index} className={styles.review_product_table_tr}>
                  <th className={styles.review_product_table_th}>
                    {specification?.title}
                  </th>
                  <td className={styles.review_product_table_td}>
                    {specification?.values}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {productDetails?.specifications?.flatMap((spec) => spec?.attributes)
          .length <= 6 ? (
          ""
        ) : (
          <button
            className={styles.review_product_btn}
            onClick={() => handleOpenModal(2)}
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              <div className="d-flex justify-content-center align-items-center gap-2">
                مشاهده ادامه مشخصات
                <div
                  aria-hidden="false"
                  data-icon-name="cube-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.review_product_btn_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
          </button>
        )}
      </InfoSection>

      <hr className="line-8" />
    </section>
  );
}

export default Review;
