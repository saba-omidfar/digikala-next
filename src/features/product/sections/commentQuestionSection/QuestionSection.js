import React from "react";

import InfoSection from "../infoSection/InfoSection";
import QuestionBox from "../questionBox/QuestionBox";
import ShowAllQuestionsModal from "@/features/product/modals/showAllQuestionsModal/ShowAllQuestionsModal";
import AddQuestionModal from "@/features/product/modals/addQuestionModal/AddQuestionModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./commentQuestionSection.module.css";

function QuestionSection() {
  const { productDetails, questionsData } = useProductContext();
  const { openModal } = useModal();

  return (
    <section id="QUESTIONS">
      <hr className="line-8" />
      <div>
        <section>
          <div id="questionSection">
            <InfoSection
              id="question"
              title="پرسش و پاسخ"
              btnTitle={
                questionsData?.questions?.length
                  ? `مشاهده ${toPersianDigits(
                      productDetails?.questions_count,
                    )} پرسش`
                  : ""
              }
              openModal={() =>
                openModal(<ShowAllQuestionsModal />, {
                  name: "show-all-questions",
                  className: "modal__questions",
                })
              }
              btnIcon="E9C2"
            ></InfoSection>

            {questionsData?.questions?.length ? (
              <div className={styles.questions_wrapper}>
                {questionsData?.questions
                  ?.filter((question) => question?.answers?.length > 0)
                  .slice(0, 5)
                  .map((question, index) => (
                    <QuestionBox key={index} question={question} />
                  ))}
                {questionsData?.questions?.length && (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ padding: "0 40px" }}
                    onClick={() =>
                      openModal(<ShowAllQuestionsModal />, {
                        name: "show-all-questions",
                        className: "modal__questions",
                      })
                    }
                  >
                    <button className={styles.see_more_question_btn}>
                      <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.modal_arrow_icon}>
                            <use href="#arrowLeft"></use>
                          </svg>
                        </div>
                      </div>
                    </button>
                    <span className={styles.see_more_question_text}>
                      مشاهده همه
                    </span>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div
              className={styles.ask_question_wrapper}
              onClick={() =>
                openModal(<AddQuestionModal />, {
                  name: "add-question",
                  className: "rounded-medium",
                })
              }
            >
              <span className={styles.ask_question_icon_container}>
                <div className="d-flex">
                  <div
                    data-icon-name="cube-action-ask"
                    data-icon="&#xE90D;"
                    className={`${styles.ask_question_icon} cube-font-icon`}
                  ></div>
                </div>
              </span>
              <div className="d-flex flex-grow-1 align-items-start">
                <p className={styles.ask_question_title}>
                  شما هم درباره این کالا سوال بپرسید
                </p>
                <div className="d-flex me-auto pe-3" aria-hidden="false">
                  <svg className={styles.ask_question_chevron_icon}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <hr className="line-8" />
    </section>
  );
}

export default QuestionSection;
