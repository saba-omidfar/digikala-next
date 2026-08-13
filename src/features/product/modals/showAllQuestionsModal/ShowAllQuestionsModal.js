import React, { useEffect, useRef } from "react";

import InfiniteScroll from "react-infinite-scroller";

import RowQuestionBox from "@/features/product/sections/questionBox/rowQuestionBox/RowQuestionBox";
import AddQuestionModal from "../addQuestionModal/AddQuestionModal";
import SortCommentsQuestionsModal from "../sortCommentsQuestionsModal/SortCommentsQuestionsModal";
import Loading from "@/components/modules/loading/Loading";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./showAllQuestionsModal.module.css";

function ShowAllQuestionsModal() {
  const loadingRef = useRef(false);

  const { openModal, closeModal } = useModal();
  const {
    questions,
    questionsData,
    isLoadingQuestions,
    setIsInfiniteQuestions,
    currentPage,
    setCurrentPage,
  } = useProductContext();

  const loadMore = () => {
    if (loadingRef.current) return;

    if (currentPage >= (questionsData?.pager?.total_pages ?? 1)) return;

    loadingRef.current = true;
    setCurrentPage((p) => p + 1);
  };

  useEffect(() => {
    loadingRef.current = isLoadingQuestions;
  }, [isLoadingQuestions]);

  useEffect(() => {
    setIsInfiniteQuestions(true);

    return () => setIsInfiniteQuestions(false);
  }, []);

  const handleSortModal = () => {
    openModal(<SortCommentsQuestionsModal />, {
      name: "sort-comments-questions",
      className: "bottomSheet__content--border-lg",
    });
  };

  return (
    <div className="flex-grow-1">
      <div className={styles.modal_layout}>
        <div className={styles.modal_header}>
          <div
            className="d-flex align-items-center"
            style={{ padding: "16px 0" }}
          >
            <div className="flex-grow-1">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="text-break">
                  <div className="d-flex flex-grow-1 align-items-center">
                    <div
                      className="d-flex flex-shrink-0 ms-2"
                      onClick={() => closeModal()}
                    >
                      <div
                        data-icon-name="cube-arrow-right"
                        data-icon="&#xE955;"
                        className={`${styles.modal_arrow_icon} cube-font-icon`}
                      ></div>
                    </div>
                    <p className={styles.modal_title}>
                      <span className="position-relative">پرسش و پاسخ</span>
                    </p>
                  </div>
                </div>
                <div
                  onClick={handleSortModal}
                  className="d-flex flex-row align-items-center"
                >
                  <div className={styles.sort_icon_btn}>
                    <div className="d-flex align-items-center flex-grow-1">
                      <div
                        className={styles.sort_icon_container}
                        id="comment-sort-icon"
                        aria-hidden="false"
                      >
                        <div
                          data-icon-name="cube-sort"
                          data-icon="&#xE923;"
                          className={`${styles.comment_sort_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
          <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex flex-column position-relative bg-white">
              <div className="d-flex h-100 flex-column">
                <div id="1">
                  <div className={styles.infiniteScroll_container}>
                    <InfiniteScroll
                      className="d-flex flex-wrap"
                      pageStart={1}
                      loadMore={loadMore}
                      hasMore={
                        currentPage < (questionsData?.pager?.total_pages ?? 1)
                      }
                      useWindow={false}
                      getScrollParent={() =>
                        document.querySelector(".infiniteScroll_container")
                      }
                    >
                      {questions?.map((question) => (
                        <div
                          key={question?.id}
                          className="overflow-x-hidden w-100 border-complete-b-200"
                          style={{
                            width: "calc(100% + 0px)",
                            marginBottom: "0",
                          }}
                        >
                          <div className={styles.Question_row_box_container}>
                            <RowQuestionBox question={question} />
                          </div>
                        </div>
                      ))}

                      {isLoadingQuestions && (
                        <div className={styles.loading_container}>
                          <Loading isSmall />
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
                </div>

                <div
                  className={styles.add_question_btn_container}
                  onClick={() =>
                    openModal(<AddQuestionModal />, {
                      name: "add-question",
                      className: "modal__add_question rounded-medium",
                    })
                  }
                >
                  <button className={styles.add_question_btn} id="su-question">
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      <span>ثبت پرسش</span>
                      <div className="d-flex me-2">
                        <div
                          data-icon-name="cube-value-question"
                          data-icon="&#xE91c;"
                          className={`${styles.add_question_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAllQuestionsModal;
