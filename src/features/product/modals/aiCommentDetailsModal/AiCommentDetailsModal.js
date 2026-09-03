import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";
import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import styles from "./aiCommentDetailsModal.module.css";

function AiCommentDetailsModal() {
  const { closeModal } = useModal();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { productDetails } = useProductContext();
  const { mutate: toggleFeedback } = usePostFeedback();
  const { data: feedbacks, refetch } = useGetFeedback({
    targetId: productDetails?.comments_overview?.id,
    targetType: "ai_summary",
  });

  const currentIndexRef = useRef(0);

  const typedTextRef = useRef("");
  const advantages = productDetails?.comments_overview?.advantages || [];
  const disadvantages = productDetails?.comments_overview?.disadvantages || [];
  const overviewText = productDetails?.comments_overview?.overview || "";

  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showDisadvantages, setShowDisadvantages] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

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

  const typeText = useCallback(() => {
    const typingSpeed = 2;
    currentIndexRef.current = 0;
    typedTextRef.current = "";
    setTypedText("");

    const interval = setInterval(() => {
      if (currentIndexRef.current < overviewText.length) {
        const nextChar = overviewText[currentIndexRef.current];
        typedTextRef.current += nextChar;
        setTypedText(typedTextRef.current);
        currentIndexRef.current += 1;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, typingSpeed);

    return interval;
  }, [overviewText]);

  useEffect(() => {
    const interval = typeText();
    return () => clearInterval(interval);
  }, [typeText]);

  useEffect(() => {
    if (isTypingDone) {
      const advTimer = setTimeout(() => setShowAdvantages(true), 300);
      const disTimer = setTimeout(
        () => setShowDisadvantages(true),
        300 + advantages?.length * 250 + 300,
      );
      const finalTextTimer = setTimeout(
        () => setShowFinalText(true),
        300 + advantages?.length * 250 + disadvantages?.length * 250,
      );
      return () => {
        clearTimeout(advTimer);
        clearTimeout(disTimer);
        clearTimeout(finalTextTimer);
      };
    }
  }, [isTypingDone]);

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  return (
    <div className="flex-grow-1 h-100">
      <div className={styles.layout}>
        <div className={styles.header_container}>
          <div className="d-flex align-items-center">
            <div className={styles.header}>
              <div className="d-flex align-items-center flex-grow-1">
                <div className={styles.title_container}>
                  <span className="position-relative">
                    <div className="d-flex align-items-center">
                      <div className={styles.ai_icon}>
                        <dotlottie-player
                          autoplay
                          loop
                          mode="normal"
                          src="/statics/lottie/ai.lottie"
                          background="transparent"
                        ></dotlottie-player>
                      </div>
                      <div className={styles.title_text_container}>
                        <div className={styles.title_text_top}>
                          خلاصه دیدگاه‌های خریدارها
                        </div>
                        <div className={styles.title_text_bottom}>
                          تولید شده با هوش مصنوعی
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-grow-1"></div>
            <div className="d-flex" onClick={() => closeModal()}>
              <svg
                data-test-id="close-modal-icon-button"
                className={styles.header_icon}
              >
                <use href="#close"></use>
              </svg>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
          <div className={styles.content_container}>
            <div className={styles.content}>
              <div>
                <div className={styles.ai_bg_img_container} aria-hidden="true">
                  <img
                    className={styles.ai_bg_img}
                    src="/images/svg/tail-comment-summary.svg"
                  />
                </div>
              </div>

              <div className={styles.ai_bg}>
                <div className={styles.ai_summary_comment}>{typedText}</div>

                <div className="mb-2">
                  <div className={styles.ai_summary_comment_advantages}>
                    <AnimatePresence>
                      {showAdvantages &&
                        advantages?.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: index * 0.25, duration: 0.3 }}
                            className={
                              styles.ai_summary_comment_advantages_item
                            }
                          >
                            <div className="d-flex">
                              <div
                                data-icon-name="cube-value-close"
                                data-icon="&#xEAC6;"
                                className={`${styles.ai_summary_comment_advantages_item_icon} cube-font-icon`}
                              ></div>
                            </div>
                            <span
                              className={
                                styles.ai_summary_comment_advantages_item_text
                              }
                            >
                              {item}
                            </span>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>

                  <div className={styles.ai_summary_comment_disadvantages}>
                    <AnimatePresence>
                      {showDisadvantages &&
                        disadvantages?.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: index * 0.25, duration: 0.3 }}
                            className={
                              styles.ai_summary_comment_disadvantages_item
                            }
                          >
                            <div className="d-flex">
                              <div
                                data-icon-name="cube-value-close"
                                data-icon="&#xEA23;"
                                className={`${styles.ai_summary_comment_disadvantages_item_icon} cube-font-icon`}
                              ></div>
                            </div>
                            <span
                              className={
                                styles.ai_summary_comment_disadvantages_item_text
                              }
                            >
                              {item}
                            </span>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence>
                  {showFinalText && (
                    <motion.div
                      key="finalText"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={styles.ai_summary_comment_subCaption}>
                        این خلاصه ممکن است دقیق نباشد
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {showFinalText && (
                  <motion.div
                    key="finalText"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mt-2 pb-3 d-flex align-items-center">
                      <div className={styles.ai_comment_summary_feedback_title}>
                        آیا این خلاصه برایتان مفید بود؟
                      </div>
                      <div className="d-flex align-items-center me-auto">
                        <div
                          className={
                            styles.ai_comment_summary_feedback_container
                          }
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
                                data-icon={
                                  feedbacks?.userLiked ? "\uEB38" : "\uE927"
                                }
                                className={`${styles.ai_comment_summary_feedback_reaction} cube-font-icon`}
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${styles.ai_comment_summary_feedback_container} me-3`}
                          onClick={() => togglefeedbacksHandler("dislike")}
                        >
                          <div className="d-flex" aria-hidden={false}>
                            <div
                              data-icon-name="cube-action-feedback-dislike"
                              data-icon={
                                feedbacks?.userDisliked ? "\uEB39" : "\uE926"
                              }
                              className={`${styles.ai_comment_summary_feedback_reaction} cube-font-icon`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiCommentDetailsModal;
