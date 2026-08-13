import React, { useState } from "react";

import Link from "next/link";

import Loading from "@/components/modules/loading/Loading";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./addQuestionModal.module.css";

function AddQuestionModal() {
  const { showSnackbar } = useSnackbar();

  const { postQuestion, isLoadingPostQuestion, refetchQuestions } =
    useProductContext();

  const { closeModal } = useModal();
  const [question, setQuestion] = useState("");

  const maxChars = 100;
  const minCharsToEnable = 7;

  const postQuestionHandler = () => {
    postQuestion(
      { text: question },
      {
        onSuccess: () => {
          refetchQuestions();
          showSnackbar("پرسش شما ثبت شد.");
          closeModal();
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
              <p className={styles.modal_title}>
                <span className="position-relative">جزییات پرسش</span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
        <div
          className="flex-grow-1 d-flex flex-column"
          style={{ padding: "16px 20px" }}
        >
          <div className="flex-grow-1">
            <p className={styles.modal_subtitle}>
              پرسش خود را در مورد محصول مطرح کنید
            </p>
            <div className={styles.modal_content_label_container}>
              <label
                htmlFor="questionInput"
                className={styles.modal_content_label}
              >
                <div className={styles.modal_content_textarea_container}>
                  <div className="flex-grow-1">
                    <textarea
                      id="questionInput"
                      className={styles.modal_content_textarea}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      maxLength={maxChars}
                      placeholder="به این سوال پاسخ دهید"
                    ></textarea>
                  </div>
                </div>
              </label>
              <div className={styles.modal_content_textarea_counter}>
                {question.length.toLocaleString("fa-IR")} /
                {maxChars.toLocaleString("fa-IR")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modal_footer}>
        <div className="w-100">
          <button
            className={`${styles.modal_submit_btn} ${
              question.length >= minCharsToEnable
                ? ""
                : styles.modal_submit_disabled_btn
            }`}
            disabled={question.length < minCharsToEnable}
            onClick={postQuestionHandler}
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              {isLoadingPostQuestion ? <Loading isSmall={true} /> : "ثبت پرسش"}
            </div>
          </button>
          <p className={styles.modal_question_rules_text}>
            ثبت پرسش به معنی موافقت با
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

export default AddQuestionModal;
