import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import Loading from "@/components/modules/loading/Loading";

import styles from "./answerItem.module.css";

export default function AnswerItem({ answer }) {
  const { user } = useUserContext();

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: answer?.id,
    targetType: "answer",
  });

  const toggleFeedbackHandler = ({ answerId, type }) => {
    if (!user?.is_logged_in) {
      showSnackbar("ابتدا وارد شوید.");
      return;
    }

    toggleFeedback(
      {
        targetId: answerId,
        targetType: "answer",
        type,
      },
      {
        onSettled: () => {
          refetch();
        },
      },
    );
  };

  const typeConfig = {
    buyer: {
      badgeClass: styles.buyer_badge,
      title: "خریدار",
    },

    seller: {
      badgeClass: styles.seller_badge,
      title: "فروشنده",
    },
  };

  const currentType = typeConfig[answer?.type] || typeConfig.buyer;

  return (
    <div className={styles.answer_container}>
      <div className={styles.answer_top_section}>
        <div>
          <div
            aria-hidden="true"
            aria-label=""
            className={styles.social_profile_container}
          >
            <picture>
              <source type="image/webp" srcSet={answer.social_profile.photo} />
              <source type="image/jpeg" srcSet={answer.social_profile.photo} />
              <img alt="" title="" src={answer.social_profile.photo} />
            </picture>
          </div>
        </div>
        <div>
          <div className="d-flex flex-nowrap align-items-center overflow-hidden">
            <span className={styles.answer_sender}>
              {toPersianDigits(answer.sender)}
            </span>
            <span>
              <div className="d-flex align-items-center">
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.dot_icon} cube-font-icon`}
                    data-icon-name="cube-content-dot"
                    data-icon=""
                  ></div>
                </div>
                <div
                  className={`${styles.answer_type_badge} ${currentType.badgeClass}`}
                >
                  <p className={styles.answer_type_title}>
                    {currentType.title}
                  </p>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.answer_bottom_section}>
        <p className={styles.answer_text}>{answer.text}</p>
        <div className={styles.answer_infos}>
          <span className={styles.answer_created_at}>{answer.created_at}</span>
          <div className={styles.answer_feedbacks_container}>
            <div className={styles.answer_feedbacks}>
              <button
                className={styles.answer_feedback_btn}
                onClick={() =>
                  toggleFeedbackHandler({
                    answerId: answer?.id,
                    type: "like",
                  })
                }
              >
                {isLoading && variables?.type === "like" ? (
                  <Loading isSmall={true} />
                ) : (
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <p className={styles.answer_feedback_count}>
                      {toPersianDigits(
                        (answer?.reactions?.likes || 0) +
                          (feedback?.userLiked ? 1 : 0),
                      )}
                    </p>
                    <div className={styles.answer_feedback_icon_container}>
                      <div
                        className={`${styles.answer_feedback_icon} cube-font-icon`}
                        data-icon-name="cube-value-like"
                        data-icon={feedback?.userLiked ? "\uEB38" : "\uE927"}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
              <button
                className={styles.answer_feedback_btn}
                onClick={() =>
                  toggleFeedbackHandler({
                    answerId: answer?.id,
                    type: "dislike",
                  })
                }
              >
                {isLoading && variables?.type === "dislike" ? (
                  <Loading isSmall={true} />
                ) : (
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <p className={styles.answer_feedback_count}>
                      {toPersianDigits(
                        (answer?.reactions?.dislikes || 0) +
                          (feedback?.userDisliked ? 1 : 0),
                      )}
                    </p>
                    <div className={styles.answer_feedback_icon_container}>
                      <div
                        className={`${styles.answer_feedback_icon} cube-font-icon`}
                        data-icon-name="cube-value-dislike"
                        data-icon={feedback?.userDisliked ? "\uEB39" : "\uE926"}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
