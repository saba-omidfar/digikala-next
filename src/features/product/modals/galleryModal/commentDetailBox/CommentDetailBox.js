import React, { useState, useRef } from "react";

import Scores from "@/components/modules/scores/Scores";
import Loading from "@/components/modules/loading/Loading";

import toPersianDigits from "@/utils/toPersianDigits";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./commentDetailBox.module.css";

export default function CommentDetailBox({ commentDetails, isMobileView }) {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const commentRef = useRef(null);
  const [isCommentExpended, setICommentExpended] = useState(false);

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: commentDetails?.id,
    targetType: "comment",
  });

  const togglefeedbacksHandler = ({ commentId, type }) => {
    if (!user) {
      showSnackbar("ابتدا وارد شوید.");
      return;
    }

    toggleFeedback(
      {
        targetId: commentId,
        targetType: "comment",
        type,
      },
      {
        onSettled: () => {
          refetch();
        },
      },
    );
  };

  return (
    <div
      className={`${
        isMobileView
          ? styles.modal__commentContainer__mobile
          : styles.comment_container
      }`}
    >
      <div style={{ marginTop: "12px" }}>
        <div
          className="text-white d-flex align-items-center"
          style={{ gap: "16px", margin: "0 16px" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ gap: "12px" }}
          >
            <span className={styles.comment_author}>
              {commentDetails?.user_name
                ? commentDetails?.user_name
                : "کاربر دیجی‌کالا"}
            </span>
            <div
              className={styles.comment_author_role_badge}
              style={{
                color: "#2e7b32",
                backgroundColor: "#e6f4f7",
                borderColor: "#2e7b32",
              }}
            >
              <p className={styles.comment_author_role}>
                {commentDetails?.is_buyer ? "خریدار" : "فروشنده"}
              </p>
            </div>
          </div>
          <div className="d-inline-flex flex-nowrap position-relative">
            <Scores
              width={`${(100 * commentDetails?.rate) / 5}%`}
              height={20}
              starSize={20}
            />
          </div>
        </div>
        <div>
          <div
            ref={commentRef}
            className={`${styles.buyers_comment_content} ${
              (isMobileView && !isCommentExpended) ||
              !commentDetails?.body?.length > 200
                ? "ellipsis ellipsis-2"
                : ""
            }`}
          >
            {commentDetails?.body}
          </div>
          {commentDetails?.body?.length > 200 && isMobileView && (
            <span
              className={styles.see_more_btn}
              onClick={() => setICommentExpended((prev) => !prev)}
            >
              {isCommentExpended ? "مشاهده کمتر" : "مشاهده بیشتر"}
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.chevron_icon}>
                  <use
                    href={isCommentExpended ? "#chevronRight" : "#chevronLeft"}
                  ></use>
                </svg>
              </div>
            </span>
          )}
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: "12px" }}
        >
          <div
            className="d-flex align-items-center"
            style={{ margin: "0 12px" }}
          >
            <span className="d-flex align-items-center">
              <div className="d-flex ms-3">
                <div
                  className={`${styles.buyers_comment_seller_icon} cube-font-icon`}
                  data-icon-name="cube-value-seller"
                  data-icon="&#xE920;"
                ></div>
              </div>
              <p className={styles.buyers_comment_seller_name}>
                {commentDetails?.purchased_item?.seller?.title}
              </p>
            </span>
            {commentDetails?.purchased_item?.color?.title ? (
              <>
                <div className="d-flex mx-2">
                  <div
                    className={`${styles.buyers_comment_dot_icon} cube-font-icon`}
                    data-icon-name="cube-dot-outline"
                    data-icon="&#xEAF3;"
                  ></div>
                </div>
                <div
                  className={styles.buyer_comment_purchasedItem__color}
                  style={{
                    backgroundColor:
                      commentDetails?.purchased_item?.color?.hex_code,
                  }}
                ></div>
                <p className={styles.buyer_comment_purchasedItem__color_name}>
                  {commentDetails?.purchased_item?.color?.title}
                </p>
              </>
            ) : (
              ""
            )}
          </div>
          <div
            className="d-flex align-items-center"
            style={{ margin: "0 12px" }}
          >
            <div className="me-auto me-lg-0 d-flex align-items-center">
              <button
                className={styles.comment_reaction_btn}
                onClick={() =>
                  togglefeedbacksHandler({
                    commentId: commentDetails?.id,
                    type: "like",
                  })
                }
              >
                {isLoading && variables?.type === "like" ? (
                  <Loading isSmall={true} />
                ) : (
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <p>
                      {toPersianDigits(
                        (commentDetails?.reactions?.likes || 0) +
                          (feedback?.userLiked ? 1 : 0),
                      )}
                    </p>
                    <div className="d-flex me-1">
                      <div
                        className={`${styles.comment_reaction_icon} cube-font-icon`}
                        data-icon-name="cube-value-like"
                        data-icon={feedback?.userLiked ? "\uEB38" : "\uE927"}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
              <button
                className={styles.comment_reaction_btn}
                style={{ marginRight: "4px" }}
                onClick={() =>
                  togglefeedbacksHandler({
                    commentId: commentDetails?.id,
                    type: "dislike",
                  })
                }
              >
                {isLoading && variables?.type === "dislike" ? (
                  <Loading isSmall={true} />
                ) : (
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <p>
                      {toPersianDigits(
                        (commentDetails?.reactions?.dislikes || 0) +
                          (feedback?.userDisliked ? 1 : 0),
                      )}
                    </p>
                    <div className="d-flex me-1">
                      <div
                        className={`${styles.comment_reaction_icon} ${styles.comment_dislike_icon} cube-font-icon`}
                        data-icon-name="cube-value-dislike"
                        data-icon={feedback?.userDisliked ? "\uEB39" : "\uE926"}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
