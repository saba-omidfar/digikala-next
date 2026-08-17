import { useState, useRef } from "react";
import Link from "next/link";

import ProductContentTitle from "../productContentTitle/ProductContentTitle";
import QuestionBoxDesktop from "../../questionBox/QuestionBoxDesktop";
import AddQuestionModal from "@/features/product/modals/addQuestionModal/AddQuestionModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./questions.module.css";

export default function Questions({ topOffset }) {
  const questionsRef = useRef();

  const { openModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { postQuestion, questionsData } = useProductContext();

  const [question, setQuestion] = useState("");

  const maxChars = 100;
  const minCharsToEnable = 7;

  const postQuestionHandler = () => {
    postQuestion(
      {
        questionText: question,
        questionSender: "علی صالحی",
      },
      {
        onSuccess: () => {
          showSnackbar("پرسش شما ثبت شده و بعد از بررسی نمایش داده می‌شود");
          closeModal();
        },
      },
    );
  };

  return (
    <div className="lazyload-wrapper">
      <div id="questionSection" ref={questionsRef}>
        <section className={styles.product_content__section_border}>
          <ProductContentTitle title="پرسش‌ها" />
          <div className="d-flex justify-content-start align-items-start mt-3">
            <div
              className={styles.add_question_container}
              style={{ top: `${topOffset}px` }}
            >
              {questionsData?.pager?.total_items ? (
                <>
                  <p className={styles.add_question_text}>
                    شما هم درباره این کالا پرسش ثبت کنید
                  </p>
                  <button
                    className={styles.add_question_btn}
                    onClick={() =>
                      openModal(<AddQuestionModal />, {
                        name: "add-question",
                        className: "rounded-medium",
                      })
                    }
                  >
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      ثبت پرسش
                    </div>
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
            {questionsData?.pager?.total_items ? (
              <div className={styles.questions_container}>
                <QuestionBoxDesktop />
              </div>
            ) : (
              <div className={styles.no_question_container}>
                <p className={styles.no_question_title}>
                  درباره این کالا چه پرسشی دارید؟
                </p>
                <div style={{ margin: "8px 0" }}>
                  <div>
                    <label className="w-100 d-inline-block">
                      <div className={styles.no_question_textarea_container}>
                        <div>
                          <textarea
                            id="questionInput"
                            className={styles.no_question_textarea}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            maxLength={maxChars}
                            placeholder="به این سوال پاسخ دهید"
                          ></textarea>
                        </div>
                      </div>
                    </label>
                    <div className={styles.no_question_textarea_counter}>
                      {question?.length.toLocaleString("fa-IR")} /
                      {maxChars?.toLocaleString("fa-IR")}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className={styles.no_question_rules_text}>
                    ثبت پاسخ به معنی موافقت با
                    <Link
                      className={styles.no_question_rules_link}
                      target="_blank"
                      href="/page/comments-rules/"
                    >
                      قوانین انتشار دیجی‌کالا
                    </Link>
                    است.
                  </p>
                  <button
                    className={`${styles.question_submit_btn} ${
                      question?.length >= minCharsToEnable
                        ? ""
                        : styles.question_submit_disabled_btn
                    }`}
                    disabled={question.length < minCharsToEnable}
                    onClick={postQuestionHandler}
                  >
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      ثبت پرسش
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
