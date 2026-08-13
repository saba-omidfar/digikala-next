import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";

import Loading from "@/components/modules/loading/Loading";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./addAnswerModal.module.css";

function AddAnswerModal({
  questionId,
  questionText,
  questionSource,
  onSuccess,
}) {
  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();
  const { productId, postAnswer, isLoadingPostAnswer } = useProductContext();

  const [answer, setAnswer] = useState("");

  const textareaRef = useRef(null);
  const maxChars = 500;
  const minCharsToEnable = 7;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answer]);

  const postQuestionAnswerHandler = () => {
    postAnswer(
      {
        productId,
        questionId,
        text: answer,
        source: questionSource,
      },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      },
    );
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header_container}>
        <div className={styles.modal_header}>
          <div className={styles.modal_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className="flex-grow-1">
                <span className={styles.modal_title}>
                  {isSmallScreen ? "جزییات پرسش" : "به این پرسش پاسخ دهید"}
                </span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal("add-answer")}>
            <div
              data-icon-name="cube-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.modal_content_container}>
        <div className={styles.modal_content}>
          <div>
            <p className={styles.modal_question_text}>{questionText}</p>
            <div style={{ marginTop: "20px", marginBottom: "8px" }}>
              <label
                htmlFor="answerInput"
                className={styles.modal_answer_label}
              >
                <div className={styles.modal_content_textarea_container}>
                  <div className="flex-grow-1">
                    <textarea
                      id="answerInput"
                      ref={textareaRef}
                      placeholder="به این سوال پاسخ دهید"
                      className={styles.modal_content_textarea}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      maxLength={maxChars}
                    ></textarea>
                  </div>
                </div>
              </label>
              <div className={styles.modal_content_textarea_counter}>
                {answer.length.toLocaleString("fa-IR")} /
                {maxChars.toLocaleString("fa-IR")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modal_footer}>
        <div className="d-flex align-items-center justify-content-between">
          <div className={styles.modal_submit_btn_container}>
            <button
              id="submit-answer"
              className={`${styles.modal_submit_btn} ${
                answer.length >= minCharsToEnable
                  ? ""
                  : styles.modal_submit_disabled_btn
              }`}
              disabled={answer.length < minCharsToEnable}
              onClick={postQuestionAnswerHandler}
            >
              {isLoadingPostAnswer ? <Loading isSmall={true} /> : "ثبت پاسخ"}
            </button>
          </div>
          <p className={styles.modal_question_rules_text}>
            ثبت پاسخ به معنی موافقت با
            <Link
              className={styles.modal_question_rules_link}
              target="_blank"
              href="/page/comments-rules/"
            >
              قوانین انتشار دیجی‌کالا
            </Link>
            است.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddAnswerModal;
