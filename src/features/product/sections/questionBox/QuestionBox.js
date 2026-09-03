"use client";

import Image from "next/image";

import Loading from "@/components/modules/loading/Loading";

import toPersianDigits from "@/utils/toPersianDigits";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./questionBox.module.css";

function QuestionBox({ question }) {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const { openMobileModal } = useModal();

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: question?.answers?.[0].id,
    targetType: "answer",
  });

  const togglefeedbacksHandler = ({ questionId, type }) => {
    if (!user) {
      showSnackbar("ابتدا وارد شوید.");
      return;
    }

    toggleFeedback(
      {
        targetId: questionId,
        targetType: "question",
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
    <article className={styles.question_wrapper}>
      <div className={styles.question_body}>{question?.text}</div>
      <div className="position-relative z-3">
        <div className={styles.answer_container}>
          {question?.answers ? (
            <div className="d-flex flex-column justify-content-between h-100">
              <div
                onClick={() =>
                  openMobileModal("question-details", { question })
                }
              >
                <div className={styles.profile_container}>
                  {question?.answers[0]?.social_profile ? (
                    <div className={styles.profile_img_container}>
                      <Image
                        className={styles.profile_img}
                        width={40}
                        height={40}
                        src="/images/png/profile.png"
                        alt="profile"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <div className="d-flex align-items-center gap-1">
                      <span className={styles.question_answerInfo_author}>
                        {question?.answers[0]?.sender}
                      </span>
                      {question?.answers[0]?.type !== "user" ? (
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
                                question?.answers[0]?.type === "seller"
                                  ? styles.seller_role_badge
                                  : styles.user_role_badge
                              }
                            >
                              <p
                                className={
                                  question?.answers[0]?.type === "seller"
                                    ? styles.seller_role
                                    : styles.user_role
                                }
                              >
                                {question?.answers[0]?.type === "seller"
                                  ? "فروشنده"
                                  : "خریدار"}
                              </p>
                            </div>
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {question?.answers?.[0]?.contribution_badge &&
                      !Array.isArray(
                        question.answers[0].contribution_badge,
                      ) && (
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
                            {question.answers[0].contribution_badge.text}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <span className={styles.answer_body}>
                  {question?.answers[0]?.text}
                </span>
              </div>
              <div
                className="d-flex align-items-center"
                style={{ color: "#222732" }}
              >
                <div className="d-flex flex-nowrap align-items-center overflow-hidden">
                  <span className={styles.answer_date}>
                    {toPersianDigits(question?.created_at)}
                  </span>
                </div>
                <div className="me-auto">
                  <div
                    className="d-flex align-items-center pt-0 me-auto"
                    style={{ color: "#81858b" }}
                  >
                    <div className="me-auto me-lg-0 d-flex align-items-center">
                      <button
                        className={styles.reaction_btn}
                        id="question-like"
                        onClick={() =>
                          togglefeedbacksHandler({
                            questionId: question?.id,
                            type: "like",
                          })
                        }
                      >
                        {isLoading && variables?.type === "like" ? (
                          <Loading isSmall={true} />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                            <p className={styles.reaction_btn_count}>
                              {toPersianDigits(
                                (question?.reactions?.likes || 0) +
                                  (feedback?.userLiked ? 1 : 0),
                              )}
                            </p>
                            <div className="d-flex me-1">
                              <div
                                className={`${styles.reaction_icon} cube-font-icon`}
                                data-icon-name="cube-value-like"
                                data-icon={
                                  feedback?.userLiked ? "\uEB38" : "\uE927"
                                }
                              ></div>
                            </div>
                          </div>
                        )}
                      </button>
                      <button
                        className={styles.reaction_btn}
                        id="question-dislike"
                        onClick={() =>
                          togglefeedbacksHandler({
                            questionId: question?.id,
                            type: "dislike",
                          })
                        }
                      >
                        {isLoading && variables?.type === "dislike" ? (
                          <Loading isSmall={true} />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                            <p className={styles.reaction_btn_count}>
                              {toPersianDigits(
                                (question?.reactions?.dislikes || 0) +
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

              {/* <div className={styles.answer_footer}>
                <div className="d-flex flex-nowrap align-items-center overflow-hidden">
                  <span className={styles.answer_author}>
                    {question.questionAnswers[0].questionAnswerSender}
                  </span>
                  <span className="me-1">
                    <div className={styles.answer_author_role}>
                      <p className={styles.answer_author_role_text}>
                        {question?.questionAnswers[0].questionAnswerType ===
                        "buyer"
                          ? "خریدار"
                          : question?.questionAnswers[0].questionAnswerType ===
                            "seller"
                          ? "فروشنده"
                          : ""}
                      </p>
                    </div>
                  </span>
                </div>
                <div className="me-auto">
                  <div className="d-flex align-items-center pt-0 me-auto">
                    <p className={styles.answer_is_helpful}>
                      آیااین پاسخ مفید بود؟
                    </p>
                    <div className="me-auto me-lg-0 d-flex align-items-center">
                      <button className={styles.reaction_btn}>
                        <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                          <p className={styles.reaction_btn_count}>
                            {question?.questionAnswer?.questionAnswerReactions?.likes?.toLocaleString(
                              "fa-IR"
                            )}
                          </p>
                          <div className="d-flex me-1">
                            <div
                              className={`${styles.reaction_icon} cube-font-icon`}
                              data-icon-name="cube-value-like"
                              data-icon={
                                question?.questionAnswer?.userLiked
                                  ? "\uEB38"
                                  : "\uE927"
                              }
                            ></div>
                          </div>
                        </div>
                      </button>
                      <button
                        className={styles.reaction_btn}
                        style={{ marginRight: "4px" }}
                      >
                        <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                          <p className={styles.reaction_btn_count}>
                            {question?.questionAnswer?.questionAnswerReactions?.dislikes?.toLocaleString(
                              "fa-IR"
                            )}
                          </p>
                          <div className="d-flex me-1">
                            <div
                              className={`${styles.reaction_icon} cube-font-icon`}
                              data-icon-name="cube-value-dislike"
                              data-icon={
                                question?.questionAnswer?.userDisliked
                                  ? "\uEB39"
                                  : "\uE926"
                              }
                            ></div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          ) : (
            <div>
              <span className={styles.add_answer_text}>
                اولین نفری باشید که به این سوال پاسخ می‌دهید
              </span>
              <span className={styles.add_answer_btn}>
                <span>ثبت پاسخ</span>
              </span>
            </div>
          )}
        </div>

        {question?.answers?.length > 1 ? (
          <div className={styles.others_answer_container}></div>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}

export default QuestionBox;
