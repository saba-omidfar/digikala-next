import scrollToSection from "@/utils/scrollToSection";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./spec.module.css";

function Spec() {
  const { productDetails } = useProductContext();

  if (!productDetails?.review) return;

  return (
    <div className={styles.spec}>
      <div className="w-100">
        {productDetails?.review?.attributes ? (
          <>
            <div className={styles.spec_header_title_container}>
              <div className="d-flex align-items-center flex-grow-1">
                <p className={styles.spec_header_title}>
                  <span className="position-relative">ویژگی‌ها</span>
                </p>
              </div>
            </div>
            <div style={{ overflow: "auto", scrollbarWidth: "none" }}>
              <ul className={styles.spec_wrapper}>
                {productDetails?.review?.attributes
                  ?.slice(0, 9)
                  ?.map((review, index) => (
                    <li key={index} className={styles.spec_item_container}>
                      <div className={styles.spec_item}>
                        <div>
                          <p className={styles.review_attr_title}>
                            {review.title}
                          </p>
                          <p className={styles.review_attr_value}>
                            {review.values.join("، ")}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.spec_see_more_btn_container}>
              <hr className={styles.spec_hr}></hr>
              <button
                className={styles.spec_see_more_btn}
                onClick={() => scrollToSection("specification", 220)}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  مشاهده همه ویژگی‌ها
                  <div className={styles.spec_see_more_icon_container}>
                    <div
                      data-icon-name="cube-arrow-left"
                      data-icon="&#xE9C2;"
                      className={`${styles.spec_see_more_icon} cube-font-icon`}
                    ></div>
                  </div>
                </div>
              </button>
              <hr className={styles.spec_hr}></hr>
            </div>
          </>
        ) : (
          ""
        )}
        {productDetails?.category?.return_reason_alert ? (
          <div className={styles.spec_icon_container}>
            <div className="d-flex">
              <div className="d-flex mt-1">
                <div
                  data-icon-name="cube-info-fill"
                  data-icon="&#xE93F;"
                  className={`${styles.spec_icon} cube-font-icon`}
                ></div>
              </div>
              <div className={styles.spec_text}>
                {productDetails?.category?.return_reason_alert}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Spec;
