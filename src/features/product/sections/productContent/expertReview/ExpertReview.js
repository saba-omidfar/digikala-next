import { useState } from "react";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./expertReview.module.css";

function ExpertReview() {
  const { productDetails } = useProductContext();
  const [isExpertReviewExpended, setIsExpertReviewExpended] = useState(false);

  if (!productDetails?.expert_reviews?.review_sections?.length) return;

  return (
    <div className={styles.product_content}>
      <div id="expertReview">
        <div className={styles.product_content_title_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <p className={styles.product_content_title}>
              <span className="position-relative">بررسی تخصصی</span>
            </p>
          </div>
          <div className={styles.product_content_title_line}></div>
        </div>
      </div>
      <article className="mt-3">
        {productDetails?.expert_reviews?.review_sections?.map(
          (reviewSection, index) => {
            if (!isExpertReviewExpended && index > 0) return null;

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
                          <div className="mt-4 me-4">
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
      </article>
      <span
        data-cro-id="expert-see-more"
        className={styles.product_content_more_detial}
        onClick={() => setIsExpertReviewExpended((prevStat) => !prevStat)}
      >
        <span>{isExpertReviewExpended ? "بستن" : "مشاهده بیشتر"}</span>
        <div className="d-flex">
          <div
            data-icon-name="cube-nav-chevron-left"
            data-icon="&#xE9C2;"
            className={`${styles.product_content_more_detail_icon} cube-font-icon`}
          ></div>
        </div>
      </span>
    </div>
  );
}
export default ExpertReview;
