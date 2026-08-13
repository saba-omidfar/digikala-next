import { useState } from "react";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./shortReview.module.css";

function ShortReview() {
  const { productDetails } = useProductContext();
  const [isReviewExpended, setIsReviewExpended] = useState(false);

  const description = productDetails?.expert_reviews?.description || "";
  const shouldShowMore = description.length > 360;

  if (!productDetails?.expert_reviews?.description) return null;

  return (
    <article className={styles.product_content} id="shortReview">
      <div>
        <div className={styles.product_content_title_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <h2 className={styles.product_content_title}>
              <span className="position-relative">معرفی</span>
            </h2>
          </div>
          <div className={styles.product_content_title_line}></div>
        </div>
      </div>
      <div
        className={`${styles.product_content_short_review} ${
          isReviewExpended && styles.expanded
        }`}
      >
        {productDetails?.expert_reviews?.description}
      </div>
      {shouldShowMore && (
        <div
          className={styles.product_content_more_detial}
          onClick={() => setIsReviewExpended((prevStat) => !prevStat)}
        >
          <span id="more-detail">
            <span className={styles.product_content_more_detail_btn}>
              <span>{isReviewExpended ? "بستن" : "بیشتر"}</span>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.product_content_more_detail_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </span>
          </span>
        </div>
      )}

      {productDetails?.expert_reviews?.admin_rates?.length ? (
        <div className={styles.shortReview_container}>
          <div
            className={`${styles.shortReview_item} ${styles.shortReview_item_right}`}
          >
            {productDetails?.expert_reviews?.admin_rates?.map((item, index) => (
              <div key={index} className={styles.shortReview_box_container}>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <h6 className={styles.shortReview_box_title}>{item.title}</h6>
                </div>
                <div className="d-flex align-items-center me-auto">
                  <div className={styles.spec_rating__bar}>
                    <div
                      className={styles.spec_rating__barProgress}
                      style={{ width: `${(item.rate * 100) / 5}%` }}
                    ></div>
                  </div>
                  <p className={styles.spec_rating__text}>
                    {item.rate.toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${styles.shortReview_item} ${styles.shortReview_item_left}`}
          >
            {productDetails?.expert_reviews?.technical_properties ? (
              <>
                {productDetails?.expert_reviews?.technical_properties
                  ?.advantages && (
                  <p className={styles.properties_advantages_title}>
                    نکات مثبت
                  </p>
                )}
                {productDetails?.expert_reviews?.technical_properties?.advantages?.map(
                  (item, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <div
                        className={styles.properties_advantages_icon_container}
                      >
                        <div
                          data-icon-name="cube-addCircleFill"
                          data-icon="&#xEA25;"
                          className={`${styles.properties_advantages_icon} cube-font-icon`}
                        ></div>
                      </div>
                      <p className={styles.properties_advantage_text}>{item}</p>
                    </div>
                  ),
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </article>
  );
}
export default ShortReview;
