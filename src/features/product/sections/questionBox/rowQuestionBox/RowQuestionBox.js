import React, { useState } from "react";

import QuestionAnswerBox from "../QuestionAnswerBox";
import AddAnswerModal from "@/features/product/modals/addAnswerModal/AddAnswerModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./rowQuestionBox.module.css";

function RowQuestionBox({ question }) {
  const { openModal, closeModal } = useModal();

  const [viewMoreAnswers, setViewMoreAnswers] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const openAddAnswer = () =>
    openModal(
      <AddAnswerModal
        title="جزییات پرسش"
        questionId={question?.id}
        questionText={question?.text}
        questionSource={question.source}
        onSuccess={() => {
          setAnswerSubmitted(true);
          closeModal();
        }}
      />,
      {
        name: "add-answer",
        className: "modal__add_answer rounded-medium",
      },
    );

  const firstAnswer = question?.answers?.[0];
  const moreAnswers = question?.answers?.slice(1);
  const showAddAnswerButton =
    !moreAnswers?.length || viewMoreAnswers || !firstAnswer;

  return (
    <article className={styles.question_wrapper}>
      <div className="d-flex align-items-start">
        <p className={styles.question_body}>{question?.text}</p>
      </div>

      {firstAnswer && (
        <div className="w-100">
          <div className="d-flex flex-column" style={{ padding: "16px 0" }}>
            <QuestionAnswerBox
              isAnswer
              answer={firstAnswer}
              question={question}
            />
          </div>
        </div>
      )}

      {moreAnswers?.length > 0 && !viewMoreAnswers && (
        <button
          className={styles.add_answer_btn}
          onClick={() => setViewMoreAnswers(true)}
        >
          <div className="d-flex">
            مشاهده پاسخ‌های دیگر
            <svg className={styles.add_answer_icon}>
              <use href="#expandMore"></use>
            </svg>
          </div>
        </button>
      )}

      {viewMoreAnswers &&
        moreAnswers.map((answer) => (
          <div className="w-100" key={answer.id}>
            <div className="d-flex flex-column" style={{ padding: "16px 0" }}>
              <QuestionAnswerBox
                questionId={question.id}
                question={question}
                answer={answer}
                isAnswer
              />
            </div>
          </div>
        ))}

      {showAddAnswerButton && (
        <div onClick={openAddAnswer}>
          {answerSubmitted ? (
            <div className={styles.hint__success}>
              <div className="d-flex">
                <div className={styles.hint__success_container}>
                  <div
                    data-icon-name="cube-infoOutline"
                    data-icon="&#xE940;"
                    className={`${styles.hint__success_icon} cube-font-icon`}
                  ></div>
                </div>
                <span className={styles.hint__success_text}>
                  پاسخ شما ثبت شد و پس از بررسی و تایید نمایش داده خواهد شد.
                </span>
              </div>
            </div>
          ) : (
            <button className={styles.add_answer_btn}>
              <div className="d-flex align-items-center justify-content-center">
                <div className={styles.content_edit_icon_container}>
                  <div
                    data-icon-name="cube-content-edit"
                    data-icon="&#xE961;"
                    className={`${styles.content_edit_icon} cube-font-icon`}
                  ></div>
                </div>
                ثبت پاسخ‌
              </div>
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default RowQuestionBox;
