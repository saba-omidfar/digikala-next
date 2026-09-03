import React from "react";

import Scores from "@/components/modules/scores/Scores";
import ShowCommentDetailsModal from "@/features/product/modals/showCommentDetailsModal/ShowCommentDetailsModal";
import CommentAuthor from "../commentBoxDesktop/commentAuthor/CommentAuthor";

import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";
import getTrueToSizeLabel from "@/utils/getTrueToSizeClass";

import styles from "./commentBoxMobile.module.css";

export default function CommentBoxMobile({ comment }) {
  const { openModal } = useModal();

  return (
    <article
      className={styles.comment_wrapper}
      onClick={() =>
        openModal(<ShowCommentDetailsModal comment={comment} />, {
          name: "show-comment-details",
          className: "modal__comment_details",
        })
      }
    >
      <div className="mb-2">
        <div className="d-flex align-items-center">
          <CommentAuthor comment={comment} />
        </div>

        <div className="d-flex align-items-center mt-2">
          {comment?.rate !== 0 ? (
            <Scores
              width={`${(100 * comment?.rate) / 5}%`}
              height={20}
              isIcon
              starSize={20}
            />
          ) : (
            ""
          )}
          {comment?.true_to_size_rate ? (
            <div className="d-flex align-items-center">
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.dot_icon} cube-font-icon`}
                  data-icon-name="cube-dot-outline"
                  data-icon="&#xEAF3;"
                ></div>
              </div>
              <div className={styles.true_to_size_container}>
                <div className="d-flex" aria-hidden="false">
                  <svg
                    className={`${styles.true_to_size_icon} ${getTrueToSizeLabel(comment?.true_to_size_rate).colorIcon}`}
                  >
                    <use
                      href={`#${getTrueToSizeLabel(comment?.true_to_size_rate).icon}`}
                    ></use>
                  </svg>
                </div>
                <p
                  className={`${styles.true_to_size_text} ${getTrueToSizeLabel(comment?.true_to_size_rate).colorText}`}
                >
                  {getTrueToSizeLabel(comment?.true_to_size_rate).label}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p
        className={`${styles.comment_body} ${comment?.body?.length > 160 ? "ellipsis ellipsis-3" : ""} `}
      >
        {comment?.body}
      </p>
      {comment?.body?.length > 150 ? (
        <span className={styles.see_more_btn}>
          <span>مشاهده بیشتر</span>
        </span>
      ) : (
        ""
      )}
      <div className="d-flex align-items-center mt-auto">
        <p className={styles.comment_date}>
          {toPersianDigits(comment?.relative_date || comment?.created_at)}
        </p>
        <div className="d-flex align-items-center pt-0 me-auto">
          <div className="me-auto me-lg-0 d-flex align-items-center">
            <button className={styles.comment_reaction_btn}>
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <p className={styles.comment_reaction_count}>
                  {toPersianDigits(comment?.reactions?.likes)}
                </p>
                <div className="d-flex me-1">
                  <div
                    className={`${styles.comment_reaction_icon} cube-font-icon`}
                    data-icon-name="cube-value-like"
                    data-icon="&#xE927;"
                  ></div>
                </div>
              </div>
            </button>
            <button className={styles.comment_reaction_btn}>
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <p className={styles.comment_reaction_count}>
                  {toPersianDigits(comment?.reactions?.dislikes)}
                </p>
                <div className="d-flex me-1">
                  <div
                    className={`${styles.comment_reaction_icon} ${styles.comment_dislike_icon} cube-font-icon`}
                    data-icon-name="cube-value-dislike"
                    data-icon="&#xE926;"
                  ></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
