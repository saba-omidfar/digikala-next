import React from "react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";

import Loading from "@/components/modules/loading/Loading";
import QuestionAnswerMedia from "@/features/product/modals/questionAnswerMedia/QuestionAnswerMedia";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import toPersianDigits from "@/utils/toPersianDigits";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./questionAnswerBox.module.css";

function QuestionAnswerBox({ question, answer, isAnswer }) {
  const { openModal } = useModal();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: answer?.id,
    targetType: "answer",
  });

  const toggleFeedbackHandler = ({ answerId, type }) => {
    if (!user) {
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

  return (
    <>
      <div>
        <div className="d-flex align-items-center gap-1">
          {isAnswer && answer?.social_profile ? (
            <div className={styles.profile_img_container}>
              <Image
                className={styles.profile_img}
                width={40}
                height={40}
                src={
                  answer?.social_profile?.photo
                    ? answer?.social_profile?.photo
                    : "/images/png/profile.png"
                }
                alt="profile"
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <div className="d-flex align-items-center gap-1">
              <span className={styles.question_answerInfo_author}>
                {answer?.sender}
              </span>
              {answer?.type !== "user" ? (
                <>
                  <span className="d-flex align-items-center">
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.dot_icon} cube-font-icon`}
                        data-icon-name="cube-dot-outline"
                        data-icon="&#xEAF3;"
                      ></div>
                    </div>
                    <div
                      className={
                        answer?.type === "seller"
                          ? styles.seller_role_badge
                          : styles.user_role_badge
                      }
                    >
                      <p
                        className={
                          answer?.type === "seller"
                            ? styles.seller_role
                            : styles.user_role
                        }
                      >
                        {answer?.type === "seller" ? "فروشنده" : "خریدار"}
                      </p>
                    </div>
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
            {answer?.contribution_badge &&
              !Array.isArray(answer?.contribution_badge) && (
                <div
                  data-tooltip-id="active-user"
                  data-tooltip-content={answer?.contribution_badge.tooltip_text}
                  data-tooltip-place="bottom"
                >
                  <div className={styles.author_is_active_container}>
                    <div className={styles.animate_icon_container}>
                      <dotlottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="/statics/lottie/contribution-badge.lottie"
                        background="transparent"
                      />
                    </div>
                    <div className={styles.author_is_active_text}>
                      {answer?.contribution_badge.text}
                    </div>
                  </div>

                  <Tooltip
                    className="active_user_tooltip"
                    id="active-user"
                    place="bottom"
                  />
                </div>
              )}
          </div>
        </div>
        <div className={styles.Answer_body_container}>
          <p className={styles.Answer_body}>{answer?.text}</p>
          {answer?.files?.length ? (
            <div className={styles.question_answer_media_container}>
              {answer?.files?.map((file) => (
                <div
                  key={file?.storage_ids}
                  className="position-relative"
                  onClick={() =>
                    openModal(
                      <QuestionAnswerMedia
                        question={question}
                        answer={answer}
                      />,
                      {
                        name: "question-answer-media",
                        className:
                          "modal__question-answer-media rounded-medium",
                      },
                    )
                  }
                >
                  <div
                    role="img"
                    aria-hidden="false"
                    aria-label="question-answer-media"
                    className={styles.question_answer_media}
                  >
                    <picture>
                      <source type="image/webp" srcSet={file?.thumbnail_url} />
                      <source type="image/jpeg" srcSet={file?.thumbnail_url} />
                      <img
                        className={styles.question_answer_media_img}
                        src={file?.thumbnail_url}
                        width="50"
                        alt="question-answer-media"
                        title=""
                      />
                    </picture>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div
            className="d-flex align-items-center"
            style={{ color: "#222732" }}
          >
            <span className={styles.answer_date}>
              {toPersianDigits(answer?.created_at)}
            </span>
            <div className="me-auto">
              <div className="d-flex align-items-center text-neutral-500 pt-0 me-auto">
                <button
                  className={styles.reaction_btn}
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
                      <p className={styles.question_reaction_count}>
                        {toPersianDigits(
                          (answer?.reactions?.likes || 0) +
                            (feedback?.userLiked ? 1 : 0),
                        )}
                      </p>
                      <div className="d-flex me-1">
                        <div
                          className={`${styles.reaction_icon} cube-font-icon`}
                          data-icon-name="cube-value-like"
                          data-icon={feedback?.userLiked ? "\uEB38" : "\uE927"}
                        ></div>
                      </div>
                    </div>
                  )}
                </button>
                <button
                  className={styles.reaction_btn}
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
                      <p className={styles.question_reaction_count}>
                        {toPersianDigits(
                          (answer?.reactions?.dislikes || 0) +
                            (feedback?.userDisliked ? 1 : 0),
                        )}
                      </p>
                      <div className="d-flex me-1">
                        <div
                          className={`${styles.reaction_icon} cube-font-icon`}
                          data-icon-name="cube-value-dislike"
                          data-icon={
                            feedback?.userDisliked ? "\uEB39" : "\uE926"
                          }
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
    </>
  );
}

export default QuestionAnswerBox;
