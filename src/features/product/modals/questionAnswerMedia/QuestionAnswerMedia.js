import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { useModal } from "@/contexts/modalContext";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import toPersianDigits from "@/utils/toPersianDigits";

import Loading from "@/components/modules/loading/Loading";

import styles from "./questionAnswerMedia.module.css";

export default function QuestionAnswerMedia({ question, answer }) {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { closeModal } = useModal();

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: answer?.id,
    targetType: "answer",
  });

  const toggleFeedbackHandler = ({ answerId, type }) => {
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
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.title}>
                <span className="position-relative">پاسخ پرسش</span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1 text-h5"></div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("")}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.close_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content_container}>
          <div className={styles.content}>
            <div className={styles.question_answer_details_container}>
              <div className="d-flex flex-column flex-shrink-0">
                <div className={styles.question_answer_details}>
                  <div>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={20}
                      lazyPreloadPrevNext={1}
                      loopAdditionalSlides={2}
                      slidesOffsetAfter={0}
                      slidesOffsetBefore={0}
                      onSwiper={setMainSwiper}
                      onSlideChange={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                      }
                    >
                      {answer?.files?.length &&
                        answer?.files?.map((file, index) => (
                          <SwiperSlide
                            key={file?.storage_ids}
                            onClick={() => mainSwiper?.slideTo(index)}
                          >
                            <div>
                              <div
                                className={styles.slide_img_container}
                                aria-hidden="true"
                                aria-label=""
                              >
                                <picture>
                                  <source
                                    type="image/webp"
                                    srcSet={file.thumbnail_url}
                                  />
                                  <source
                                    type="image/jpeg"
                                    srcSet={file.thumbnail_url}
                                  />
                                  <img
                                    className={styles.slide_img}
                                    src={file.thumbnail_url}
                                    alt=""
                                    title=""
                                  />
                                </picture>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={styles.question_answer_details_footer}>
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        lazyPreloadPrevNext={1}
                        loopAdditionalSlides={2}
                        slidesOffsetAfter={0}
                        slidesOffsetBefore={0}
                      >
                        {answer?.files?.length &&
                          answer?.files?.map((file, index) => (
                            <SwiperSlide
                              key={file?.storage_ids}
                              className={styles.slide_thumbnail}
                            >
                              <div
                                className={`${styles.thumbnail_slide_img_container} ${activeIndex === index ? styles.thumbnail_selected : ""}`}
                                aria-hidden="true"
                                aria-label=""
                              >
                                <picture>
                                  <source
                                    type="image/webp"
                                    srcSet={file?.thumbnail_url}
                                  />
                                  <source
                                    type="image/jpeg"
                                    srcSet={file?.thumbnail_url}
                                  />
                                  <img
                                    className={styles.thumbnail_slide_img}
                                    src={file.thumbnail_url}
                                    alt=""
                                    title=""
                                  />
                                </picture>
                              </div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <article>
                <div className="d-flex align-items-start">
                  <span className={styles.question_icon_container}>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.question_icon}>
                        <use href="#question"></use>
                      </svg>
                    </div>
                  </span>
                  <p className={styles.question_text}>{question?.text}</p>
                </div>
                <div className="flex flex-col py-4">
                  <div className="flex gap-2 items-center">
                    <div>
                      <div className="d-flex flex-nowrap align-items-center overflow-hidden">
                        <span className={styles.answer_sender}>
                          {answer?.sender}
                        </span>
                        {answer?.type !== "user" ? (
                          <span>
                            <div className="d-flex align-items-center">
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
                                  {answer?.type === "seller"
                                    ? "فروشنده"
                                    : "خریدار"}
                                </p>
                              </div>
                            </div>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.answer_body_container}>
                    <p className={styles.answer_body}>{answer?.text}</p>
                    <div className={styles.answer_footer}>
                      <span className={styles.answer_date}>
                        {toPersianDigits(answer?.created_at)}
                      </span>
                      <div className={styles.answer_reactions_container}>
                        <div className={styles.answer_reactions}>
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
                                      feedback?.userDisliked
                                        ? "\uEB39"
                                        : "\uE926"
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
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
