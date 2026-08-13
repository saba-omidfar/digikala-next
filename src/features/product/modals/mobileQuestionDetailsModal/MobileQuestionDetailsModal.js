import { useState } from "react";

import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import QuestionAnswerBox from "@/features/product/sections/questionBox/QuestionAnswerBox";
import AddAnswerModal from "@/features/product/modals/addAnswerModal/AddAnswerModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./mobileQuestionDetailsModal.module.css";

export default function MobileQuestionDetailsModal({ question }) {
  const { openModal, closeModal, closeMobileModal } = useModal();

  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const onDismiss = () => closeMobileModal();

  const openAddAnswer = () => {
    onDismiss();
    openModal(
      <AddAnswerModal
        title="جزییات پرسش"
        questionId={question.id}
        questionText={question.text}
        questionSource={question.source}
        onSuccess={() => {
          setAnswerSubmitted(true);
          closeModal("add-answer");
        }}
      />,
      {
        name: "add-answer",
      },
    );
  };

  return (
    <BottomSheet
      open
      onDismiss={onDismiss}
      blocking
      snapPoints={({ maxHeight }) => [maxHeight * 0.7, maxHeight]}
      header={
        <div className={styles.header}>
          <span className={styles.header_title}>جزییات پرسش</span>
          <div className="d-flex" onClick={onDismiss}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
      footer={
        <button className={styles.add_answer_btn} onClick={openAddAnswer}>
          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
            ثبت پاسخ
          </div>
        </button>
        // answerSubmitted ? (
        //   <div className={styles.hint__success}>
        //     <div className="d-flex">
        //       <div className={styles.hint__success_container}>
        //         <div
        //           data-icon-name="cube-infoOutline"
        //           data-icon="&#xE940;"
        //           className={`${styles.hint__success_icon} cube-font-icon`}
        //         ></div>
        //       </div>
        //       <span className={styles.hint__success_text}>
        //         پاسخ شما ثبت شد و پس از بررسی و تایید نمایش داده خواهد شد.
        //       </span>
        //     </div>
        //   </div>
        // ) : (
        //   <button className={styles.add_answer_btn} onClick={openAddAnswer}>
        //     <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
        //       ثبت پاسخ
        //     </div>
        //   </button>
        // )
      }
    >
      <div className={styles.content}>
        {/* <div className={styles.question_infos_container}>
          <span className={styles.question_sender}>{question?.sender}</span>
          <span className={styles.question_createdAt}>
            {question?.created_at}
          </span>
        </div> */}
        <div className={styles.question_body}>{question?.text}</div>
        <div>
          <div className={styles.question_answers_container}>
            {question?.answers?.length &&
              question?.answers?.map((questionAnswer, index) => (
                <div key={index} className={styles.question_answer_box}>
                  <div className="d-flex flex-column justify-content-between h-100">
                    <QuestionAnswerBox
                      isAnswer
                      questionAnswer={questionAnswer}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
