import Image from "next/image";

import AiCommentDetailsModal from "@/features/product/modals/aiCommentDetailsModal/AiCommentDetailsModal";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";
import toPersianDigits from "@/utils/toPersianDigits";
import useScreenStatus from "@/hooks/useScreenStatus";
import scrollToSection from "@/utils/scrollToSection";

import styles from "./productReviewSection.module.css";

function ProductReviewSection() {
  const { openModal } = useModal();
  const { isSmallScreen } = useScreenStatus();
  const { productDetails } = useProductContext();

  if (
    productDetails?.rating?.rate === 0 ||
    !productDetails?.comments_count ||
    !productDetails?.questions_count
  )
    return;
  return (
    <div className={styles.review_container}>
      {isSmallScreen ? <div className={styles.right_space}></div> : ""}
      {productDetails?.rating?.rate !== 0 ? (
        <div className="d-flex align-items-center">
          <div className={styles.review_score_icon}>
            <Image
              width={20}
              height={20}
              src="/images/svg/pdp/star.svg"
              alt=""
            />
          </div>
          <p className={styles.review_score}>
            {toPersianDigits(
              Math.round((productDetails?.rating?.rate / 100) * 5 * 10) / 10,
            )}
          </p>
          <p className={styles.review_comments_count}>
            {`(${toPersianDigits(productDetails?.rating?.count)})`}
          </p>
        </div>
      ) : (
        ""
      )}

      <div className={styles.review_comments_overview_container}>
        {productDetails?.comments_overview ? (
          <span
            className={styles.review_comments_overview}
            id="comments-abovefold"
            onClick={() =>
              openModal(<AiCommentDetailsModal />, {
                name: "ai-comment-details",
                className: "modal__ai_comment",
                size: "full",
              })
            }
          >
            <span className={styles.review_summery_badge}>
              <div className={styles.ai_icon_container}>
                <div
                  data-icon-name="cube-action-ai-all"
                  data-icon="&#xEB79;"
                  className={`${styles.ai_icon} cube-font-icon`}
                ></div>
              </div>
              خلاصه دیدگاه‌ها
            </span>
          </span>
        ) : (
          ""
        )}
        {productDetails?.comments_count ? (
          <div
            className="d-flex align-items-center"
            id="comments-abovefold"
            onClick={() => scrollToSection("COMMENTS", 100)}
          >
            <span className={styles.review_comments}>
              <span>
                <span className={styles.review_comments_text}>
                  {productDetails?.comments_count?.toLocaleString("fa-IR")}{" "}
                  دیدگاه
                  <div className="d-flex align-items-center">
                    <div
                      data-icon-name="cube-nav-chevron-left"
                      data-icon="&#xE9C2;"
                      className={`${styles.review_comments_icon} cube-font-icon`}
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
            className={styles.review_questions}
            id="questions-abovefold"
            onClick={() => scrollToSection("QUESTIONS")}
          >
            <span>
              <span className={styles.review_questions_text}>
                {productDetails?.questions_count?.toLocaleString("fa-IR")} پرسش
                و پاسخ
                <div className="d-flex align-items-center">
                  <div
                    data-icon-name="cube-nav-chevron-left"
                    data-icon="&#xE9C2;"
                    className={`${styles.review_questions_icon} cube-font-icon`}
                  ></div>
                </div>
              </span>
            </span>
          </span>
        ) : (
          ""
        )}
      </div>

      {isSmallScreen ? <div className={styles.right_space}></div> : ""}
    </div>
  );
}

export default ProductReviewSection;
