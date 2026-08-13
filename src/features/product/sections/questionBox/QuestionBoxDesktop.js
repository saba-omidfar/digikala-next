"use client";

import React, { useState, useEffect, useRef } from "react";

import RowQuestionBox from "./rowQuestionBox/RowQuestionBox";
import Pagination from "../pagination/Pagination";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./questionBoxDesktop.module.css";

function QuestionBoxDesktop() {
  const questionsWrapperRef = useRef(null);

  const { openModal, closeModal } = useModal();
  const {
    questionsData,
    isLoadingQuestions,
    currentPage,
    setCurrentPage,
    activeQuestionSort,
    setActiveQuestionSort,
  } = useProductContext();

  const [isExpendedQuestions, setIsExpendedQuestions] = useState(false);

  useEffect(() => {
    if (isLoadingQuestions && questionsWrapperRef.current) {
      questionsWrapperRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isLoadingQuestions]);

  useEffect(() => {
    if (isLoadingQuestions) {
      openModal(<LoadingModal />, {
        name: "loading",
        className: "modal__loading rounded-medium",
      });
    } else {
      closeModal("loading");
    }
  }, [isLoadingQuestions]);

  return (
    <>
      <div ref={questionsWrapperRef} className={styles.sort_container}>
        <div className={styles.sort_title_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <div
              className={styles.header_sort_icon_container}
              aria-hidden="false"
            >
              <svg className={styles.header_sort_icon}>
                <use href="#sort"></use>
              </svg>
            </div>
            <p className={styles.header_sort_title}>
              <span className="position-relative">مرتب سازی:</span>
            </p>
          </div>
        </div>
        <div className={styles.header_sort_list}>
          {questionsData?.sort_options?.map((sortOption) => (
            <span
              key={sortOption.id}
              className={`${styles.header_sort_item} ${
                activeQuestionSort === sortOption?.id
                  ? styles.header_sort_item_active
                  : ""
              }`}
              id="comment-sort"
              onClick={() => setActiveQuestionSort(sortOption?.id)}
            >
              {sortOption?.title}
            </span>
          ))}
        </div>
        <div className="me-auto d-block">
          <span className={styles.questions_count}>
            {toPersianDigits(questionsData?.pager?.total_items)} پرسش
          </span>
        </div>
      </div>
      {(isExpendedQuestions
        ? questionsData?.questions
        : questionsData?.questions?.slice(0, 5)
      )?.map((question) => (
        <RowQuestionBox key={question?.id} question={question} />
      ))}

      <div>
        {!isExpendedQuestions && questionsData?.pager?.total_items > 5 && (
          <div
            className={styles.more_question_btn_container}
            onClick={() => setIsExpendedQuestions(true)}
          >
            <button className={styles.more_question_btn}>
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <p style={{ color: "#1672dd" }}>
                  {toPersianDigits(questionsData?.pager?.total_items - 4)} پرسش
                  دیگر
                </p>
                <div className="d-flex me-1">
                  <svg className={styles.more_question_icon_expend}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        )}
        {isExpendedQuestions && (
          <Pagination
            totalItems={questionsData?.pager?.total_items}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}

export default QuestionBoxDesktop;
