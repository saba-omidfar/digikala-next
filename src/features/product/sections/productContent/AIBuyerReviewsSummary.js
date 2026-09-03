import { useState, useEffect } from "react";
import Image from "next/image";

import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import styles from "./aIBuyerReviewsSummary.module.css";

function AIBuyerReviewsSummary() {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [isExpendedReviewsSummary, setIsExpendedReviewsSummary] =
    useState(false);

  const { productDetails } = useProductContext();
  const { mutate: toggleFeedback } = usePostFeedback();
  const { data: feedbacks, refetch } = useGetFeedback({
    targetId: productDetails?.comments_overview?.id,
    targetType: "ai_summary",
  });

  const togglefeedbacksHandler = (type) => {
    const wasLiked = feedbacks?.userLiked;

    if (!user) {
      showSnackbar("ابتدا وارد شوید.");
      return;
    }

    toggleFeedback(
      {
        targetId: productDetails?.comments_overview?.id,
        targetType: "ai_summary",
        type,
      },
      {
        onSuccess: () => {
          if (type === "like" && !wasLiked) {
            setShowLikeAnimation(true);

            setTimeout(() => {
              setShowLikeAnimation(false);
            }, 1000);
          }

          refetch();
        },
      },
    );
  };

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  if (!productDetails?.comments_overview?.length) return null;

  return (
    <div className="d-flex flex-column gap-2">
      <div className="py-2 mt-3 d-flex align-items-center">
        <div className={styles.ai_icon}>
          <dotlottie-player
            autoplay
            loop
            mode="normal"
            src="/statics/lottie/ai.lottie"
            background="transparent"
          ></dotlottie-player>
        </div>
        <div className="me-2">
          <div className={styles.buyer_reviews_summary_title}>
            خلاصه دیدگاه‌های خریدارها
          </div>
          <div className={styles.buyer_reviews_summary_caption}>
            تولید شده با هوش مصنوعی
          </div>
        </div>
      </div>

      <div className="position-relative" style={{ height: "unset" }}>
        <div className={styles.ai_tail_container}>
          <Image
            className={styles.ai_tail_icon}
            width={22}
            height={16}
            src="/images/svg/tail-comment-summary-desktop.svg"
            alt=""
          />
        </div>

        <div className={styles.buyer_reviews_summary_body}>
          <div className={styles.buyer_reviews_summary_text}>
            <div
              className={`${
                !isExpendedReviewsSummary ? styles.ellipsis_3 : "mb-3"
              } ${styles.buyer_reviews_summary}`}
            >
              <span style={{ display: "block", marginBottom: "8px" }}>
                {productDetails?.comments_overview?.overview}
              </span>
            </div>

            {!isExpendedReviewsSummary && (
              <span
                className={styles.buyer_reviews_summary_see_more}
                onClick={() => setIsExpendedReviewsSummary(true)}
              >
                <span>مشاهده بیشتر</span>
              </span>
            )}

            <div className={styles.buyer_reviews_benefitLimitation_container}>
              {productDetails?.comments_overview?.advantages?.map(
                (item, index) => (
                  <div
                    key={index}
                    className={styles.buyer_reviews_benefit_item}
                  >
                    <div className="d-flex">
                      <div
                        data-icon-name="cube-value-close"
                        data-icon="&#xEAC6;"
                        className={`${styles.buyer_reviews_benefit_item_icon} cube-font-icon`}
                      ></div>
                    </div>
                    <span className={styles.buyer_reviews_benefit_item_text}>
                      {item}
                    </span>
                  </div>
                ),
              )}
              {productDetails?.comments_overview?.disadvantages?.map(
                (item, index) => (
                  <div
                    key={index}
                    className={styles.buyer_reviews_limitation_item}
                  >
                    <div className="d-flex">
                      <div
                        data-icon-name="cube-value-close"
                        data-icon="&#xEA23;"
                        className={`${styles.buyer_reviews_limitation_item_icon} cube-font-icon`}
                      ></div>
                    </div>
                    <span className={styles.buyer_reviews_limitation_item_text}>
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div className={styles.buyer_reviews_summary_subCaption}>
              این خلاصه ممکن است دقیق نباشد
            </div>
          </div>
        </div>

        <div className="mt-2 pb-3 d-flex align-items-center">
          <div className={styles.buyer_reviews_summary_feedback_title}>
            آیا این خلاصه برایتان مفید بود؟
          </div>
          <div className="d-flex align-items-center me-3">
            <div
              className={styles.buyer_reviews_summary_feedback_container}
              onClick={() => togglefeedbacksHandler("like")}
            >
              {showLikeAnimation ? (
                <div className={styles.like_animation_container}>
                  <dotlottie-player
                    autoplay
                    loop={false}
                    mode="normal"
                    src="/statics/lottie/like-animation.lottie"
                    background="transparent"
                  />
                </div>
              ) : (
                <div className="d-flex">
                  <div
                    data-icon-name="cube-action-feedback-like"
                    data-icon={feedbacks?.userLiked ? "\uEB38" : "\uE927"}
                    className={`${styles.buyer_reviews_summary_feedback_reaction} cube-font-icon`}
                  />
                </div>
              )}
            </div>

            <div
              className={`${styles.buyer_reviews_summary_feedback_container} me-3`}
              onClick={() => togglefeedbacksHandler("dislike")}
            >
              <div className="d-flex" aria-hidden={false}>
                <div
                  data-icon-name="cube-action-feedback-dislike"
                  data-icon={feedbacks?.userDisliked ? "\uEB39" : "\uE926"}
                  className={`${styles.buyer_reviews_summary_feedback_reaction} cube-font-icon`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mb-4 pb-2"
        style={{ borderBottom: "1px solid #f0f0f1" }}
      ></div>
    </div>
  );
}

export default AIBuyerReviewsSummary;
